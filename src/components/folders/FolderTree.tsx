import { useState } from 'react';
import { ChevronRight, Folder, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { FolderType } from '@/types/folder';

interface FolderTreeProps {
  folders: FolderType[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onEdit: (folder: FolderType) => void;
  onDelete: (folder: FolderType) => void;
  className?: string;
}

interface FolderItemProps {
  folder: FolderType;
  level: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onEdit: (folder: FolderType) => void;
  onDelete: (folder: FolderType) => void;
}

function FolderItem({ folder, level, selectedId, onSelect, onEdit, onDelete }: FolderItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = folder.children && folder.children.length > 0;

  return (
    <div>
      <div
        className={cn(
          "group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer",
          selectedId === folder.id ? "bg-primary/10" : "hover:bg-muted",
          "relative"
        )}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
        onClick={() => onSelect(folder.id)}
      >
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <ChevronRight className={cn(
              "h-3 w-3 transition-transform",
              isExpanded && "rotate-90"
            )} />
          </Button>
        )}
        {!hasChildren && <div className="w-4" />}
        <Folder className="h-4 w-4 text-primary shrink-0" />
        <span className="text-sm truncate flex-1">{folder.name}</span>
        <span className="text-xs text-muted-foreground">{folder.testCaseCount}</span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(folder)}>
              Edit folder
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(folder)}
              className="text-destructive"
            >
              Delete folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isExpanded && hasChildren && (
        <div>
          {folder.children!.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FolderTree({ folders, selectedId, onSelect, onEdit, onDelete, className }: FolderTreeProps) {
  return (
    <ScrollArea className={cn("h-full px-2", className)}>
      <div className="space-y-0.5 py-2">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            level={0}
            selectedId={selectedId}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </ScrollArea>
  );
}