import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { AuthGuard } from "@/components/auth/AuthGuard";
import MainLayout from "@/components/layout/MainLayout";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <Router>
          <AuthGuard>
            <Routes>
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/loading" element={<LoadingScreen />} />
              <Route path="/dashboard" element={<MainLayout />} />
              <Route path="/" element={<Navigate to="/signin" replace />} />
            </Routes>
          </AuthGuard>
        </Router>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}