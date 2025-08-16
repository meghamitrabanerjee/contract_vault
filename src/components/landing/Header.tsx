import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

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
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="border border-emerald-500 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100/20"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            asChild
          >
            <a href="/role-selection">Sign Up</a>
          </Button>
        </div>
      </div>
    </header>
  );
};
