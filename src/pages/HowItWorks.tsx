import { motion } from "framer-motion";
import { Shield, FileText, PenTool, DollarSign, Users, Clock } from "lucide-react";

const steps = [
  { title: "Contract Creation", icon: FileText, description: "Either freelancer or client initiates the contract by entering complete project details, timeline, payment amount & currency and the credentials of all parties involved. Contract is stored securely and can include auto‑generated legal clauses." },
  { title: "Review & Signature", icon: PenTool, description: "The other party receives a click‑wrap agreement link via email, reviews the contract and accepts it with a legally binding digital signature. Contract status updates to ‘Accepted’." },
  { title: "Escrow Deposit", icon: DollarSign, description: "Once the contract is accepted, the client deposits funds into secure escrow. Work cannot start until escrow is funded ensuring freelancer is guaranteed payment and client cannot back out unfairly." },
  { title: "Work Submission", icon: Clock, description: "Freelancer completes the work and submits proof of completion (screenshots, files, demos etc.) to the platform. Client can monitor the progress in real‑time." },
  { title: "Client Approval", icon: Users, description: "Client reviews the submitted work. If approved, escrow automatically releases funds to the freelancer. If delayed or refused, freelancer can initiate a claim providing submitted evidence." },
  { title: "Dispute / Resolution", icon: Users, description: "If the freelancer fails to deliver or the client disagrees, platform admin mediates the dispute. Based on evidence, escrow can be released to the rightful party and penalties may be applied as per the contract." },
  { title: "Platform Enforcement", icon: Shield, description: "Digital signatures and contract hash ensure tamper‑proof records. Escrow + admin intervention guarantee trust and fairness. Fines and penalties are clearly stated upfront and enforced where necessary." }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-emerald-50/50 py-24">
      <div className="container mx-auto px-4 text-center mb-20">
        <div className="inline-flex items-center gap-2 mb-4 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 text-sm text-emerald-700">
          <Shield className="w-4 h-4" />
          <span>Workflow Journey</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">How Contract Vault Works</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">A simple visual journey that guides freelancers and clients through each step of a secure contract workflow.</p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-emerald-300"></div>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className={`mb-20 flex w-full ${index % 2 === 0 ? 'justify-start pr-16' : 'justify-end pl-16'}`}
          >
            <div className="relative max-w-md w-full min-h-56 rounded-xl bg-white border border-emerald-200 p-10 shadow hover:shadow-xl transition duration-500 hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center shadow-md">
                <step.icon className="w-10 h-10 text-emerald-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 py-16 px-10 rounded-2xl shadow-lg max-w-xl mx-auto text-white">
          <h2 className="text-3xl font-semibold mb-4">Ready to secure your next project?</h2>
          <a href="/role-selection" className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 py-4 px-8 rounded-lg transition-colors font-semibold">
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
}
