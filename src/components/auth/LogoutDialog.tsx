import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    onOpenChange(false);
    navigate('/signin');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">Confirm Logout</DialogTitle>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            You will need to sign in again to access your workspace.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}