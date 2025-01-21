import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface ThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeDialog({ open, onOpenChange }: ThemeDialogProps) {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <Button
                key={theme.value}
                variant="outline"
                className={cn(
                  "justify-start gap-2 h-12",
                  currentTheme === theme.value && "border-primary"
                )}
                onClick={() => {
                  setTheme(theme.value);
                  onOpenChange(false);
                }}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{theme.name}</span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}