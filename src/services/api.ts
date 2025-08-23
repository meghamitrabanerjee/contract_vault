import { DashboardData, UserProfile } from '../types';
import { mockDashboardData } from '../mockdata';
import { sendDisputeEmail } from '../lib/emailService';

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

  // Payments
  async getUpcomingPayments() {
    return this.request('/payments/upcoming');
  },

  // Dispute submission
  async submitDispute(disputeData: {
    contractId: number;
    complaintText: string;
    projectLink: string;
    uploadedFiles: File[];
    contractDetails: {
      projectTitle: string;
      client: string;
      freelancer: string;
      deadline: string;
      budget: number;
      paid: number;
    };
  }) {
    try {
      const fileUrls: string[] = [];

      for (const file of disputeData.uploadedFiles) {
        const fakeUrl = `https://storage.example.com/disputes/${Date.now()}-${file.name}`;
        fileUrls.push(fakeUrl);
      }

      await sendDisputeEmail({
        contractId: disputeData.contractId,
        complaintText: disputeData.complaintText,
        projectLink: disputeData.projectLink,
        contractDetails: disputeData.contractDetails,
        fileUrls: fileUrls.length > 0 ? fileUrls : undefined,
      });

      const disputeRecord = {
        contractId: disputeData.contractId,
        disputeRaisedBy: 'Current User',
        disputeStatus: 'pending',
        disputeProofUrl: fileUrls,
        projectLink: disputeData.projectLink,
        complaintText: disputeData.complaintText,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('Dispute record to save:', disputeRecord);
      return { success: true, disputeId: Date.now() };
    } catch (error) {
      console.error('Error submitting dispute:', error);
      throw new Error('Failed to submit dispute');
    }
  },

  // Progress submission
  async submitProgress(progressData: {
    projectId: number;
    description: string;
    uploadedFiles: File[];
  }) {
    try {
      const progressFiles = [];
      for (const file of progressData.uploadedFiles) {
        const fakeUrl = `https://storage.example.com/progress/${Date.now()}-${file.name}`;
        progressFiles.push({
          id: Date.now() + Math.random(),
          name: file.name,
          url: fakeUrl,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type,
          uploadDate: new Date().toISOString(),
        });
      }

      const progressSubmission = {
        id: Date.now(),
        projectId: progressData.projectId,
        submittedBy: 'Current User',
        submittedAt: new Date().toISOString(),
        files: progressFiles,
        description: progressData.description,
        status: 'pending' as const,
        reviewedBy: undefined,
        reviewedAt: undefined,
        feedback: undefined,
      };

      console.log('Progress submission to save:', progressSubmission);
      return { success: true, submissionId: progressSubmission.id };
    } catch (error) {
      console.error('Error submitting progress:', error);
      throw new Error('Failed to submit progress');
    }
  },

  // Progress approval/rejection
  async reviewProgress(submissionId: number, action: 'approve' | 'reject', feedback?: string) {
    try {
      const reviewData = {
        submissionId,
        action,
        feedback,
        reviewedBy: 'Current User',
        reviewedAt: new Date().toISOString(),
      };

      console.log('Progress review to save:', reviewData);
      return { success: true, reviewId: Date.now() };
    } catch (error) {
      console.error('Error reviewing progress:', error);
      throw new Error('Failed to review progress');
    }
  },

  // User API calls
  async loginUser(credentials: { email: string; password: string }): Promise<any> {
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
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log('User logged out');
  },

  // Generic request handler (assumes method exists)
  async request(endpoint: string): Promise<any> {
    // Simulated fetch/request logic
    console.log(`API Request to: ${endpoint}`);
    return {};
  },
};
