import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectStore } from "@/hooks/useProjectStore";
import { useState } from "react";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({
  open,
  onOpenChange,
}: CreateProjectModalProps) {
  const addProject = useProjectStore((state) => state.addProject);

  const [formData, setFormData] = useState({
    name: "",
    region: "",
    tag: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(formData.name, formData.region, formData.tag);
    onOpenChange(false);
    setFormData({ name: "", region: "", tag: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <Label style={{ marginBottom: "10px" }}>Project Name</Label>{" "}
            {/* Added margin bottom */}
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter project name"
            />
          </div>
          <div>
            <Label style={{ marginBottom: "10px" }}>Region</Label>{" "}
            {/* Added margin bottom */}
            <Input
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              placeholder="Enter region"
            />
          </div>
          <div>
            <Label style={{ marginBottom: "10px" }}>Tag</Label>{" "}
            {/* Added margin bottom */}
            <Input
              value={formData.tag}
              onChange={(e) =>
                setFormData({ ...formData, tag: e.target.value })
              }
              placeholder="Enter tag"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
