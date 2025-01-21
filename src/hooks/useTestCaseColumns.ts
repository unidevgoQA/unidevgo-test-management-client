import { useState } from 'react';
import {
  Hash,
  FileText,
  User,
  Calendar,
  AlertTriangle,
  Activity,
  Clock,
} from 'lucide-react';
import type { Column, TestCase } from '@/types/testcase';

export function useTestCaseColumns() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'id', label: 'ID', isVisible: true, icon: Hash, width: 100 },
    { id: 'title', label: 'Title', isVisible: true, icon: FileText, width: 200 },
    { id: 'owner', label: 'Owner', isVisible: true, icon: User, width: 150 },
    { id: 'createdAt', label: 'Created At', isVisible: true, icon: Calendar, width: 150 },
    { id: 'createdBy', label: 'Created By', isVisible: true, icon: User, width: 150 },
    { id: 'priority', label: 'Priority', isVisible: true, icon: AlertTriangle, width: 120 },
    { id: 'type', label: 'Type', isVisible: true, icon: Activity, width: 120 },
    { id: 'lastExecution', label: 'Last Execution', isVisible: true, icon: Clock, width: 150 },
  ]);

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const toggleColumn = (columnId: keyof TestCase) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, isVisible: !col.isVisible } : col
    ));
  };

  const handleColumnResize = (columnId: string, width: number) => {
    setColumnWidths(prev => ({ ...prev, [columnId]: width }));
  };

  return {
    columns,
    columnWidths,
    toggleColumn,
    handleColumnResize,
  };
}