import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Folder } from 'lucide-react';
import { useFolderStore } from '@/hooks/useFolderStore';
import { EmojiPicker } from './EmojiPicker';
import type { FolderType } from '@/types/folder';

interface FolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folder?: FolderType;
}

export function FolderDialog({ open, onOpenChange, folder }: FolderDialogProps) {
  const [name, setName] = useState(folder?.name || '');
  const [emoji, setEmoji] = useState(folder?.emoji || '📁');
  const { addFolder, updateFolder } = useFolderStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (folder) {
      updateFolder(folder.id, { name, emoji });
    } else {
      addFolder({
        id: crypto.randomUUID(),
        name,
        emoji,
        testCaseCount: 0,
        children: [],
      });
    }
    
    onOpenChange(false);
    setName('');
    setEmoji('📁');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-sm">
            {folder ? 'Edit folder' : 'Create new folder'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs">Folder name</Label>
            <div className="relative flex gap-2">
              <EmojiPicker value={emoji} onChange={setEmoji} />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-3 h-8 text-xs"
                placeholder="Enter folder name"
                autoFocus
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="text-xs h-8"
              disabled={!name.trim()}
            >
              {folder ? 'Save changes' : 'Create folder'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}