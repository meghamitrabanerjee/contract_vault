import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Shield,
  PenTool,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: FileText,
    title: "Contract Builder",
    description:
      "Quickly create professional freelance contracts with ready-made templates. Customize scope, deliverables, timelines, and payment terms.",
    highlight: "Ready Templates",
  },
  {
    icon: Shield,
    title: "Payment Protection",
    description:
      "Funds stay securely held until both parties agree that the work has been delivered properly. No more unpaid invoices or ghosting.",
    highlight: "Protect Payments",
  },
  {
    icon: PenTool,
    title: "Digital Signatures",
    description:
      "Legally valid e-signatures that work globally. All signatures are tracked and logged in real-time.",
    highlight: "Legally Binding",
  },
  {
    icon: DollarSign,
    title: "Milestone-based Payouts",
    description:
      "Break your project into milestones and release funds as each part is completed. Complete control over how and when you get paid.",
    highlight: "Flexible",
  },
  {
    icon: Users,
    title: "KYC Verification",
    description:
      "Both freelancers and clients go through identity checks so you always know who you’re working with.",
    highlight: "Verified Users",
  },
  {
    icon: Clock,
    title: "Live Status Tracking",
    description:
      "Track contract status, deadlines and payment checkpoints in one central dashboard with real-time notifications.",
    highlight: "Realtime",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100/40 border border-emerald-200 rounded-full px-4 py-2 text-sm text-emerald-700 mb-4">
            <Shield className="w-4 h-4" />
            <span>Everything you need</span>
          </div>
          <h2 className="text-headline mb-3">Complete Contract Management</h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            From creation and signing to payouts and tracking — Contract Vault
            handles the whole workflow so you can focus on your work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 14,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              className="transition-transform hover:-translate-y-1 flex"
            >
              <Card className="h-full border border-muted rounded-xl shadow-md bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-title text-sm font-semibold">
                          {feature.title}
                        </h3>
                        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-small leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
