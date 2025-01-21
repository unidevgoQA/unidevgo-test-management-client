import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { WelcomeSlider } from '../onboarding/WelcomeSlider';
import { useAuthStore } from '@/hooks/useAuthStore';

export function LoadingScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(`welcome-seen-${user?.id}`);
    
    const timer = setTimeout(() => {
      if (!hasSeenWelcome) {
        setShowWelcome(true);
      } else {
        navigate('/dashboard');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  const handleWelcomeComplete = () => {
    if (user?.id) {
      localStorage.setItem(`welcome-seen-${user.id}`, 'true');
    }
    navigate('/dashboard');
  };

  return (
    <>
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center">
          <Zap className="h-16 w-16 text-primary fill-primary/20 thunder-animation mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Welcome to TestStack</h1>
          <p className="text-muted-foreground">Preparing your workspace...</p>
        </div>
      </div>

      {showWelcome && <WelcomeSlider onComplete={handleWelcomeComplete} />}
    </>
  );
}