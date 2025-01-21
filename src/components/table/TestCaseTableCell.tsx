import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PRIORITIES, TYPES } from "@/lib/testcase";
import type { TestCase } from "@/types/testcase";

interface TestCaseTableCellProps {
  columnId: keyof TestCase;
  value: any;
  width?: number;
}

export function TestCaseTableCell({ columnId, value, width }: TestCaseTableCellProps) {
  if (columnId === 'priority') {
    return (
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        PRIORITIES[value as keyof typeof PRIORITIES]
      )}>
        {value}
      </span>
    );
  }

  if (columnId === 'type') {
    return (
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        TYPES[value as keyof typeof TYPES]
      )}>
        {value}
      </span>
    );
  }

  if (columnId === 'createdBy') {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {value.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          {value}
        </TooltipContent>
      </Tooltip>
    );
  }

  if (columnId === 'createdAt' || columnId === 'lastExecution') {
    return value ? new Date(value).toLocaleDateString() : '-';
  }

  return value;
}