import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  isSelected?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />}
          {item.href ? (
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "gap-2",
                item.isSelected ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.label}
            </Button>
          ) : (
            <span className={cn(
              "flex items-center gap-2",
              item.isSelected ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}