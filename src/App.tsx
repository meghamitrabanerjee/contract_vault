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
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import CreateContract from "./pages/contracts/CreateContract";
import DashboardPage from "./pages/DashboardPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthInitializer from "./components/AuthInitializer";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthInitializer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contracts/create" element={
                <ProtectedRoute allowedRoles={['freelancer']}>
                  <CreateContract />
                </ProtectedRoute>
              } />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthInitializer>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
