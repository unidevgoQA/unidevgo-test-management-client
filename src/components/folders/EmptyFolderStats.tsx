import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export function EmptyFolderStats() {
  return (
    <Card className="p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full border-4 border-dashed border-muted flex items-center justify-center">
          <Play className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">No Folder Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a folder to view test execution statistics
          </p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          Execute All Tests
        </Button>
      </div>
    </Card>
  );
}