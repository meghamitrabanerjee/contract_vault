import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, CheckCircle } from "lucide-react";

// The animation component with 15 shapes for a denser effect
const AnimatedBackground = () => {
  return (
    <div className="area">
      <ul className="circles">
        
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(255,255,255,0.4) 100%), radial-gradient(rgba(16,185,129,0.10) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Animated shapes component */}
      <AnimatedBackground />

      {/* Gradient overlay for the fade-to-white effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white"></div>

      {/* Main content container, stacked on top with z-10 */}
      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust indicator */}
          <div className="inline-flex items-center gap-2 bg-emerald-100/40 border border-emerald-200 rounded-full px-4 py-2 text-sm text-emerald-700 mb-4">
            <Shield className="w-4 h-4" />
            <span>Trusted by freelancers and small businesses</span>
          </div>

          {/* Main headline */}
          <h1 className="text-display mb-3 text-foreground">
            Secure Freelance Contracts
            <br />
            <span className="text-emerald-600">Without The Hassle</span>
          </h1>

          {/* Subheadline */}
          <p className="text-subtitle text-muted-foreground mb-6 max-w-2xl mx-auto">
            Create professional agreements, send them for digital signatures and
            make sure both sides stay protected – even if the deal started in a
            DM.
          </p>

          {/* CTA button */}
          <div className="flex justify-center mb-8">
            <Button
              size="xl"
              className="group bg-emerald-500 hover:bg-emerald-600 text-white"
              asChild
            >
              <a href="/register">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Key benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-muted-foreground">Setup in minutes</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-muted-foreground">Secure & private</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-muted-foreground">Legally compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};