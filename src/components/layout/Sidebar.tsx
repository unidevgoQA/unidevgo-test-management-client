import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ThemeDialog } from '@/components/theme/ThemeDialog';
import { LogoutDialog } from '@/components/auth/LogoutDialog';
import { APP_VERSION } from '@/lib/constants';
import { 
  Home, 
  Users, 
  Shield, 
  Users2,
  Link2, 
  BarChart3,
  Settings, 
  User,
  TestTube,
  ClipboardList,
  Play,
  PieChart,
  LogOut
} from 'lucide-react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
  currentView: 'dashboard' | 'testcases';
  onViewChange: (view: 'dashboard' | 'testcases') => void;
  projectSelected: boolean;
}

export function Sidebar({ currentView, onViewChange, projectSelected }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const shouldExpand = !isCollapsed || isHovered;

  const getDashboardItems = () => [
    { icon: Users, label: 'People' },
    { icon: Shield, label: 'Roles' },
    { icon: Users2, label: 'Team' },
    { icon: Link2, label: 'Integration' },
    { icon: BarChart3, label: 'Analytics' }
  ];

  const getTestItems = () => [
    { icon: TestTube, label: 'Test Cases' },
    { icon: ClipboardList, label: 'Test Plan' },
    { icon: Play, label: 'Test Execution' },
    { icon: PieChart, label: 'Report' }
  ];

  const menuItems = currentView === 'dashboard' ? getDashboardItems() : getTestItems();

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 h-screen border-r bg-background flex flex-col transition-all duration-300 z-50",
          shouldExpand ? "w-64" : "w-16"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsCollapsed(true);
        }}
      >
        <SidebarHeader isCollapsed={!shouldExpand} />
        <Separator className="mb-2" />
        
        <div className="px-3 py-2">
          <SidebarItem 
            icon={Home}
            label="Dashboard" 
            isCollapsed={!shouldExpand}
            active={currentView === 'dashboard'}
            onClick={() => onViewChange('dashboard')}
          />
        </div>
        <Separator className="mb-2" />
        
        <div className="flex-1 flex flex-col gap-1 px-3">
          {menuItems.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon}
              label={item.label}
              isCollapsed={!shouldExpand}
              active={currentView === 'testcases' && item.label === 'Test Cases'}
              onClick={() => item.label === 'Test Cases' && onViewChange('testcases')}
              disabled={currentView === 'testcases' && !projectSelected}
            />
          ))}
        </div>

        <Separator className="mb-2" />
        <div className="px-3 pb-3 flex flex-col gap-1">
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            isCollapsed={!shouldExpand}
            onClick={() => setThemeDialogOpen(true)}
          />
          <SidebarItem 
            icon={User} 
            label="User" 
            isCollapsed={!shouldExpand} 
          />
          <SidebarItem 
            icon={LogOut} 
            label="Logout" 
            isCollapsed={!shouldExpand}
            onClick={() => setLogoutDialogOpen(true)}
          />
          <div className={cn(
            "text-[0.65rem] text-muted-foreground text-center mt-2",
            !shouldExpand && "px-1"
          )}>
            {APP_VERSION}
          </div>
        </div>
      </div>
      <ThemeDialog 
        open={themeDialogOpen} 
        onOpenChange={setThemeDialogOpen}
      />
      <LogoutDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
      />
    </>
  );
}