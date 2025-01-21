import { useState } from 'react';
import { MoreVertical, ChevronRight, FolderPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { GroupType } from '@/types/group';
import { useGroupStore } from '@/hooks/useGroupStore';
import { CreateGroupDialog } from './CreateGroupDialog';

interface GroupCardProps {
  group: GroupType;
  level?: number;
}

export function GroupCard({ group, level = 0 }: GroupCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { selectedGroupId, setSelectedGroup, getGroupTotalTestCases } = useGroupStore();
  const isSelected = selectedGroupId === group.id;
  const totalTestCases = getGroupTotalTestCases(group);

  return (
    <>
      <Card 
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          isSelected ? "ring-1 ring-primary" : "hover:shadow-sm",
          isExpanded ? "pb-2" : "",
          level > 0 && "ml-3"
        )}
        onClick={() => setSelectedGroup(group.id)}
      >
        <div className={cn(
          "p-2 flex items-center gap-2",
          group.color && `bg-${group.color}-50 dark:bg-${group.color}-950/20`
        )}>
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-sm",
            `bg-${group.color}-100 dark:bg-${group.color}-900/30`,
            `text-${group.color}-600 dark:text-${group.color}-400`
          )}>
            {group.emoji}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-medium truncate">{group.name}</h3>
            <p className="text-[10px] text-muted-foreground">
              {totalTestCases} test cases
            </p>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                setCreateDialogOpen(true);
              }}
            >
              <FolderPlus className="h-3 w-3" />
            </Button>

            {group.subgroups?.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform",
                  isExpanded && "rotate-90"
                )} />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem className="text-xs">Edit group</DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-red-600">
                  Delete group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && group.subgroups && group.subgroups.length > 0 && (
          <div className="mt-1 space-y-1">
            {group.subgroups.map((subgroup) => (
              <GroupCard
                key={subgroup.id}
                group={subgroup}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </Card>

      <CreateGroupDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        parentId={group.id}
        inheritedColor={group.color}
      />
    </>
  );
}