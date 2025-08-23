import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Shield,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { User as UserType, mockUsers, generateStarterData } from "@/lib/mockData";

interface RegisterProps {
  onRegister: (user: UserType) => void;
}

const Register = ({ onRegister }: RegisterProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "freelancer" as "freelancer" | "client",
    company: "",
    skills: [""],
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Skills handling
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index: number) => {
    if (formData.skills.length > 1) {
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index),
      }));
    }
  };

  // 🔹 Register form submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const existingUser = mockUsers.find(
        (user) => user.email === formData.email
      );
      if (existingUser) {
        setError("User with this email already exists.");
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: UserType = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        name: formData.name,
        company: formData.userType === "client" ? formData.company : undefined,
        skills:
          formData.userType === "freelancer"
            ? formData.skills.filter((s) => s.trim())
            : undefined,
      };

      mockUsers.push(newUser);
      generateStarterData(newUser.id, newUser.userType, newUser.name);

      setSuccess(`Welcome ${formData.name}! Redirecting...`);
      setTimeout(() => onRegister(newUser), 2000);
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fadeInUp">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-700">Contract Vault</h1>
          </div>
          <p className="text-emerald-600 text-sm">
            Create your account to get started
          </p>
        </div>

        {/* Register Card */}
        <Card className="border border-emerald-200 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.01]">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-semibold text-emerald-700">
              Create Your Account ✨
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Full Name */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                    required
                  />
                </div>
              </div>

              {/* User Type */}
              <div>
                <Label htmlFor="userType">I am a</Label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-emerald-200 rounded-md bg-white text-sm focus:border-emerald-400 focus:ring-emerald-300"
                >
                  <option value="freelancer">Freelancer</option>
                  <option value="client">Client Company</option>
                </select>
              </div>

              {/* Company (only for client) */}
              {formData.userType === "client" && (
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Skills (only for freelancer) */}
              {formData.userType === "freelancer" && (
                <div>
                  <Label>Skills</Label>
                  <div className="space-y-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="relative flex-1">
                          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                          <Input
                            type="text"
                            placeholder="e.g. React, Node.js"
                            value={skill}
                            onChange={(e) =>
                              handleSkillChange(index, e.target.value)
                            }
                            className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                            required
                          />
                        </div>
                        {formData.skills.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => removeSkill(index)}
                            className="px-2 border border-emerald-500 bg-emerald-500 text-white hover:text-red-500 hover:bg-gray-100"
                          >
                            ×
                          </Button>

                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={addSkill}
                      className="w-full border border-emerald-500 bg-emerald-500 text-white hover:bg-gray-100 hover:text-emerald-600"
                    >
                      + Add Skill
                    </Button>

                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
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

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-emerald-600" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error / Success */}
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
                {isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <p className="text-sm text-emerald-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-medium underline-offset-4 hover:underline transition-colors"
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
