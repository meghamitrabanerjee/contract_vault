import { useState, useEffect } from 'react';
import { DashboardData, Project, Payment, UserProfile } from '../types';
import { apiService } from '../services/api';
import { mockDashboardData } from '../mockdata';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use mock data directly for now since backend is not ready
      setDashboardData(mockDashboardData);
    } catch (error) {
      console.error('Dashboard error:', error);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<UserProfile>) => {
    try {
      // Mock profile update for now
      const updatedUser = { ...mockDashboardData.user, ...userData };
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
      // Mock download - just log for now
      console.log(`Downloading contract ${contractId}: ${fileName}`);
      // In a real implementation, this would download the actual file
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