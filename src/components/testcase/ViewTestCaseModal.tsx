import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PRIORITIES, TYPES } from "@/lib/testcase";
import type { TestCase } from "@/types/testcase";

interface ViewTestCaseModalProps {
  testCase: TestCase | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTestCaseModal({ testCase, open, onOpenChange }: ViewTestCaseModalProps) {
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
                <Badge variant="outline" className={cn(
                  PRIORITIES[testCase.priority]
                )}>
                  {testCase.priority}
                </Badge>
                <Badge variant="outline" className={cn(
                  TYPES[testCase.type]
                )}>
                  {testCase.type}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <DetailItem 
                label="Owner"
                value={testCase.owner}
              />
              <DetailItem 
                label="Created By"
                value={testCase.createdBy}
              />
              <DetailItem 
                label="Created At"
                value={new Date(testCase.createdAt).toLocaleDateString()}
              />
              <DetailItem 
                label="Last Execution"
                value={testCase.lastExecution ? new Date(testCase.lastExecution).toLocaleDateString() : 'Not executed'}
              />
            </div>

            <Separator />

            {/* Test Steps */}
            <div className="space-y-4">
              <h3 className="font-medium">Test Steps</h3>
              <div className="space-y-4">
                <StepItem
                  number={1}
                  description="Navigate to the login page"
                  expected="Login page should be displayed with email and password fields"
                />
                <StepItem
                  number={2}
                  description="Enter valid credentials and click login"
                  expected="User should be successfully logged in and redirected to dashboard"
                />
              </div>
            </div>

            <Separator />

            {/* Attachments */}
            <div className="space-y-4">
              <h3 className="font-medium">Attachments</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Screenshots</p>
                  <div className="text-sm text-muted-foreground">No screenshots attached</div>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Videos</p>
                  <div className="text-sm text-muted-foreground">No videos attached</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Additional Info */}
            <div className="space-y-4">
              <h3 className="font-medium">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Prerequisites</p>
                  <div className="text-sm text-muted-foreground">
                    - Valid user credentials
                    <br />
                    - Active internet connection
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Notes</p>
                  <div className="text-sm text-muted-foreground">No additional notes</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function StepItem({ number, description, expected }: { number: number; description: string; expected: string }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-sm font-medium">{number}</span>
        </div>
        <div className="space-y-2">
          <p className="font-medium">{description}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Expected Result:</span> {expected}
          </p>
        </div>
      </div>
    </div>
  );
}