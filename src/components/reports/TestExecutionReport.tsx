import { DashboardSidebar } from '../dashboard/DashboardSidebar';

export function TestExecutionReport() {
  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Test Execution Report</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Summary Cards */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Tests</h3>
              <p className="text-3xl font-bold">128</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Passed</h3>
              <p className="text-3xl font-bold text-green-600">112</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Failed</h3>
              <p className="text-3xl font-bold text-red-600">12</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Skipped</h3>
              <p className="text-3xl font-bold text-yellow-600">4</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Test Execution Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium mb-4">Execution Timeline</h3>
              <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                Timeline Chart
              </div>
            </div>

            {/* Test Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium mb-4">Test Distribution</h3>
              <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                Distribution Chart
              </div>
            </div>
          </div>

          {/* Recent Test Executions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-sm font-medium">Recent Test Executions</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/5 rounded-lg">
                    <div>
                      <p className="font-medium">Test Run #{i}</p>
                      <p className="text-sm text-muted-foreground">Executed 2 hours ago</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-green-600">32 passed</span>
                        <span className="mx-2">•</span>
                        <span className="text-red-600">2 failed</span>
                      </div>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: '94%' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}