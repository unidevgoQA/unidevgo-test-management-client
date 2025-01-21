import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TableList } from './TableList';
import { Header } from './Header';
import { DashboardView } from '../dashboard/DashboardView';
import { DashboardSidebar } from '../dashboard/DashboardSidebar';
import { DashboardOverview } from '../dashboard/DashboardOverview';
import { TestCaseTable } from '../table/TestCaseTable';
import { useSidebarStore } from '@/hooks/useSidebarStore';
import { cn } from '@/lib/utils';
import { useTestCaseTable } from '@/hooks/useTestCaseTable';

type View = 'dashboard-overview' | 'dashboard-projects' | 'testcases';

interface MainLayoutState {
  view: View;
  projectSelected: boolean;
}

export default function MainLayout() {
  const [state, setState] = useState<MainLayoutState>({
    view: 'dashboard-overview',
    projectSelected: false
  });
  
  const { isExpanded } = useSidebarStore();
  const { table } = useTestCaseTable();

  const handleProjectSelect = () => {
    setState({
      view: 'testcases',
      projectSelected: true
    });
  };

  const handleDashboardClick = () => {
    setState({
      view: 'dashboard-overview',
      projectSelected: false
    });
  };

  const handleAllProjectsClick = () => {
    setState({
      view: 'dashboard-projects',
      projectSelected: false
    });
  };

  const renderContent = () => {
    switch (state.view) {
      case 'dashboard-overview':
        return (
          <div className="flex flex-1">
            <DashboardSidebar 
              currentView="overview"
              onDashboardClick={handleDashboardClick}
              onAllProjectsClick={handleAllProjectsClick}
            />
            <div className="flex-1 flex flex-col">
              <Header 
                projectSelected={state.projectSelected}
                projectName={state.projectSelected ? "madTest" : undefined}
              />
              <DashboardOverview />
            </div>
          </div>
        );

      case 'dashboard-projects':
        return (
          <div className="flex flex-1">
            <DashboardSidebar 
              currentView="projects"
              onDashboardClick={handleDashboardClick}
              onAllProjectsClick={handleAllProjectsClick}
            />
            <div className="flex-1 flex flex-col">
              <Header 
                projectSelected={state.projectSelected}
                projectName={state.projectSelected ? "madTest" : undefined}
              />
              <DashboardView onProjectSelect={handleProjectSelect} />
            </div>
          </div>
        );

      case 'testcases':
        return (
          <div className="flex flex-1">
            <TableList />
            <div className={cn(
              "flex-1 flex flex-col transition-all duration-300",
              isExpanded ? "ml-0" : "-ml-[320px]"
            )}>
              <Header 
                projectSelected={state.projectSelected}
                projectName="madTest"
                showTabs={state.projectSelected}
                table={table}
              />
              <TestCaseTable />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-full">
        <Sidebar 
          currentView={state.view === 'testcases' ? 'testcases' : 'dashboard'}
          onViewChange={(view) => setState(prev => ({ 
            ...prev, 
            view: view === 'dashboard' ? 'dashboard-overview' : 'testcases'
          }))}
          projectSelected={state.projectSelected}
        />
        <div className="flex flex-1 pl-16">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}