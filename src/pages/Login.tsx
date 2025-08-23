import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom"; // ✅ use react-router-dom
import { User, mockUsers } from "@/lib/mockData";

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = mockUsers.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );

      if (!user) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess(`Welcome back, ${user.name}! Redirecting...`);

      setTimeout(() => {
        onLogin(user);
      }, 2000);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fadeInUp">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-700">
              Contract Vault
            </h1>
          </div>
          <p className="text-emerald-600 text-sm">
            Secure & seamless freelancer-client collaboration
          </p>
        </div>

        {/* Login Card */}
        <Card className="border border-emerald-200 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.01]">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-semibold text-emerald-700">
              Welcome Back 👋
            </CardTitle>
            <p className="text-sm text-emerald-600">
              Sign in to access your dashboard
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <Label htmlFor="login-email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="login-password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    className="pl-10 pr-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-emerald-600" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error / Success Messages */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md animate-shake">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md animate-fadeIn">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">{success}</span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-emerald-700">
                Don’t have an account?{" "}
                <Link
                  to="/register" // ✅ goes to Register.tsx
                  className="text-emerald-600 hover:text-emerald-700 font-medium underline-offset-4 hover:underline transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
