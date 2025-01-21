import { useState } from 'react';
import { FolderHeader } from './FolderHeader';
import { FolderTree } from './FolderTree';
import { FolderDialog } from './FolderDialog';
import { FolderStats } from './FolderStats';
import { EmptyFolderStats } from './EmptyFolderStats';
import { useFolderStore } from '@/hooks/useFolderStore';
import { FolderType } from '@/types/folder';

export function TestCaseFolders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
  const { folders, selectedFolderId, setSelectedFolder: selectFolder, deleteFolder } = useFolderStore();

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (folder: FolderType) => {
    setSelectedFolder(folder);
    setCreateDialogOpen(true);
  };

  const handleDelete = (folder: FolderType) => {
    deleteFolder(folder.id);
  };

  // Get folder path for breadcrumb
  const getFolderPath = (folderId: string): string[] => {
    const path = ['Project'];
    const findFolder = (folders: FolderType[], id: string): boolean => {
      for (const folder of folders) {
        if (folder.id === id) {
          path.push(folder.name);
          return true;
        }
        if (folder.children?.length) {
          if (findFolder(folder.children, id)) {
            path.splice(1, 0, folder.name);
            return true;
          }
        }
      }
      return false;
    };
    findFolder(folders, folderId);
    return path;
  };

  // Mock stats for selected folder
  const selectedFolderStats = {
    passed: 12,
    failed: 3,
    notExecuted: 5,
  };

  return (
    <div className="flex flex-col h-full">
      <FolderHeader
        onCreateFolder={() => {
          setSelectedFolder(null);
          setCreateDialogOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex-1 overflow-hidden">
        <FolderTree
          folders={filteredFolders}
          selectedId={selectedFolderId}
          onSelect={selectFolder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <div className="p-4 border-t bg-card">
        {selectedFolderId ? (
          <FolderStats
            path={getFolderPath(selectedFolderId)}
            {...selectedFolderStats}
            onExecute={() => console.log('Execute tests')}
          />
        ) : (
          <EmptyFolderStats />
        )}
      </div>

      <FolderDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        folder={selectedFolder || undefined}
      />
    </div>
  );
}