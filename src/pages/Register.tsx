import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Shield,
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Landmark,
  CreditCard,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  AtSign
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerUser, clearError } from "../store/slices/userSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector(state => state.user);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userType: "freelancer" as "freelancer" | "client",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Full name is required";
    }
    if (!formData.email.trim()) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      // Handle validation error (you might want to show this in the UI)
      console.error(validationError);
      return;
    }

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.userType,
      };

      await dispatch(registerUser(userData)).unwrap();
      setSuccess("Registration successful! Redirecting to dashboard...");
      
      // Redirect after successful registration
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (err) {
      // Error is handled by Redux
      console.error("Registration failed:", err);
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
            Create your account to get started
          </p>
        </div>

        {/* Register Card */}
        <Card className="border border-emerald-200 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.01]">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-semibold text-emerald-700">
              Create Account
            </CardTitle>
            <p className="text-sm text-emerald-600">
              Join our secure platform
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-emerald-700">
                  Full Name
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* User Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium text-emerald-700">
                  I am a
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: "freelancer" }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.userType === "freelancer"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-emerald-200 bg-white text-emerald-600 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">Freelancer</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: "client" }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.userType === "client"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-emerald-200 bg-white text-emerald-600 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Client</span>
                    </div>
                  </button>
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
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

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-emerald-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-emerald-100">
              <p className="text-sm text-emerald-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-emerald-700 hover:text-emerald-800 font-medium underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;