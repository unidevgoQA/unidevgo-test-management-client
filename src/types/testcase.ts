export interface TestCase {
  id: string;
  title: string;
  owner: string;
  createdAt: string;
  createdBy: string;
  priority: 'Low' | 'Medium' | 'High';
  type: 'Manual' | 'Automated';
  lastExecution: string | null;
  checked?: boolean;
}

export interface Column {
  id: keyof TestCase;
  label: string;
  isVisible: boolean;
  icon: React.ElementType;
  width?: number;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: keyof TestCase | null;
  direction: SortDirection;
}