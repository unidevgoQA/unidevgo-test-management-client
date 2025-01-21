import { Button } from "@/components/ui/button";
import { Plus, Settings2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Column, TestCase } from "@/types/testcase";

interface TestCaseTableHeaderProps {
  columns: Column[];
  onToggleColumn: (columnId: keyof TestCase) => void;
}

export function TestCaseTableHeader({ columns, onToggleColumn }: TestCaseTableHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Integration Tests</h2>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="h-4 w-4 mr-2" />
              Columns
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.isVisible}
                onCheckedChange={() => onToggleColumn(column.id)}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Test Case
        </Button>
      </div>
    </div>
  );
}