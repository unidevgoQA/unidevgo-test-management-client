import { Project } from "@/types/project";
import { create } from "zustand";

interface ProjectStore {
  projects: Project[];
  addProject: (name: string, region: string, tag: string) => void;
  addModule: (projectId: string, moduleName: string) => void;
  addSubModule: (
    projectId: string,
    moduleId: string,
    subModuleName: string
  ) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (name, region, tag) =>
    set((state) => ({
      projects: [
        ...state.projects,
        { id: Date.now().toString(), name, region, tag, modules: [] },
      ],
    })),
  addModule: (projectId, moduleName) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              modules: [
                ...project.modules,
                { id: Date.now().toString(), name: moduleName, subModules: [] },
              ],
            }
          : project
      ),
    })),
  addSubModule: (projectId, moduleId, subModuleName) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              modules: project.modules.map((module) =>
                module.id === moduleId
                  ? {
                      ...module,
                      subModules: [
                        ...module.subModules,
                        { id: Date.now().toString(), name: subModuleName },
                      ],
                    }
                  : module
              ),
            }
          : project
      ),
    })),
}));
