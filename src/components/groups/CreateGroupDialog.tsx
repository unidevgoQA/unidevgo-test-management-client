import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGroupStore } from '@/hooks/useGroupStore';
import { EmojiPicker } from '../folders/EmojiPicker';
import { cn } from '@/lib/utils';
import { ColorButton } from './ColorButton';

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentId?: string;
  inheritedColor?: string;
}

const COLORS = ['blue', 'green', 'yellow', 'purple', 'pink', 'orange'] as const;
const DEFAULT_ICONS = ['📁', '📂', '🗂️', '📊', '📈', '📉', '📌', '📍', '🔍'];

export function CreateGroupDialog({ 
  open, 
  onOpenChange, 
  parentId,
  inheritedColor 
}: CreateGroupDialogProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(parentId ? '📁' : DEFAULT_ICONS[0]);
  const [color, setColor] = useState<typeof COLORS[number]>(inheritedColor || 'blue');
  const { addGroup } = useGroupStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addGroup({
      id: crypto.randomUUID(),
      name,
      emoji,
      color,
      testCaseCount: 0,
      subgroups: [],
    }, parentId);
    
    onOpenChange(false);
    setName('');
    setEmoji(parentId ? '📁' : DEFAULT_ICONS[0]);
    setColor(inheritedColor || 'blue');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-sm">
            {parentId ? 'Create new subgroup' : 'Create new group'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs">Group name</Label>
            <div className="relative flex gap-2">
              <EmojiPicker value={emoji} onChange={setEmoji} />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-3 h-8 text-xs"
                placeholder="Enter group name"
                autoFocus
              />
            </div>
          </div>

          {!parentId && (
            <div className="space-y-2">
              <Label className="text-xs">Color</Label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <ColorButton
                    key={c}
                    color={c}
                    isSelected={color === c}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>
          )}

          {!parentId && (
            <div className="space-y-2">
              <Label className="text-xs">Quick icons</Label>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_ICONS.map((icon) => (
                  <Button
                    key={icon}
                    type="button"
                    variant={emoji === icon ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setEmoji(icon)}
                  >
                    {icon}
                  </Button>
                ))}
              </div>
            </div>
          )}

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
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}