  export interface Project {
    id: number;
    title: string;
    client: string;
    status: 'active' | 'completed' | 'pending' | 'overdue' | 'rejected';
    budget: number;
    paid: number;
    deadline: string;
    contracts: Contract[];
    progressSubmissions?: ProgressSubmission[];
  }
  
  export interface Contract {
    id: number;
    name: string;
    url: string;
    uploadDate: string;
    size: string;
  }
  
  export interface ProgressSubmission {
    id: number;
    projectId: number;
    submittedBy: string;
    submittedAt: string;
    files: ProgressFile[];
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: string;
    reviewedAt?: string;
    feedback?: string;
  }
  
  export interface ProgressFile {
    id: number;
    name: string;
    url: string;
    size: string;
    type: string;
    uploadDate: string;
  }
  
  export interface Payment {
    id: number;
    client: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
  }
  
  export interface UserProfile {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: 'freelancer' | 'client';
    phone?: string;
    company?: string;
  }
  
  export interface DashboardData {
    user: UserProfile;
    projects: Project[];
    payments: Payment[];
    metrics: {
      activeProjects: number;
      completedProjects: number;
      rejectedContracts: number;
    };
  }

  export interface Dispute {
    id: number;
    contractId: number;
    disputeRaisedBy: string;
    disputeStatus: 'pending' | 'reviewing' | 'resolved' | 'rejected';
    disputeProofUrl: string[];
    projectLink: string;
    complaintText: string;
    createdAt: string;
    updatedAt: string;
  }