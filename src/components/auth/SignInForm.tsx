import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/hooks/useAuthStore';
import { cn } from '@/lib/utils';
import { validateEmail } from '@/lib/validators';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);
  const setLoading = useAuthStore((state) => state.setLoading);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const success = await login(email, password);
      
      if (success) {
        navigate('/loading');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-6 w-6 text-primary fill-primary/20" />
              <span className="text-xl font-semibold">TestStack</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Please enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(errors.email && "border-red-500")}
                placeholder="Enter your email"
                maxLength={50}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(errors.password && "border-red-500")}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="link"
                className="text-sm"
                onClick={() => navigate('/signup')}
              >
                Join, Right Now?
              </Button>
              <Button
                type="button"
                variant="link"
                className="text-sm"
              >
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:block lg:w-1/2 bg-primary p-8">
        <div className="h-full flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold mb-4">Test Smarter, Not Harder</h2>
          <p className="text-lg text-primary-foreground/80 text-center max-w-md">
            Streamline your testing process with our comprehensive test management platform
          </p>
        </div>
      </div>
    </div>
  );
}