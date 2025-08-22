import { useState, useEffect } from 'react';
import { DashboardData, Project, Payment, UserProfile } from '../types';
import { apiService } from '../services/api';

// Mock data for development when backend is not available
const mockDashboardData: DashboardData = {
  user: {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Senior Developer",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    phone: "+1 (555) 123-4567"
  },
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      client: "TechCorp Inc.",
      status: "active",
      deadline: "2024-02-15",
      budget: 25000,
      paid: 12500,
      contracts: [
        { id: 1, name: "Initial Contract.pdf", url: "/contracts/1", uploadDate: "2024-01-10", size: "2.3 MB" },
        { id: 2, name: "Amendment 1.pdf", url: "/contracts/2", uploadDate: "2024-01-20", size: "1.1 MB" }
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: "StartupXYZ",
      status: "active",
      deadline: "2024-03-01",
      budget: 35000,
      paid: 17500,
      contracts: [
        { id: 3, name: "Development Agreement.pdf", url: "/contracts/3", uploadDate: "2024-01-05", size: "3.2 MB" }
      ]
    },
    {
      id: 3,
      title: "Website Redesign",
      client: "Local Business",
      status: "completed",
      deadline: "2024-01-30",
      budget: 15000,
      paid: 15000,
      contracts: [
        { id: 4, name: "Design Contract.pdf", url: "/contracts/4", uploadDate: "2023-12-15", size: "1.8 MB" }
      ]
    }
  ],
  payments: [
    { id: 1, client: "TechCorp Inc.", amount: 12500, dueDate: "2024-02-01", status: "pending" },
    { id: 2, client: "StartupXYZ", amount: 17500, dueDate: "2024-02-15", status: "pending" }
  ],
  metrics: {
    activeProjects: 2,
    completedProjects: 1,
    pendingPayments: 30000
  }
};

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiService.getDashboardData();
      setDashboardData(data);
    } catch (apiError) {
      console.error('Dashboard API error:', apiError);
      setError('Unable to connect to server. Using offline data.');
      // Fallback to mock data when API is unavailable
      setDashboardData(mockDashboardData);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<UserProfile>) => {
    try {
      const updatedUser = await apiService.updateUserProfile(userData);
      setDashboardData(prevData => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          user: updatedUser
        };
      });
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  const downloadContract = async (contractId: number, fileName: string) => {
    try {
      const blob = await apiService.downloadContract(contractId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download contract');
      throw err;
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboardData,
    updateUserProfile,
    downloadContract
  };
};