import { ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FolderBreadcrumbProps {
  path: string[];
}

export function FolderBreadcrumb({ path }: FolderBreadcrumbProps) {
  if (path.length <= 3) {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        {path.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />}
            <span className={index === path.length - 1 ? "font-medium truncate" : "text-muted-foreground truncate"}>
              {item}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="text-muted-foreground truncate">{path[0]}</span>
      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
      <Tooltip>
        <TooltipTrigger>
          <span className="text-muted-foreground">...</span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-1">
            {path.slice(1, -2).map((item, index) => (
              <span key={index} className="text-xs">{item}</span>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground truncate">{path[path.length - 2]}</span>
      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
      <span className="font-medium truncate">{path[path.length - 1]}</span>
    </div>
  );
}