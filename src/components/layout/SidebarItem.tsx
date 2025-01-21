import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ 
  icon: Icon, 
  label, 
  active = false, 
  isCollapsed = false,
  disabled = false,
  onClick 
}: SidebarItemProps) {
  const button = (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "w-full justify-start gap-3 px-3 h-10",
        active && "bg-secondary/50 text-primary hover:bg-secondary/70",
        !active && "text-muted-foreground hover:text-foreground hover:bg-secondary/30",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className={cn(
        "h-5 w-5",
        active && "text-primary",
      )} />
      {!isCollapsed && <span className="text-sm font-normal">{label}</span>}
    </Button>
  );

  if (isCollapsed && !disabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}