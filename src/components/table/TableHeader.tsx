import { Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateTableDialog } from "./CreateTableDialog";

export function TableHeader() {
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Table Editor</h2>
          <Select defaultValue="public">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select schema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">public</SelectItem>
              <SelectItem value="private">private</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CreateTableDialog />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search tables..."
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}