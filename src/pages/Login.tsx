import React, { useState, useEffect } from "react";
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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser, clearError } from "../store/slices/userSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useAppSelector(state => state.user);
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    try {
      await dispatch(loginUser(loginData)).unwrap();
      setSuccess("Login successful! Redirecting...");
      
      // Redirect after successful login
      setTimeout(() => {
        const from = (location.state as any)?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }, 1000);
    } catch (err) {
      // Error is handled by Redux
      console.error("Login failed:", err);
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
              Welcome Back
            </CardTitle>
            <p className="text-sm text-emerald-600">
              Sign in to access your dashboard
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-emerald-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-emerald-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    className="pl-10 pr-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h3 className="text-sm font-medium text-emerald-700 mb-2">Demo Credentials:</h3>
              <div className="space-y-1 text-xs text-emerald-600">
                <p><strong>Freelancer:</strong> john@example.com / password123</p>
                <p><strong>Client:</strong> sarah@example.com / password123</p>
                <p><strong>Freelancer 2:</strong> mike@example.com / password123</p>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-emerald-100">
              <p className="text-sm text-emerald-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-emerald-700 hover:text-emerald-800 font-medium underline"
                >
                  Sign up here
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