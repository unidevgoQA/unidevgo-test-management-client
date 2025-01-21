import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCard } from './ProjectCard';

interface DashboardViewProps {
  onProjectSelect: () => void;
}

export function DashboardView({ onProjectSelect }: DashboardViewProps) {
  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            New organization
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New project
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Input 
            className="pl-4" 
            placeholder="Search for a project..."
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">fardinahosancse's Org</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div onClick={onProjectSelect}>
              <ProjectCard 
                name="madTest"
                region="aws | us-west-1"
                tag="NANO"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}