import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestCaseFolders } from '@/components/folders/TestCaseFolders';
import { useSidebarStore } from '@/hooks/useSidebarStore';
import { cn } from '@/lib/utils';

export function TableList() {
  const { isExpanded, width, toggleExpanded } = useSidebarStore();

  return (
    <div 
      className={cn(
        "border-r bg-card h-full flex transition-all duration-300",
        isExpanded ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ width }}
    >
      <div className="flex-1">
        <TestCaseFolders />
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-full h-8 w-8 rounded-l-none border-l-0",
          "bg-background hover:bg-background"
        )}
        onClick={toggleExpanded}
      >
        <ChevronLeft className={cn(
          "h-4 w-4 transition-transform",
          !isExpanded && "rotate-180"
        )} />
      </Button>
    </div>
  );
}