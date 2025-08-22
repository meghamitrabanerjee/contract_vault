export interface Project {
    id: number;
    title: string;
    client: string;
    status: 'active' | 'completed' | 'pending' | 'overdue';
    budget: number;
    paid: number;
    deadline: string;
    contracts: Contract[];
  }
  
  export interface Contract {
    id: number;
    name: string;
    url: string;
    uploadDate: string;
    size: string;
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
    role: string;
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
      pendingPayments: number;
    };
  }