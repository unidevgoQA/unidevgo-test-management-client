import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function FolderSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
      <Input 
        className="pl-7 h-8 text-xs" 
        placeholder="Filter folders..." 
      />
    </div>
  );
}