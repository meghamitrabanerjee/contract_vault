import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, PenTool, DollarSign, Users, Clock } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Contract Creation",
    description: "Generate professional contracts with our AI-powered templates. Include scope, timeline, deliverables, and payment terms.",
    highlight: "AI-Powered"
  },
  {
    icon: Shield,
    title: "Secure Escrow System",
    description: "Payments are held safely in escrow until work is completed and approved. No more chasing invoices or payment disputes.",
    highlight: "Protected Payments"
  },
  {
    icon: PenTool,
    title: "Digital Signatures",
    description: "Legally binding e-signatures that work globally. Track signature status and get notified when contracts are signed.",
    highlight: "Legally Binding"
  },
  {
    icon: DollarSign,
    title: "Automated Payouts",
    description: "Funds are automatically released when milestones are met. Fast, secure transfers to your preferred payment method.",
    highlight: "Instant Release"
  },
  {
    icon: Users,
    title: "KYC Verification",
    description: "Built-in identity verification for all parties. Ensures legitimate business relationships and regulatory compliance.",
    highlight: "Verified Users"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Monitor contract status, payment milestones, and deadlines in one centralized dashboard with instant notifications.",
    highlight: "Live Updates"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-muted border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-6">
            <Shield className="w-4 h-4" />
            <span>Everything you need</span>
          </div>
          <h2 className="text-headline mb-4">
            Complete Contract Management
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            From creation to payment, we handle every aspect of your contract workflow so you can focus on delivering great work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-soft bg-card/60 backdrop-blur-sm hover:shadow-medium transition-all group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-title text-sm font-semibold">{feature.title}</h3>
                      <span className="text-xs bg-accent-muted text-accent px-2 py-1 rounded-full">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-small leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};