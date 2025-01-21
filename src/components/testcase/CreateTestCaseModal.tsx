import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFolderStore } from "@/hooks/useFolderStore";
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Activity,
  ImageIcon,
  Video,
  Link2,
  Upload
} from 'lucide-react';

const TEST_TYPES = ["Regression", "Visual", "UI", "Performance", "Security"];
const PRIORITIES = ["Low", "Medium", "High"];
const QA_ENGINEERS = ["John Doe", "Jane Smith", "Bob Johnson"];

interface CreateTestCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (testCase: any) => void;
}

export function CreateTestCaseModal({ open, onOpenChange, onSave }: CreateTestCaseModalProps) {
  const { selectedFolderId, folders } = useFolderStore();
  const selectedFolder = folders.find(f => f.id === selectedFolderId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    assignedQA: "",
    testCaseName: "",
    priority: "",
    type: "",
    expectedResult: "",
    actualResult: "",
    status: "",
    images: [] as File[],
    videos: [] as File[],
    videoLink: "",
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos') => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...files]
    }));
  };

  const handleDrop = (event: React.DragEvent, type: 'images' | 'videos') => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(file => {
      if (type === 'images') return file.type.startsWith('image/');
      if (type === 'videos') return file.type.startsWith('video/');
      return false;
    });
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...files]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const testCase = {
      id: `TC-${Math.random().toString(36).substr(2, 9)}`,
      title: formData.testCaseName,
      owner: formData.assignedQA,
      priority: formData.priority,
      type: formData.type,
      expectedResult: formData.expectedResult,
      actualResult: formData.actualResult,
      status: formData.status,
      folderId: selectedFolderId,
      createdAt: new Date().toISOString(),
      lastExecution: new Date().toISOString(),
      images: formData.images,
      videos: formData.videos,
      videoLink: formData.videoLink,
    };

    onSave(testCase);
    onOpenChange(false);
    setFormData({
      assignedQA: "",
      testCaseName: "",
      priority: "",
      type: "",
      expectedResult: "",
      actualResult: "",
      status: "",
      images: [],
      videos: [],
      videoLink: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Test Case</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Test Case ID</Label>
                <Input 
                  value={`TC-${Math.random().toString(36).substr(2, 9)}`} 
                  disabled 
                />
              </div>
              <div>
                <Label>Under Folder</Label>
                <Input 
                  value={selectedFolder?.name || ''} 
                  disabled 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Assigned QA
                </Label>
                <Select 
                  value={formData.assignedQA}
                  onValueChange={(value) => setFormData({ ...formData, assignedQA: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select QA Engineer" />
                  </SelectTrigger>
                  <SelectContent>
                    {QA_ENGINEERS.map((qa) => (
                      <SelectItem key={qa} value={qa}>
                        {qa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Test Case Name
                </Label>
                <Input
                  value={formData.testCaseName}
                  onChange={(e) => setFormData({ ...formData, testCaseName: e.target.value })}
                  placeholder="Enter test case name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEST_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Expected Result</Label>
              <Textarea
                value={formData.expectedResult}
                onChange={(e) => setFormData({ ...formData, expectedResult: e.target.value })}
                placeholder="Enter expected result"
                className="h-24"
              />
            </div>

            <div>
              <Label>Actual Result</Label>
              <Textarea
                value={formData.actualResult}
                onChange={(e) => setFormData({ ...formData, actualResult: e.target.value })}
                placeholder="Enter actual result"
                className="h-24"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <ImageIcon className="h-4 w-4" />
                  Images
                </Label>
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, 'images')}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop images or click to upload
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'images')}
                  />
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index)
                            }));
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Video className="h-4 w-4" />
                  Videos
                </Label>
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50"
                  onClick={() => videoInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, 'videos')}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop videos or click to upload
                  </p>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'videos')}
                  />
                </div>
                {formData.videos.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.videos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                        <span className="text-sm">{file.name}</span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              videos: prev.videos.filter((_, i) => i !== index)
                            }));
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Video Link
                </Label>
                <Input
                  value={formData.videoLink}
                  onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                />
              </div>
            </div>

            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-2 p-6 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Create Test Case
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}