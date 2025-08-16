import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import FreelancerOnboarding from "./pages/onboarding/FreelancerOnboarding";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";  // 👈 added import
import NotFound from "./pages/NotFound";
import CreateContract from "./pages/contracts/CreateContract";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/onboarding/freelancer" element={<FreelancerOnboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} /> {/* ✅ new route */}
          <Route path="/contracts/create" element={<CreateContract />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
