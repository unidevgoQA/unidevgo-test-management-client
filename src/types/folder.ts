export interface FolderType {
  id: string;
  name: string;
  color: string;
  number?: number;
  parentId?: string | null;
  testCaseCount: number;
  children?: FolderType[];
}

export interface FolderContextMenuProps {
  x: number;
  y: number;
  folder: FolderType;
  onClose: () => void;
  onEdit: (folder: FolderType) => void;
  onDelete: (folder: FolderType) => void;
}

export const FOLDER_COLORS = {
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-600',
    hover: 'hover:bg-yellow-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-500/20',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-600',
    hover: 'hover:bg-green-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-500/20',
  },
} as const;