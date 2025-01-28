import { FolderType } from "@/types/folder";
import { create } from "zustand";
import { useProjectStore } from "./useProjectStore"; // Import the project store

interface FolderState {
  folders: FolderType[];
  selectedFolderId: string | null;
  setSelectedFolder: (id: string | null) => void;
  addFolder: (folder: FolderType, projectId: string, parentId?: string) => void; // Add parentId as an optional argument
  updateFolder: (id: string, updates: Partial<FolderType>) => void;
  deleteFolder: (id: string) => void;
}

let folderCounter = 1;

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
  selectedFolderId: null,
  setSelectedFolder: (id) => set({ selectedFolderId: id }),

  // Reusing the same handler name `addFolder`
  addFolder: (newFolder, projectId, parentId) => {
    const { addFolderToProject } = useProjectStore.getState(); // Access the project store's function
    if (parentId) {
      // If there's a parentId, add the folder under that folder
      set((state) => ({
        folders: addFolderToTree(state.folders, newFolder, parentId),
      }));
    } else {
      // If no parentId, just add the folder at the root level
      addFolderToProject(projectId, { ...newFolder, number: folderCounter++ });
      set((state) => ({
        folders: [...state.folders, { ...newFolder, number: folderCounter++ }],
      }));
    }
  },

  updateFolder: (id, updates) =>
    set((state) => ({
      folders: updateFolderInTree(state.folders, id, updates),
    })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: deleteFolderFromTree(state.folders, id),
      selectedFolderId:
        state.selectedFolderId === id ? null : state.selectedFolderId,
    })),
}));

// Helper function to add folder to a parent folder (or root)
function addFolderToTree(
  folders: FolderType[],
  newFolder: FolderType,
  parentId: string
): FolderType[] {
  return folders.map((folder) => {
    if (folder.id === parentId) {
      return {
        ...folder,
        children: [
          ...(folder.children || []),
          { ...newFolder, parentId: folder.id },
        ],
      };
    }
    if (folder.children) {
      return {
        ...folder,
        children: addFolderToTree(folder.children, newFolder, parentId),
      };
    }
    return folder;
  });
}

function updateFolderInTree(
  folders: FolderType[],
  id: string,
  updates: Partial<FolderType>
): FolderType[] {
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
