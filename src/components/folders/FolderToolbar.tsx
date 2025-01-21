import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderDialog } from './FolderDialog';

export function FolderToolbar() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-1 bg-primary/5 rounded-md p-1">
        <Button 
          variant="ghost" 
          size="xs" 
          className="flex-1 justify-start gap-1.5"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-3 w-3" />
          <span className="text-xs">New</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <ArrowUpDown className="h-3 w-3" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="text-xs">Expand all</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Collapse all</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <FolderDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
      />
    </>
  );
}