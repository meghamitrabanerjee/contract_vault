import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, User, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold">Contract Vault</span>
          </div>
          <h1 className="text-headline mb-4">Choose Your Role</h1>
          <p className="text-subtitle text-muted-foreground">
            Let's personalize your experience based on how you'll be using Contract Vault.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Freelancer Card */}
          <Card className="border-2 border-border hover:border-primary/50 transition-all shadow-soft bg-card/80 backdrop-blur-sm group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-title mb-3">I'm a Freelancer</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Create contracts, send them to clients, and get paid securely through escrow. 
                Perfect for designers, developers, consultants, and agencies.
              </p>
              <div className="space-y-2 mb-8 text-sm text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Create professional contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Send for digital signatures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Receive secure escrow payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Track project milestones</span>
                </div>
              </div>
              <Link to="/onboarding/freelancer">
                <Button variant="hero" size="lg" className="w-full group">
                  Get Started as Freelancer
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Client Card */}
          <Card className="border-2 border-border hover:border-primary/50 transition-all shadow-soft bg-card/80 backdrop-blur-sm group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-title mb-3">I'm a Client</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Review and sign contracts from freelancers, make secure escrow deposits, 
                and release payments when work is completed to your satisfaction.
              </p>
              <div className="space-y-2 mb-8 text-sm text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Review contract details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Sign contracts digitally</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Make secure escrow deposits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Release payments safely</span>
                </div>
              </div>
              <Link to="/onboarding/client">
                <Button variant="accent" size="lg" className="w-full group">
                  Get Started as Client
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-small mb-4">
            Not sure which role fits you? You can always change this later in your settings.
          </p>
          <Link to="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;