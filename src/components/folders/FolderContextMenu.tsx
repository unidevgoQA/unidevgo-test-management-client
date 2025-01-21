import { useEffect, useRef } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { FolderContextMenuProps } from '@/types/folder';

export function FolderContextMenu({ x, y, folder, onClose, onEdit, onDelete }: FolderContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border py-1 w-48 z-50"
      style={{ left: x, top: y }}
    >
      <button
        className="w-full px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-primary/5"
        onClick={() => {
          onEdit(folder);
          onClose();
        }}
      >
        <Edit2 className="h-3.5 w-3.5" />
        Edit folder
      </button>
      <button
        className="w-full px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-destructive/5 text-destructive"
        onClick={() => {
          onDelete(folder);
          onClose();
        }}
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete folder
      </button>
    </div>
  );
}