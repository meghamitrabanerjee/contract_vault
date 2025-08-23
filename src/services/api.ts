import { DashboardData } from '../types';
import { mockDashboardData } from '../mockdata';

// Mock API service - replace with real API calls when backend is ready
export const apiService = {
  // Dashboard API calls
  async getDashboardData(): Promise<DashboardData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDashboardData;
  },

  async updateUserProfile(userData: any): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...mockDashboardData.user, ...userData };
  },

  // Contract API calls
  async downloadContract(contractId: number, fileName: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Downloading contract ${contractId}: ${fileName}`);
  },

  async generateContract(projectData: any): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Generating contract for project:', projectData);
    return {
      id: Date.now(),
      title: `Contract for ${projectData.title}`,
      fileName: `contract_${projectData.id || Date.now()}.pdf`,
      url: '#',
      createdAt: new Date().toISOString(),
    };
  },

  async reportDispute(projectId: number, reason: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Reporting dispute for project ${projectId}: ${reason}`);
    return { projectId, reason, status: 'pending' };
  },

  // User API calls
  async loginUser(credentials: { email: string; password: string }): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Login attempt:', credentials.email);
    return {
      id: 1,
      name: 'John Doe',
      email: credentials.email,
      role: 'freelancer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    };
  },

  async logoutUser(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log('User logged out');
  },
};