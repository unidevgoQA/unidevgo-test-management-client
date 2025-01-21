import { cn } from '@/lib/utils';

interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export function ColorButton({ color, isSelected, onClick }: ColorButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-6 h-6 rounded-full transition-transform",
        `bg-${color}-500`,
        isSelected ? "scale-125 ring-2 ring-offset-2 ring-primary" : ""
      )}
      onClick={onClick}
    />
  );
}