import { FolderType } from "@/types/folder";
import { Project } from "@/types/project";
import { create } from "zustand";

interface ProjectStore {
  projects: (Project & { folders: FolderType[] })[]; // Add folders as part of the project
  addProject: (name: string, region: string, tag: string) => void;
  addFolderToProject: (projectId: string, folder: FolderType) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (name, region, tag) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          id: Date.now().toString(),
          name,
          region,
          tag,
          modules: [],
          folders: [],
        },
      ],
    })),
  addFolderToProject: (projectId, folder) =>
    set((state) => ({
      projects: state.projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, folders: [...project.folders, folder] };
        }
        return project;
      }),
    })),
}));
