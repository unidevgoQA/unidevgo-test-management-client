import { create } from 'zustand';
import { GroupType } from '@/types/group';

interface GroupState {
  groups: GroupType[];
  selectedGroupId: string | null;
  setSelectedGroup: (id: string | null) => void;
  addGroup: (group: GroupType, parentId?: string | null) => void;
  updateGroup: (id: string, updates: Partial<GroupType>) => void;
  deleteGroup: (id: string) => void;
  getGroupTotalTestCases: (group: GroupType) => number;
}

export const useGroupStore = create<GroupState>((set, get) => ({
  groups: [
    {
      id: '1',
      name: 'Integration Tests',
      emoji: '🔄',
      color: 'blue',
      testCaseCount: 1,
      subgroups: [
        {
          id: '2',
          name: 'API Tests',
          emoji: '🌐',
          color: 'blue',
          testCaseCount: 2,
        },
      ],
    },
    {
      id: '3',
      name: 'E2E Tests',
      emoji: '🎯',
      color: 'green',
      testCaseCount: 2,
    },
    {
      id: '4',
      name: 'Performance Tests',
      emoji: '⚡',
      color: 'yellow',
      testCaseCount: 1,
    },
  ],
  selectedGroupId: null,
  setSelectedGroup: (id) => set({ selectedGroupId: id }),
  
  getGroupTotalTestCases: (group: GroupType): number => {
    let total = group.testCaseCount;
    if (group.subgroups) {
      total += group.subgroups.reduce((sum, subgroup) => 
        sum + get().getGroupTotalTestCases(subgroup), 0
      );
    }
    return total;
  },

  addGroup: (newGroup, parentId = null) => 
    set((state) => {
      if (!parentId) {
        return { groups: [...state.groups, newGroup] };
      }

      const addToSubgroups = (groups: GroupType[]): GroupType[] => {
        return groups.map(group => {
          if (group.id === parentId) {
            return {
              ...group,
              subgroups: [...(group.subgroups || []), { 
                ...newGroup,
                color: group.color 
              }],
            };
          }
          if (group.subgroups) {
            return {
              ...group,
              subgroups: addToSubgroups(group.subgroups),
            };
          }
          return group;
        });
      };

      return { groups: addToSubgroups(state.groups) };
    }),

  updateGroup: (id, updates) =>
    set((state) => {
      const updateInTree = (groups: GroupType[]): GroupType[] => {
        return groups.map(group => {
          if (group.id === id) {
            return { ...group, ...updates };
          }
          if (group.subgroups) {
            return {
              ...group,
              subgroups: updateInTree(group.subgroups),
            };
          }
          return group;
        });
      };

      return { groups: updateInTree(state.groups) };
    }),

  deleteGroup: (id) =>
    set((state) => {
      const deleteFromTree = (groups: GroupType[]): GroupType[] => {
        return groups.filter(group => {
          if (group.id === id) {
            return false;
          }
          if (group.subgroups) {
            group.subgroups = deleteFromTree(group.subgroups);
          }
          return true;
        });
      };

      return {
        groups: deleteFromTree(state.groups),
        selectedGroupId: state.selectedGroupId === id ? null : state.selectedGroupId,
      };
    }),
}));