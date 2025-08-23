// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

// Your main pages
import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import FreelancerOnboarding from "./pages/onboarding/FreelancerOnboarding";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import CreateContract from "./pages/contracts/CreateContract";

// ✅ Bolt dashboard page
import DashboardPage from "./pages/DashboardPage";
import Register from "./pages/Register";
import Login  from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
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
            <Route
              path="/register"
              element={
                <Register
                  onRegister={() => {
                    // TODO: Implement registration logic or navigation
                  }}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  onLogin={() => {
                    // TODO: Implement login logic or navigation
                  }}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
