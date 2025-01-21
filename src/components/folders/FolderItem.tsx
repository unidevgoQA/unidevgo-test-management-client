import { ChevronRight, ChevronDown, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FolderType, FOLDER_COLORS } from '@/types/folder';
import { useState } from 'react';

interface FolderItemProps {
  folder: FolderType;
  level?: number;
  isLast?: boolean;
  onSelect: (id: string) => void;
  selectedId: string | null;
  onContextMenu: (e: React.MouseEvent, folder: FolderType) => void;
}

export function FolderItem({ 
  folder, 
  level = 0, 
  isLast = false,
  onSelect,
  selectedId,
  onContextMenu
}: FolderItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const colorScheme = FOLDER_COLORS[folder.color as keyof typeof FOLDER_COLORS];

  return (
    <div className="relative">
      {level > 0 && (
        <div 
          className={cn(
            "absolute left-3 w-px",
            colorScheme.border,
            isLast ? "h-[16px]" : "h-full"
          )}
          style={{ left: `${level * 12}px` }}
        />
      )}
      <div 
        className={cn(
          "w-full flex items-center gap-1.5 px-1.5 py-1 rounded-md cursor-pointer relative",
          selectedId === folder.id ? colorScheme.bg : 'hover:bg-primary/5',
          colorScheme.hover
        )}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
        onClick={() => onSelect(folder.id)}
        onContextMenu={(e) => onContextMenu(e, folder)}
      >
        {level > 0 && (
          <div 
            className={cn("absolute w-3 h-px", colorScheme.border)}
            style={{ left: `${level * 12}px` }}
          />
        )}
        {folder.children?.length > 0 && (
          <div
            className="p-0.5 hover:bg-primary/10 rounded cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        )}
        {!folder.children?.length && <div className="w-4" />}
        <div className="relative">
          <Folder className={cn("h-4 w-4", colorScheme.text)} />
          {folder.number && (
            <div className={cn(
              "absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium",
              colorScheme.bg,
              colorScheme.text
            )}>
              {folder.number}
            </div>
          )}
        </div>
        <span className="text-xs">{folder.name}</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {folder.testCaseCount}
        </span>
      </div>

      {isExpanded && folder.children && folder.children.length > 0 && (
        <div>
          {folder.children.map((child, index) => (
            <FolderItem
              key={child.id}
              folder={{...child, color: folder.color}}
              level={level + 1}
              isLast={index === folder.children!.length - 1}
              onSelect={onSelect}
              selectedId={selectedId}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
}