import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function TableContent() {
  return (
    <div className="p-8">
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No tables available</h3>
          <p className="text-sm text-muted-foreground mb-4">
            There are no tables available in this schema.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create a new table
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}