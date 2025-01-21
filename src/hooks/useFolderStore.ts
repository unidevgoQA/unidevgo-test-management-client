import { create } from 'zustand';
import { FolderType } from '@/types/folder';

interface FolderState {
  folders: FolderType[];
  selectedFolderId: string | null;
  setSelectedFolder: (id: string | null) => void;
  addFolder: (folder: FolderType) => void;
  updateFolder: (id: string, updates: Partial<FolderType>) => void;
  deleteFolder: (id: string) => void;
}

let folderCounter = 1;

export const useFolderStore = create<FolderState>((set) => ({
  folders: [
    {
      id: '1',
      name: 'Integration Tests',
      color: 'yellow',
      number: folderCounter++,
      testCaseCount: 3,
      children: [
        {
          id: '2',
          name: 'API Tests',
          color: 'yellow',
          parentId: '1',
          testCaseCount: 2,
        },
      ],
    },
    {
      id: '3',
      name: 'E2E Tests',
      color: 'blue',
      number: folderCounter++,
      testCaseCount: 2,
      children: [],
    },
  ],
  selectedFolderId: null,
  setSelectedFolder: (id) => set({ selectedFolderId: id }),
  addFolder: (newFolder) => 
    set((state) => {
      if (!state.selectedFolderId) {
        return { 
          folders: [...state.folders, { ...newFolder, number: folderCounter++ }] 
        };
      }

      const addFolderToTree = (folders: FolderType[]): FolderType[] => {
        return folders.map(folder => {
          if (folder.id === state.selectedFolderId) {
            return {
              ...folder,
              children: [...(folder.children || []), { 
                ...newFolder, 
                parentId: folder.id,
                color: folder.color 
              }],
            };
          }
          if (folder.children) {
            return {
              ...folder,
              children: addFolderToTree(folder.children),
            };
          }
          return folder;
        });
      };

      return { folders: addFolderToTree(state.folders) };
    }),
  updateFolder: (id, updates) =>
    set((state) => ({
      folders: updateFolderInTree(state.folders, id, updates),
    })),
  deleteFolder: (id) =>
    set((state) => ({
      folders: deleteFolderFromTree(state.folders, id),
      selectedFolderId: state.selectedFolderId === id ? null : state.selectedFolderId,
    })),
}));

function updateFolderInTree(folders: FolderType[], id: string, updates: Partial<FolderType>): FolderType[] {
  return folders.map((folder) => {
    if (folder.id === id) {
      return { ...folder, ...updates };
    }
    if (folder.children) {
      return {
        ...folder,
        children: updateFolderInTree(folder.children, id, updates),
      };
    }
    return folder;
  });
}

function deleteFolderFromTree(folders: FolderType[], id: string): FolderType[] {
  return folders.filter((folder) => {
    if (folder.id === id) {
      return false;
    }
    if (folder.children) {
      folder.children = deleteFolderFromTree(folder.children, id);
    }
    return true;
  });
}