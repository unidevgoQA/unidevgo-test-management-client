import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  name: string;
  region: string;
  tag: string;
}

export function ProjectCard({ name, region, tag }: ProjectCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{region}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-secondary px-2 py-1 rounded">{tag}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </Card>
  );
}