import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useTheme } from '@/components/providers/theme-provider';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  href?: string;
  indent?: boolean;
  onClick?: () => void;
}

function NavItem({ label, isActive, indent, onClick }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-sm font-normal h-9 px-2",
        isActive && "bg-secondary/50 text-primary hover:bg-secondary/70",
        !isActive && "text-muted-foreground hover:text-foreground",
        indent && "pl-4"
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

interface DashboardSidebarProps {
  onDashboardClick: () => void;
  onAllProjectsClick: () => void;
  currentView: 'overview' | 'projects';
}

export function DashboardSidebar({ onDashboardClick, onAllProjectsClick, currentView }: DashboardSidebarProps) {
  const { user } = useAuthStore();
  const { theme } = useTheme();
  
  return (
    <div className="w-64 border-r h-full flex flex-col">
      <div className="p-2">
        <NavItem 
          label="Dashboard" 
          isActive={currentView === 'overview'} 
          onClick={onDashboardClick}
        />
      </div>
      
      <div className="p-2">
        <h2 className="text-xs font-medium px-2 py-1.5">Projects</h2>
        <NavItem 
          label="All projects" 
          isActive={currentView === 'projects'}
          onClick={onAllProjectsClick}
        />
      </div>

      <div className="p-2">
        <h2 className="text-xs font-medium px-2 py-1.5">Organizations</h2>
        <NavItem 
          label={user?.organization || ''} 
          isActive={true}
          className={cn(theme === 'dark' && "text-yellow-400")}
        />
      </div>

      <div className="p-2">
        <h2 className="text-xs font-medium px-2 py-1.5">Account</h2>
        <NavItem label="Preferences" />
        <NavItem label="Access Tokens" />
        <NavItem label="Security" />
        <NavItem label="Audit Logs" />
      </div>

      <Separator className="my-2" />

      <div className="p-2">
        <h2 className="text-xs font-medium px-2 py-1.5">Documentation</h2>
        <NavItem label="Guides" />
        <NavItem label="API Reference" />
      </div>

      <div className="mt-auto p-2">
        <NavItem label="Log out" />
      </div>
    </div>
  );
}