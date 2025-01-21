import { Inbox, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function FolderSummary() {
  return (
    <div className="space-y-1">
      <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md bg-primary/5 hover:bg-primary/10 cursor-pointer">
        <Separator orientation="vertical" className="h-4 mr-2" />
        <Inbox className="h-3.5 w-3.5 text-primary fill-primary/20" />
        <span className="text-xs">All test cases</span>
        <span className="text-xs text-muted-foreground ml-auto">1</span>
      </div>
      <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-primary/5 cursor-pointer">
        <Separator orientation="vertical" className="h-4 mr-2" />
        <Folder className="h-3.5 w-3.5 text-muted-foreground fill-muted-foreground/20" />
        <span className="text-xs">Test cases in no folder</span>
        <span className="text-xs text-muted-foreground ml-auto">0</span>
      </div>
      <Separator className="my-2" />
    </div>
  );
}