import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/hooks/useAuthStore";
import { cn } from "@/lib/utils";
import { validateEmail } from "@/lib/validators";
import { Eye, EyeOff, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = [
  "Head of Engineering",
  "QA Lead",
  "QA Engineer",
  "Software Engineer",
  "Test Automation Engineer",
  "Product Manager",
];

const ORGANIZATIONS = [
  { name: "UnidevGO", key: "111111", domain: "@unidevgo.com" },
  { name: "RoBenDevs", key: "222222", domain: "@robendevs.com" },
  { name: "Other", key: "", domain: "" },
];

export function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    orgKey: "",
    role: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const register = useAuthStore((state) => state.register);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.organization) {
      newErrors.organization = "Please select an organization";
    }

    const selectedOrg = ORGANIZATIONS.find(
      (org) => org.name === formData.organization
    );
    if (selectedOrg && selectedOrg.key) {
      if (!formData.orgKey) {
        newErrors.orgKey = "Organization key is required";
      } else if (formData.orgKey !== selectedOrg.key) {
        newErrors.orgKey = "Invalid organization key";
      }
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (
      selectedOrg?.domain &&
      !formData.email.endsWith(selectedOrg.domain)
    ) {
      newErrors.email = `Email must end with ${selectedOrg.domain}`;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await register(formData);

      if (success) {
        toast({
          title: "Account created successfully",
          description: "You can now sign in with your credentials",
        });
        navigate("/signin");
      } else {
        toast({
          title: "Registration failed",
          description: "Email already exists",
          variant: "destructive",
        });
      }
    }
  };

  const handleOrgChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      organization: value,
      orgKey: "",
    }));
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:block lg:w-1/2 bg-primary p-8">
        <div className="h-full flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Testing Community
          </h2>
          <p className="text-lg text-primary-foreground/80 text-center max-w-md">
            Create your account and start managing your test cases effectively
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-6 w-6 text-primary fill-primary/20" />
              <span className="text-xl font-semibold text-black">
                Test Stack
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-black">
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-black">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-black">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={cn(
                  "text-black",
                  errors.fullName && "border-red-500"
                )}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization" className="text-black">
                Organization
              </Label>
              <div className="relative">
                <select
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleOrgChange(e.target.value)}
                  className={cn(
                    "w-full px-4 py-1 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.organization && "border-red-500"
                  )}
                >
                  <option value="" disabled>
                    Select organization
                  </option>
                  {ORGANIZATIONS.map((org) => (
                    <option key={org.name} value={org.name}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.organization && (
                <p className="text-xs text-red-500">{errors.organization}</p>
              )}
            </div>

            {formData.organization && formData.organization !== "Other" && (
              <div className="space-y-2">
                <Label htmlFor="orgKey" className="text-black">
                  Organization Key
                </Label>
                <Input
                  id="orgKey"
                  type="password"
                  value={formData.orgKey}
                  onChange={(e) =>
                    setFormData({ ...formData, orgKey: e.target.value })
                  }
                  className={cn(
                    "text-black",
                    errors.orgKey && "border-red-500"
                  )}
                  placeholder="Enter organization key"
                />
                {errors.orgKey && (
                  <p className="text-xs text-red-500">{errors.orgKey}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="role" className="text-black">
                Role
              </Label>
              <div className="relative">
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-1 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.role && "border-red-500"
                  )}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={cn("text-black", errors.email && "border-red-500")}
                placeholder="Enter your email"
                maxLength={50}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={cn(
                    "text-black",
                    errors.password && "border-red-500"
                  )}
                  placeholder="Create a password"
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

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
