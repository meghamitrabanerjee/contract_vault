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
      status: "work-submitted",
      deadline: "2025-03-15",
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
      status: "funded",
      deadline: "2025-04-20",
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
      status: "released",
      deadline: "2025-01-15",
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
    },
    {
      id: 4,
      title: "API Integration Project",
      client: "TechCorp Inc.",
      status: "sent",
      deadline: "2025-05-10",
      budget: 20000,
      paid: 0,
      contracts: [
        { id: 5, name: "Service Agreement.pdf", url: "/contracts/5", uploadDate: "2024-01-25", size: "1.5 MB" }
      ]
    },
    {
      id: 5,
      title: "Database Optimization",
      client: "TechCorp Inc.",
      status: "disputed",
      deadline: "2025-02-28",
      budget: 12000,
      paid: 6000,
      contracts: [
        { id: 6, name: "Technical Contract.pdf", url: "/contracts/6", uploadDate: "2023-12-20", size: "2.1 MB" }
      ]
    },
    {
      id: 6,
      title: "UI/UX Design Project",
      client: "TechCorp Inc.",
      status: "declined",
      deadline: "2025-06-15",
      budget: 8000,
      paid: 0,
      contracts: [
        { id: 7, name: "Design Contract.pdf", url: "/contracts/7", uploadDate: "2024-01-15", size: "1.2 MB" }
      ]
    },
    {
      id: 7,
      title: "Content Management System",
      client: "TechCorp Inc.",
      status: "draft",
      deadline: "2025-07-30",
      budget: 15000,
      paid: 0,
      contracts: [
        { id: 8, name: "CMS Contract.pdf", url: "/contracts/8", uploadDate: "2024-01-08", size: "2.8 MB" }
      ]
    },
    {
      id: 8,
      title: "E-commerce Integration",
      client: "TechCorp Inc.",
      status: "accepted",
      deadline: "2025-08-15",
      budget: 18000,
      paid: 0,
      contracts: [
        { id: 9, name: "Integration Contract.pdf", url: "/contracts/9", uploadDate: "2024-01-12", size: "3.1 MB" }
      ]
    },
    {
      id: 9,
      title: "AI Chatbot Development",
      client: "TechCorp Inc.",
      status: "funded",
      deadline: "2025-09-20",
      budget: 22000,
      paid: 11000,
      contracts: [
        { id: 10, name: "AI Development Contract.pdf", url: "/contracts/10", uploadDate: "2024-01-18", size: "2.7 MB" }
      ]
    },
    {
      id: 10,
      title: "Blockchain Wallet App",
      client: "TechCorp Inc.",
      status: "work-submitted",
      deadline: "2025-10-05",
      budget: 30000,
      paid: 15000,
      contracts: [
        { id: 11, name: "Blockchain Contract.pdf", url: "/contracts/11", uploadDate: "2024-01-22", size: "4.2 MB" }
      ],
      progressSubmissions: [
        {
          id: 5,
          projectId: 10,
          submittedBy: "Alex Rodriguez",
          submittedAt: "2024-01-30T11:20:00Z",
          files: [
            {
              id: 6,
              name: "wallet-app-demo.zip",
              url: "https://storage.example.com/progress/wallet-app-demo.zip",
              size: "25.3 MB",
              type: "application/zip",
              uploadDate: "2024-01-30T11:20:00Z"
            },
            {
              id: 7,
              name: "security-audit-report.pdf",
              url: "https://storage.example.com/progress/security-audit-report.pdf",
              size: "3.1 MB",
              type: "application/pdf",
              uploadDate: "2024-01-30T11:20:00Z"
            }
          ],
          description: "Blockchain wallet application completed with multi-currency support. Security audit has been performed and all vulnerabilities have been addressed. Ready for production deployment.",
          status: "pending",
          reviewedBy: undefined,
          reviewedAt: undefined,
          feedback: undefined
        }
      ]
    },
    {
      id: 11,
      title: "Video Streaming Platform",
      client: "TechCorp Inc.",
      status: "sent",
      deadline: "2025-11-12",
      budget: 45000,
      paid: 0,
      contracts: [
        { id: 12, name: "Streaming Platform Contract.pdf", url: "/contracts/12", uploadDate: "2024-01-25", size: "3.8 MB" }
      ]
    },
    {
      id: 12,
      title: "IoT Smart Home System",
      client: "TechCorp Inc.",
      status: "draft",
      deadline: "2025-12-01",
      budget: 28000,
      paid: 0,
      contracts: [
        { id: 13, name: "IoT Contract.pdf", url: "/contracts/13", uploadDate: "2024-01-28", size: "2.9 MB" }
      ]
    },
    {
      id: 13,
      title: "Cloud Migration Project",
      client: "TechCorp Inc.",
      status: "approved",
      deadline: "2025-01-30",
      budget: 35000,
      paid: 17500,
      contracts: [
        { id: 14, name: "Cloud Migration Contract.pdf", url: "/contracts/14", uploadDate: "2023-12-10", size: "4.5 MB" }
      ],
      progressSubmissions: [
        {
          id: 6,
          projectId: 13,
          submittedBy: "David Kim",
          submittedAt: "2024-01-15T14:30:00Z",
          files: [
            {
              id: 8,
              name: "migration-completion-report.pdf",
              url: "https://storage.example.com/progress/migration-completion-report.pdf",
              size: "5.2 MB",
              type: "application/pdf",
              uploadDate: "2024-01-15T14:30:00Z"
            },
            {
              id: 9,
              name: "performance-testing-results.xlsx",
              url: "https://storage.example.com/progress/performance-testing-results.xlsx",
              size: "1.8 MB",
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              uploadDate: "2024-01-15T14:30:00Z"
            }
          ],
          description: "Cloud migration completed successfully. All systems have been migrated to AWS with improved performance metrics. Disaster recovery procedures have been implemented.",
          status: "approved",
          reviewedBy: "Sarah Johnson",
          reviewedAt: "2024-01-18T09:15:00Z",
          feedback: "Outstanding work! The migration was completed ahead of schedule and all performance benchmarks have been exceeded."
        }
      ]
    },
    {
      id: 14,
      title: "Mobile Game Development",
      client: "TechCorp Inc.",
      status: "refunded",
      deadline: "2025-02-15",
      budget: 25000,
      paid: 0,
      contracts: [
        { id: 15, name: "Game Development Contract.pdf", url: "/contracts/15", uploadDate: "2023-11-20", size: "3.3 MB" }
      ]
    }
  ],
  payments: [
    { id: 1, client: "TechCorp Inc.", amount: 12500, dueDate: "2024-02-01", status: "pending" },
    { id: 2, client: "TechCorp Inc.", amount: 17500, dueDate: "2024-02-15", status: "pending" },
    { id: 3, client: "TechCorp Inc.", amount: 10000, dueDate: "2024-02-28", status: "pending" }
  ],
  metrics: {
    activeProjects: 6, // work-submitted, funded, accepted (3 original + 3 new)
    completedProjects: 2, // released, approved
    rejectedContracts: 1 // declined
  }
};
