import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FolderStatsProps {
  path: string[];
  passed: number;
  failed: number;
  notExecuted: number;
  className?: string;
  onExecute?: () => void;
}

export function FolderStats({ 
  path,
  passed, 
  failed, 
  notExecuted, 
  className,
  onExecute 
}: FolderStatsProps) {
  const total = passed + failed + notExecuted;
  const selectedFolder = path[path.length - 1];
  const truncatedName = selectedFolder.length > 30 
    ? selectedFolder.substring(0, 30) + '...' 
    : selectedFolder;

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * 36;
  
  // Calculate the stroke dasharray values for each segment
  const passedPercent = (passed / total) * circumference;
  const failedPercent = (failed / total) * circumference;
  const notRunPercent = (notExecuted / total) * circumference;

  return (
    <Card className={cn("p-3", className)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-foreground truncate">{truncatedName}</span>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={onExecute} className="shrink-0 ml-2">
            <Play className="h-3 w-3 mr-1" />
            Execute
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-muted/20"
              />
              {/* Not Run segment */}
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-yellow-500"
                strokeDasharray={`${notRunPercent} ${circumference}`}
                strokeDashoffset="0"
              />
              {/* Failed segment */}
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-red-500"
                strokeDasharray={`${failedPercent} ${circumference}`}
                strokeDashoffset={-notRunPercent}
              />
              {/* Passed segment */}
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-green-500"
                strokeDasharray={`${passedPercent} ${circumference}`}
                strokeDashoffset={-(notRunPercent + failedPercent)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold">{total}</div>
                <div className="text-[10px] text-muted-foreground">Total</div>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium">Passed</span>
              </div>
              <div className="text-lg font-bold text-green-500">{passed}</div>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs font-medium">Failed</span>
              </div>
              <div className="text-lg font-bold text-red-500">{failed}</div>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-xs font-medium">Not Run</span>
              </div>
              <div className="text-lg font-bold text-yellow-500">{notExecuted}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}