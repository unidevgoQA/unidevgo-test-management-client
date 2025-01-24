interface SubModule {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  subModules: SubModule[];
}

export interface Project {
  id: string;
  name: string;
  region: string;
  tag: string;
  modules: Module[];
}
