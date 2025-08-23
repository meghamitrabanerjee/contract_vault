import { DashboardData } from './types';

export const mockClientDashboardData: DashboardData = {
  user: {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    role: "client",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    phone: "+1 (555) 987-6543",
    company: "TechCorp Inc."
  },
  projects: [
    {
      id: 1,
      title: "E-commerce Platform Development",
      client: "TechCorp Inc.",
      status: "active",
      deadline: "2024-02-15",
      budget: 25000,
      paid: 12500,
      contracts: [
        { id: 1, name: "Initial Contract.pdf", url: "/contracts/1", uploadDate: "2024-01-10", size: "2.3 MB" },
        { id: 2, name: "Amendment 1.pdf", url: "/contracts/2", uploadDate: "2024-01-20", size: "1.1 MB" }
      ],
      progressSubmissions: [
        {
          id: 1,
          projectId: 1,
          submittedBy: "John Smith",
          submittedAt: "2024-01-25T10:30:00Z",
          files: [
            {
              id: 1,
              name: "frontend-screenshots.zip",
              url: "https://storage.example.com/progress/frontend-screenshots.zip",
              size: "2.5 MB",
              type: "application/zip",
              uploadDate: "2024-01-25T10:30:00Z"
            },
            {
              id: 2,
              name: "database-schema.pdf",
              url: "https://storage.example.com/progress/database-schema.pdf",
              size: "1.2 MB",
              type: "application/pdf",
              uploadDate: "2024-01-25T10:30:00Z"
            }
          ],
          description: "Completed the frontend development phase including user authentication, product catalog, and shopping cart functionality. Database schema has been finalized and implemented. Ready for client review.",
          status: "pending",
          reviewedBy: undefined,
          reviewedAt: undefined,
          feedback: undefined
        },
        {
          id: 2,
          projectId: 1,
          submittedBy: "John Smith",
          submittedAt: "2024-01-28T14:15:00Z",
          files: [
            {
              id: 3,
              name: "api-documentation.pdf",
              url: "https://storage.example.com/progress/api-documentation.pdf",
              size: "0.8 MB",
              type: "application/pdf",
              uploadDate: "2024-01-28T14:15:00Z"
            }
          ],
          description: "API integration completed. All endpoints are functional and documented. Payment gateway integration is working correctly.",
          status: "pending",
          reviewedBy: undefined,
          reviewedAt: undefined,
          feedback: undefined
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: "TechCorp Inc.",
      status: "active",
      deadline: "2024-03-01",
      budget: 35000,
      paid: 17500,
      contracts: [
        { id: 3, name: "Development Agreement.pdf", url: "/contracts/3", uploadDate: "2024-01-05", size: "3.2 MB" }
      ],
      progressSubmissions: [
        {
          id: 3,
          projectId: 2,
          submittedBy: "Mike Wilson",
          submittedAt: "2024-01-26T09:45:00Z",
          files: [
            {
              id: 4,
              name: "mobile-app-prototype.zip",
              url: "https://storage.example.com/progress/mobile-app-prototype.zip",
              size: "15.2 MB",
              type: "application/zip",
              uploadDate: "2024-01-26T09:45:00Z"
            }
          ],
          description: "Mobile app prototype completed with core features. User interface is responsive and follows design guidelines. Ready for testing phase.",
          status: "pending",
          reviewedBy: undefined,
          reviewedAt: undefined,
          feedback: undefined
        }
      ]
    },
    {
      id: 3,
      title: "Website Redesign",
      client: "TechCorp Inc.",
      status: "completed",
      deadline: "2024-01-30",
      budget: 15000,
      paid: 15000,
      contracts: [
        { id: 4, name: "Design Contract.pdf", url: "/contracts/4", uploadDate: "2023-12-15", size: "1.8 MB" }
      ],
      progressSubmissions: [
        {
          id: 4,
          projectId: 3,
          submittedBy: "Lisa Chen",
          submittedAt: "2024-01-20T16:20:00Z",
          files: [
            {
              id: 5,
              name: "final-design-mockups.pdf",
              url: "https://storage.example.com/progress/final-design-mockups.pdf",
              size: "8.7 MB",
              type: "application/pdf",
              uploadDate: "2024-01-20T16:20:00Z"
            }
          ],
          description: "Website redesign completed. All pages have been redesigned with modern UI/UX principles. Mobile responsiveness has been tested and verified.",
          status: "approved",
          reviewedBy: "Sarah Johnson",
          reviewedAt: "2024-01-22T10:30:00Z",
          feedback: "Excellent work! The design looks modern and professional. All requirements have been met."
        }
      ]
    }
  ],
  payments: [
    { id: 1, client: "TechCorp Inc.", amount: 12500, dueDate: "2024-02-01", status: "pending" },
    { id: 2, client: "TechCorp Inc.", amount: 17500, dueDate: "2024-02-15", status: "pending" },
    { id: 3, client: "TechCorp Inc.", amount: 10000, dueDate: "2024-02-28", status: "pending" }
  ],
  metrics: {
    activeProjects: 2,
    completedProjects: 1,
    rejectedContracts: 0
  }
};
