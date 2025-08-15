import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, CheckCircle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust indicator */}
          <div className="inline-flex items-center gap-2 bg-primary-muted border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-8">
            <Shield className="w-4 h-4" />
            <span>Trusted by 10,000+ freelancers worldwide</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-display mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Secure Contracts & Escrow
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-subtitle text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create professional contracts, get them signed digitally, and protect your payments with built-in escrow. 
            Perfect for freelancers who want to work with confidence.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="/role-selection">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="premium" size="xl">
              Watch Demo
            </Button>
          </div>
          
          {/* Key benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-accent-muted rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <span className="text-muted-foreground">Setup in 5 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-accent-muted rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-accent" />
              </div>
              <span className="text-muted-foreground">Bank-level security</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-accent-muted rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-accent" />
              </div>
              <span className="text-muted-foreground">Legal compliance</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};