import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";  // ✅ import Link

export const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">Contract Vault</span>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* ✅ Link Sign In to Login.tsx */}
          <Button
            variant="ghost"
            size="sm"
            className="border border-emerald-500 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100/20"
            asChild
          >
            <Link to="/login">Sign In</Link>
          </Button>

          {/* ✅ Link Sign Up to Register.tsx */}
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            asChild
          >
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
