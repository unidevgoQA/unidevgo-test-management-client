import { useState } from 'react';
import { FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateGroupDialog } from './CreateGroupDialog';
import { GroupCard } from './GroupCard';
import { useGroupStore } from '@/hooks/useGroupStore';

export function TestCaseGroups() {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { groups } = useGroupStore();

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Test Case Groups</h2>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6"
            onClick={() => setCreateDialogOpen(true)}
          >
            <FolderPlus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-7 text-xs"
            placeholder="Search groups..."
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {groups
            .filter(group => 
              group.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          }
        </div>
      </ScrollArea>

      <CreateGroupDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  );
}