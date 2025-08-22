// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Your main pages
import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import FreelancerOnboarding from "./pages/onboarding/FreelancerOnboarding";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import CreateContract from "./pages/contracts/CreateContract";

// ✅ Bolt dashboard page
import DashboardPage from "./pages/DashboardPage";

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
          <Route path="/dashboard" element={<DashboardPage />} /> {/* ✅ dashboard here */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contracts/create" element={<CreateContract />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
