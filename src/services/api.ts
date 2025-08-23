import { DashboardData, UserProfile } from '../types';
import { sendDisputeEmail } from '../lib/emailService';

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
      // First, upload files to get URLs (in a real app, this would be handled by your backend)
      const fileUrls: string[] = [];
      
      // Simulate file upload - in real app, you'd upload to cloud storage
      for (const file of disputeData.uploadedFiles) {
        // This is a placeholder - in reality, you'd upload to S3, Cloudinary, etc.
        const fakeUrl = `https://storage.example.com/disputes/${Date.now()}-${file.name}`;
        fileUrls.push(fakeUrl);
      }

      // Send email with dispute details
      await sendDisputeEmail({
        contractId: disputeData.contractId,
        complaintText: disputeData.complaintText,
        projectLink: disputeData.projectLink,
        contractDetails: disputeData.contractDetails,
        fileUrls: fileUrls.length > 0 ? fileUrls : undefined
      });

      // Store dispute in database (this would be handled by your backend)
      const disputeRecord = {
        contractId: disputeData.contractId,
        disputeRaisedBy: 'Current User', // This would come from user context
        disputeStatus: 'pending',
        disputeProofUrl: fileUrls,
        projectLink: disputeData.projectLink,
        complaintText: disputeData.complaintText,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // In a real app, you'd save this to your database
      console.log('Dispute record to save:', disputeRecord);

      return { success: true, disputeId: Date.now() };
    } catch (error) {
      console.error('Error submitting dispute:', error);
      throw new Error('Failed to submit dispute');
    }
  }

  // Progress submission
  async submitProgress(progressData: {
    projectId: number;
    description: string;
    uploadedFiles: File[];
  }) {
    try {
      // Simulate file upload
      const progressFiles = [];
      for (const file of progressData.uploadedFiles) {
        const fakeUrl = `https://storage.example.com/progress/${Date.now()}-${file.name}`;
        progressFiles.push({
          id: Date.now() + Math.random(),
          name: file.name,
          url: fakeUrl,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type,
          uploadDate: new Date().toISOString()
        });
      }

      // Create progress submission record
      const progressSubmission = {
        id: Date.now(),
        projectId: progressData.projectId,
        submittedBy: 'Current User', // This would come from user context
        submittedAt: new Date().toISOString(),
        files: progressFiles,
        description: progressData.description,
        status: 'pending' as const,
        reviewedBy: undefined,
        reviewedAt: undefined,
        feedback: undefined
      };

      console.log('Progress submission to save:', progressSubmission);
      return { success: true, submissionId: progressSubmission.id };
    } catch (error) {
      console.error('Error submitting progress:', error);
      throw new Error('Failed to submit progress');
    }
  }

  // Progress approval/rejection
  async reviewProgress(submissionId: number, action: 'approve' | 'reject', feedback?: string) {
    try {
      // In a real app, this would update the database
      const reviewData = {
        submissionId,
        action,
        feedback,
        reviewedBy: 'Current User', // This would come from user context
        reviewedAt: new Date().toISOString()
      };

      console.log('Progress review to save:', reviewData);
      return { success: true, reviewId: Date.now() };
    } catch (error) {
      console.error('Error reviewing progress:', error);
      throw new Error('Failed to review progress');
    }
  }
}

export const apiService = new ApiService();