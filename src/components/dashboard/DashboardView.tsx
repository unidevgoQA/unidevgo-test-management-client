import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectStore } from "@/hooks/useProjectStore";
import { Filter, Plus } from "lucide-react";
import { useState } from "react";
import { CreateProjectModal } from "../project/CreateProjectModal";
import { ProjectCard } from "./ProjectCard";

interface DashboardViewProps {
  onProjectSelect: (projectId: string) => void; // Pass the selected project's ID
}

export function DashboardView({ onProjectSelect }: DashboardViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get projects from the store
  const { projects } = useProjectStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (open: boolean) => {
    setIsModalOpen(open);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">New organization</Button>
          <Button onClick={handleOpenModal}>
            <Plus className="h-4 w-4 mr-2" />
            New project
          </Button>
          <CreateProjectModal
            open={isModalOpen}
            onOpenChange={handleCloseModal}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Input className="pl-4" placeholder="Search for a project..." />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Dynamically map the projects */}
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project.id)} // Call onProjectSelect with the project ID
              >
                <ProjectCard
                  name={project.name}
                  region={project.region}
                  tag={project.tag}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
