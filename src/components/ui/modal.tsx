import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  title: string; // Make title required
}

export function Modal({ children, open, onClose, title }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}