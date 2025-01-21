import { Card } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Automation Coverage</h3>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Percentage of automated test cases
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-3xl font-bold">35.9%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Automated Test Cases</h3>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Total number of automated test cases
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-3xl font-bold">46</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Manual Test Cases</h3>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Total number of manual test cases
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-3xl font-bold">82</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Test Cases</h3>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Total number of all test cases
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-3xl font-bold">128</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Type of Test Cases</h3>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Distribution of test cases by type
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Placeholder for pie chart */}
          <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
            Pie Chart
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Trend of Test Cases</h3>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Test cases trend over time
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Placeholder for line chart */}
          <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
            Line Chart
          </div>
        </Card>
      </div>
    </div>
  );
}