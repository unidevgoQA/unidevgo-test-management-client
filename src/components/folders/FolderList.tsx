import { useState } from 'react';
import { useFolderStore } from '@/hooks/useFolderStore';
import { FolderContextMenu } from './FolderContextMenu';
import { FolderDialog } from './FolderDialog';
import { FolderItem } from './FolderItem';
import type { FolderType } from '@/types/folder';

export function FolderList() {
  const { folders, selectedFolderId, setSelectedFolder } = useFolderStore();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number, folder: FolderType } | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolderForEdit] = useState<FolderType | undefined>();

  const handleContextMenu = (e: React.MouseEvent, folder: FolderType) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, folder });
  };

  return (
    <div className="flex-1 overflow-auto px-2 py-1.5">
      <div className="space-y-0.5">
        {folders.map((folder, index) => (
          <FolderItem 
            key={folder.id} 
            folder={folder}
            isLast={index === folders.length - 1}
            onSelect={setSelectedFolder}
            selectedId={selectedFolderId}
            onContextMenu={handleContextMenu}
          />
        ))}
      </div>

      {contextMenu && (
        <FolderContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          folder={contextMenu.folder}
          onClose={() => setContextMenu(null)}
          onEdit={(folder) => {
            setSelectedFolderForEdit(folder);
            setEditDialogOpen(true);
            setContextMenu(null);
          }}
          onDelete={(folder) => {
            // Handle delete
            setContextMenu(null);
          }}
        />
      )}

      <FolderDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        folder={selectedFolder}
      />
    </div>
  );
}