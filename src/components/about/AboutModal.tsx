import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Zap, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_VERSION } from "@/lib/constants";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-size-200 animate-gradient-shift" />
          
          <div className="relative p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="h-6 w-6 text-primary fill-primary/20 thunder-animation" />
              <div className="flex flex-col items-center">
                <DialogTitle className="text-xl font-semibold">TestStack</DialogTitle>
                <span className="text-xs text-muted-foreground">{APP_VERSION}</span>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <div className="space-y-1">
                <h3 className="font-medium">S.M. Fardin Ahosan</h3>
                <p className="text-sm text-muted-foreground">Software Engineer, QA</p>
                <p className="text-sm text-muted-foreground">unidevGO Software Solutions Ltd.</p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/fardinahosan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/fardinahosancse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}