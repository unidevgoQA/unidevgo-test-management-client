import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function TopNav() {
  return (
    <div className="h-14 border-b px-4 flex items-center bg-card">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">fardinahosancse's Org /</span>
        <Button variant="ghost" size="sm" className="text-sm rounded-lg hover:bg-primary/10">
          madTest
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}