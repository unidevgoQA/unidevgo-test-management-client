import { RefObject } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIORITIES, TYPES } from "@/lib/testcase";
import type { TestCase, Column } from "@/types/testcase";

interface TestCaseTableContentProps {
  data: TestCase[];
  columns: Column[];
  columnWidths: Record<string, number>;
  resizingColumn: RefObject<string | null>;
  onColumnResize: (columnId: string, width: number) => void;
  onCheckAll: (checked: boolean) => void;
  onCheck: (id: string, checked: boolean) => void;
}

export function TestCaseTableContent({
  data,
  columns,
  columnWidths,
  resizingColumn,
  onColumnResize,
  onCheckAll,
  onCheck,
}: TestCaseTableContentProps) {
  return (
    <div className="rounded-md border bg-primary/5">
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-primary/10">
              <TableHead className="w-[40px] sticky left-0 bg-primary/5">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => onCheckAll(e.target.checked)}
                  checked={data.every(item => item.checked)}
                />
              </TableHead>
              {columns.map((column) => 
                column.isVisible && (
                  <TableHead 
                    key={column.id}
                    className="cursor-pointer select-none group relative"
                    style={{ width: columnWidths[column.id] || column.width }}
                  >
                    <div className="flex items-center gap-2">
                      <column.icon className="h-4 w-4 text-primary" />
                      {column.label}
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div
                      className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/20"
                      onMouseDown={(e) => {
                        const startX = e.pageX;
                        const startWidth = columnWidths[column.id] || column.width || 0;
                        resizingColumn.current = column.id;

                        const handleMouseMove = (e: MouseEvent) => {
                          if (resizingColumn.current) {
                            const width = Math.max(100, startWidth + (e.pageX - startX));
                            onColumnResize(resizingColumn.current, width);
                          }
                        };

                        const handleMouseUp = () => {
                          resizingColumn.current = null;
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };

                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    />
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((testCase) => (
              <TableRow
                key={testCase.id}
                className={cn(
                  "cursor-pointer hover:bg-primary/10",
                  testCase.checked && "bg-primary/5"
                )}
              >
                <TableCell className="sticky left-0 bg-primary/5">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={testCase.checked}
                    onChange={(e) => onCheck(testCase.id, e.target.checked)}
                  />
                </TableCell>
                {columns.map((column) => 
                  column.isVisible && (
                    <TableCell 
                      key={column.id}
                      style={{ width: columnWidths[column.id] || column.width }}
                    >
                      {renderCell(column.id, testCase)}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function renderCell(columnId: keyof TestCase, testCase: TestCase) {
  if (columnId === 'owner' || columnId === 'createdBy') {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${testCase[columnId]}`} 
              alt={testCase[columnId]} 
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {testCase[columnId].split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          {testCase[columnId]}
        </TooltipContent>
      </Tooltip>
    );
  }

  if (columnId === 'priority') {
    return (
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        PRIORITIES[testCase.priority]
      )}>
        {testCase.priority}
      </span>
    );
  }

  if (columnId === 'type') {
    return (
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        TYPES[testCase.type]
      )}>
        {testCase.type}
      </span>
    );
  }

  if (columnId === 'createdAt' || columnId === 'lastExecution') {
    return testCase[columnId] 
      ? new Date(testCase[columnId]!).toLocaleDateString()
      : '-';
  }

  return testCase[columnId];
}