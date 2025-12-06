import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Auth = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
    department: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { updateLoginHistory } = useUserContext();
  const { login } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const user = {
          _id: data._id,
          email: data.email,
          name: data.name,
          roles: data.roles || [data.role] // Support both old and new format
        };
        
        login(user, data.token);
        updateLoginHistory(loginData.email);
        
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${user.name}!`,
        });
        
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
        toast({
          title: "Login Failed",
          description: data.message || "Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError("Network error. Please try again.");
      toast({
        title: "Connection Error",
        description: "Unable to connect to server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate signup data
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupData.fullName,
          email: signupData.email,
          password: signupData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const user = {
          _id: data._id,
          email: data.email,
          name: data.name,
          roles: ['client'] // Default role for public signup
        };
        
        login(user, data.token);
        updateLoginHistory(signupData.email);
        
        toast({
          title: "Account Created Successfully!",
          description: `Welcome, ${user.name}!`,
        });
        
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed.");
        toast({
          title: "Registration Failed",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError("Network error. Please try again.");
      toast({
        title: "Connection Error",
        description: "Unable to connect to server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoAccount: any) => {
    setLoading(true);
    setError(null);

    try {
      // Try to login with demo credentials
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: demoAccount.email,
          password: demoAccount.password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const user = {
          _id: data._id,
          email: data.email,
          name: data.name,
          roles: data.roles || [demoAccount.role]
        };
        
        login(user, data.token);
        updateLoginHistory(demoAccount.email);
        
        toast({
          title: "Demo Login Successful!",
          description: `Logged in as ${demoAccount.label}.`,
        });
        
        navigate("/dashboard");
      } else {
        toast({
          title: "Demo Login Failed",
          description: "Demo account not configured. Please contact administrator.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: "ceo@demo.com", password: "demo123", label: "CEO Demo", role: "ceo" },
    { email: "contentmanager@demo.com", password: "demo123", label: "Content Demo", role: "content-manager" },
    { email: "financemanager@demo.com", password: "demo123", label: "Finance Demo", role: "finance-manager" },
    { email: "hr@demo.com", password: "demo123", label: "HR Demo", role: "hr" },
    { email: "hod@demo.com", password: "demo123", label: "HOD Demo", role: "hod" },
    { email: "employee@demo.com", password: "demo123", label: "Employee Demo", role: "employee" },
    { email: "intern@demo.com", password: "demo123", label: "Intern Demo", role: "intern" },
    { email: "client@demo.com", password: "demo123", label: "Client Demo", role: "client" },
    { email: "student@demo.com", password: "demo123", label: "Student Demo", role: "student" }
  ];

  const allowedSignupRoles = [
    { value: "client", label: "Client" },
    { value: "intern", label: "Intern" }
  ];

  const departments = [
    { value: "ai-dev", label: "AI Development" },
    { value: "web-mobile", label: "Web & Mobile Development" },
    { value: "blockchain", label: "Blockchain" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "robotics", label: "Robotics" },
    { value: "networking", label: "Networking & Space Tech" },
    { value: "research", label: "Research & Development" },
    { value: "design", label: "Design & UX" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
    { value: "operations", label: "Operations" }
  ];

  return (
    <PageTransition>
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white">
                Welcome
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-1 bg-white/10">
                  <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
                    Login
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email" className="text-white">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="login-email"
                        placeholder="Enter your email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password" className="text-white">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="login-password"
                        placeholder="Enter your password"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  Need an account? Contact the administrator.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Auth;