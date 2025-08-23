import { useState, useEffect } from 'react';
import { DashboardData, Project, Payment, UserProfile } from '../types';
import { apiService } from '../services/api';
import { mockDashboardData } from '../mockdata';
import { mockClientDashboardData } from '../mockdata-client';
import { useAppSelector } from '../store/hooks';

export const useDashboard = () => {
  const { currentUser } = useAppSelector(state => state.user);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug logging
      console.log('Loading mock data for user:', currentUser);
      
      // Use mock data based on user role
      if (currentUser?.role === 'client') {
        console.log('Loading client dashboard data');
        setDashboardData(mockClientDashboardData);
      } else {
        console.log('Loading freelancer dashboard data');
        setDashboardData(mockDashboardData);
      }
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
    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUser]);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboardData,
    updateUserProfile,
    downloadContract
  };
};