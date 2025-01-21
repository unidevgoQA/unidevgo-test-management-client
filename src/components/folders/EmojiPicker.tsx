import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Smile } from 'lucide-react';
import type { EmojiCategory } from '@/types/folder';

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    category: 'Common',
    emojis: ['📁', '📂', '🗂️', '📊', '📈', '📉', '📌', '📍', '🔍', '🔎', '🔖', '📎', '🔗'],
  },
  {
    category: 'Testing',
    emojis: ['✅', '❌', '🧪', '🔬', '🧮', '🎯', '🎲', '🔄', '⚡', '🐛', '🔨', '🛠️', '🔧'],
  },
  {
    category: 'Tech',
    emojis: ['💻', '🖥️', '⌨️', '🖱️', '🌐', '📱', '💾', '💿', '📡', '🔌', '🔋', '💡', '🔐'],
  },
];

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8"
        >
          {value || <Smile className="h-4 w-4" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Tabs defaultValue="Common">
          <TabsList className="w-full">
            {EMOJI_CATEGORIES.map((category) => (
              <TabsTrigger
                key={category.category}
                value={category.category}
                className="flex-1"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {EMOJI_CATEGORIES.map((category) => (
            <TabsContent
              key={category.category}
              value={category.category}
              className="p-2"
            >
              <ScrollArea className="h-32">
                <div className="grid grid-cols-6 gap-2">
                  {category.emojis.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        onChange(emoji);
                        setOpen(false);
                      }}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}