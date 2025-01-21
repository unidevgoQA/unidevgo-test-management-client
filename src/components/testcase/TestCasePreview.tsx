import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, User, Calendar, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestCase } from "@/types/testcase";

interface TestCasePreviewProps {
  testCase: TestCase | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestCasePreview({ testCase, open, onOpenChange }: TestCasePreviewProps) {
  if (!testCase) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Test Case Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-medium">{testCase.title}</h2>
                <p className="text-sm text-muted-foreground">ID: {testCase.id}</p>
              </div>
              <div className="flex gap-2">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  testCase.priority === 'High' ? "bg-red-100 text-red-700" :
                  testCase.priority === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                )}>
                  {testCase.priority}
                </span>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  testCase.type === 'Automated' ? "bg-blue-100 text-blue-700" :
                  "bg-slate-100 text-slate-700"
                )}>
                  {testCase.type}
                </span>
              </div>
            </div>

            <Separator />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <DetailItem 
                label="Owner"
                value={testCase.owner}
                icon={<User className="h-4 w-4 text-primary" />}
              />
              <DetailItem 
                label="Created By"
                value={testCase.createdBy}
                icon={<User className="h-4 w-4 text-primary" />}
              />
              <DetailItem 
                label="Created At"
                value={new Date(testCase.createdAt).toLocaleDateString()}
                icon={<Calendar className="h-4 w-4 text-primary" />}
              />
              <DetailItem 
                label="Last Execution"
                value={testCase.lastExecution ? new Date(testCase.lastExecution).toLocaleDateString() : 'Not executed'}
                icon={<Calendar className="h-4 w-4 text-primary" />}
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
}