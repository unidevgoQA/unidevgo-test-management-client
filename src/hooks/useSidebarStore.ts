import { create } from 'zustand';

interface SidebarState {
  isExpanded: boolean;
  width: number;
  toggleExpanded: () => void;
  setWidth: (width: number) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: true,
  width: 320, // Default width
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setWidth: (width) => set({ width }),
}));