import { DashboardData, UserProfile } from '../types';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if token exists
        ...(localStorage.getItem('token') && {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Dashboard data
  async getDashboardData(): Promise<DashboardData> {
    return this.request<DashboardData>('/dashboard');
  }

  // User profile
  async getUserProfile(): Promise<UserProfile> {
    return this.request<UserProfile>('/user/profile');
  }

  async updateUserProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Contract downloads
  async downloadContract(contractId: number): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/download`, {
      headers: {
        ...(localStorage.getItem('token') && {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download contract: ${response.status}`);
    }

    return response.blob();
  }

  // Projects
  async getProjects(filters?: { status?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    
    const queryString = params.toString();
    return this.request(`/projects${queryString ? `?${queryString}` : ''}`);
  }

  // Payments
  async getUpcomingPayments() {
    return this.request('/payments/upcoming');
  }
}

export const apiService = new ApiService();