import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FolderHeaderProps {
  onCreateFolder: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function FolderHeader({ onCreateFolder, searchQuery, onSearchChange, className }: FolderHeaderProps) {
  return (
    <div className={cn("space-y-4 p-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Folders</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCreateFolder}
        >
          <Plus className="h-4 w-4 mr-2" />
          New folder
        </Button>
      </div>
      
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search folders..."
        className="h-8"
      />
    </div>
  );
}