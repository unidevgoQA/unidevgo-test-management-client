import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeDialog } from '@/components/theme/ThemeDialog';
import { Rocket, Zap, Palette } from 'lucide-react';
import { useAuthStore } from '@/hooks/useAuthStore';

export function WelcomeSlider({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const { user } = useAuthStore();

  const slides = [
    {
      icon: Zap,
      title: `Welcome aboard, ${user?.fullName}!`,
      description: "We're excited to have you join TestStack. Let's get you started with a quick tour.",
    },
    {
      icon: Rocket,
      title: "Streamline Your Testing",
      description: "Manage test cases, execute test plans, and generate comprehensive reports all in one place.",
    },
    {
      icon: Palette,
      title: "Choose Your Theme",
      description: "Before we begin, let's set up your preferred theme for the best experience.",
    },
  ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      setThemeDialogOpen(true);
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <Card className="w-[400px] p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ${
                    currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
                  }`}
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <slide.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{slide.title}</h2>
                  <p className="text-sm text-muted-foreground">{slide.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-4 bg-primary'
                        : 'w-1.5 bg-primary/30'
                    }`}
                  />
                ))}
              </div>
              <Button onClick={handleNext}>
                {currentSlide === slides.length - 1 ? 'Choose Theme' : 'Next'}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <ThemeDialog
        open={themeDialogOpen}
        onOpenChange={(open) => {
          setThemeDialogOpen(open);
          if (!open) {
            onComplete();
          }
        }}
      />
    </>
  );
}