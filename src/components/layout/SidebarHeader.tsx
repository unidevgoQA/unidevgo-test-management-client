import { useState } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AboutModal } from '@/components/about/AboutModal';

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <div className="p-2 border-b">
        <div className={cn(
          "flex items-center gap-2 px-2 py-1.5",
          !isCollapsed && "justify-start",
          isCollapsed && "justify-center"
        )}>
          <Zap 
            className={cn(
              "h-4 w-4 text-primary fill-primary/20",
              isCollapsed ? "thunder-animation" : "hover:animate-bounce transition-all"
            )} 
          />
          {!isCollapsed && (
            <span 
              className="font-medium text-[0.92rem] cursor-pointer select-none"
              onDoubleClick={() => setAboutOpen(true)}
            >
              TestStack
            </span>
          )}
        </div>
      </div>

      <AboutModal 
        open={aboutOpen}
        onOpenChange={setAboutOpen}
      />
    </>
  );
}