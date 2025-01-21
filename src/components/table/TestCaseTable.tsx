import { useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { useFolderStore } from "@/hooks/useFolderStore";
import { CreateTestCaseModal } from "../testcase/CreateTestCaseModal";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, X, FileText, User, Calendar, AlertTriangle, Activity, Image as ImageIcon, Video, Link2, History, Play } from "lucide-react";
import { TestCalendarView } from "../calendar/TestCalendarView";
import { Dialog, DialogContent } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import type { TestCase } from "@/types/testcase";

export function TestCaseTable() {
  const [data, setData] = useState([]);
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { selectedFolderId, folders } = useFolderStore();
  const selectedFolder = folders.find(f => f.id === selectedFolderId);

  const handleSaveTestCase = (testCase: any) => {
    setData([...data, testCase]);
  };

  return (
    <div className="space-y-4 p-6">
      {/* Header content remains the same */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {selectedFolder ? selectedFolder.name : 'All Test Cases'}
          </h2>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Test Case
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'table' ? 'secondary' : 'ghost'}
            onClick={() => setView('table')}
          >
            Table
          </Button>
          <Button
            variant={view === 'calendar' ? 'secondary' : 'ghost'}
            onClick={() => setView('calendar')}
          >
            Calendar
          </Button>
        </div>
      </div>

      <div className="relative">
        {view === 'table' ? (
          <DataTable columns={columns} data={data} onViewTestCase={setSelectedTestCase} />
        ) : (
          <TestCalendarView />
        )}

        {/* Details Panel - Now from right side */}
        <div className={cn(
          "fixed top-0 right-0 h-screen bg-background border-l transform transition-all duration-300 ease-in-out w-[600px] shadow-xl z-50",
          selectedTestCase ? "translate-x-0" : "translate-x-full"
        )}>
          {selectedTestCase && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Test Case Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedTestCase(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Tabs defaultValue="details" className="flex-1">
                <TabsList className="w-full justify-start border-b rounded-none px-4 h-12">
                  <TabsTrigger value="details" className="data-[state=active]:bg-primary/5">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="attachments" className="data-[state=active]:bg-primary/5">
                    Attachments
                  </TabsTrigger>
                  <TabsTrigger value="runs" className="data-[state=active]:bg-primary/5">
                    Runs
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-primary/5">
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="flex-1 p-6 m-0">
                  <ScrollArea className="h-[calc(100vh-8.5rem)]">
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          Basic Information
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <InfoCard label="ID" value={selectedTestCase.id} />
                          <InfoCard label="Title" value={selectedTestCase.title} />
                          <InfoCard 
                            label="Assigned QA" 
                            value={selectedTestCase.owner}
                            icon={<User className="h-4 w-4 text-primary" />}
                          />
                          <InfoCard 
                            label="Priority" 
                            value={selectedTestCase.priority}
                            icon={<AlertTriangle className="h-4 w-4 text-primary" />}
                          />
                          <InfoCard 
                            label="Type" 
                            value={selectedTestCase.type}
                            icon={<Activity className="h-4 w-4 text-primary" />}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Preconditions */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Preconditions</h4>
                        <div className="border rounded-lg p-4 space-y-2">
                          {selectedTestCase.preconditions?.map((condition: string, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-sm text-muted-foreground">{index + 1}.</span>
                              <p className="text-sm">{condition}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Results */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Expected Result</h4>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm">{selectedTestCase.expectedResult}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Actual Result</h4>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm">{selectedTestCase.actualResult}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="attachments" className="flex-1 p-6 m-0">
                  <ScrollArea className="h-[calc(100vh-8.5rem)]">
                    <div className="space-y-6">
                      {/* Images */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-primary" />
                          Images
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedTestCase.images?.map((image: File, index: number) => (
                            <div 
                              key={index} 
                              className="relative group cursor-pointer rounded-lg overflow-hidden"
                              onClick={() => setSelectedImage(URL.createObjectURL(image))}
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Test case image ${index + 1}`}
                                className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" size="sm">
                                  View Full Size
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Videos */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Video className="h-4 w-4 text-primary" />
                          Videos
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedTestCase.videos?.map((video: File, index: number) => (
                            <div 
                              key={index} 
                              className="relative group cursor-pointer rounded-lg overflow-hidden"
                              onClick={() => setSelectedVideo(URL.createObjectURL(video))}
                            >
                              <video
                                className="w-full h-40 object-cover"
                                poster={URL.createObjectURL(video)}
                              >
                                <source src={URL.createObjectURL(video)} type={video.type} />
                              </video>
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" size="sm">
                                  Play Video
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="runs" className="flex-1 p-6 m-0">
                  <ScrollArea className="h-[calc(100vh-8.5rem)]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Play className="h-4 w-4 text-primary" />
                          Test Runs
                        </h4>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Execute Test
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {selectedTestCase.runs?.map((run: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Run #{run.id}</span>
                              <span className={cn(
                                "text-xs px-2 py-1 rounded-full",
                                run.status === 'Passed' ? "bg-green-100 text-green-700" :
                                run.status === 'Failed' ? "bg-red-100 text-red-700" :
                                "bg-yellow-100 text-yellow-700"
                              )}>
                                {run.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Executed by {run.executedBy} on {new Date(run.executedAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="history" className="flex-1 p-6 m-0">
                  <ScrollArea className="h-[calc(100vh-8.5rem)]">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <History className="h-4 w-4 text-primary" />
                        Change History
                      </h4>
                      <div className="space-y-2">
                        {selectedTestCase.history?.map((event: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{event.action}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              by {event.user}
                            </p>
                            {event.changes && (
                              <div className="mt-2 text-sm">
                                <span className="text-muted-foreground">Changes: </span>
                                {event.changes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {/* Image and Video Preview Dialogs remain the same */}
        <Dialog 
          open={!!selectedImage} 
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-4xl p-0">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto"
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog 
          open={!!selectedVideo} 
          onOpenChange={() => setSelectedVideo(null)}
        >
          <DialogContent className="max-w-4xl p-0">
            {selectedVideo && (
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                className="w-full h-auto"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <CreateTestCaseModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSave={handleSaveTestCase}
      />
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4 space-y-1.5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
}