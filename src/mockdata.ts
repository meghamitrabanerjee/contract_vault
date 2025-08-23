import { DashboardData } from './types';

export const mockDashboardData: DashboardData = {
  user: {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "freelancer", // Change to "client" to test client functionality
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    phone: "+1 (555) 123-4567"
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
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: "StartupXYZ",
      status: "funded",
      deadline: "2025-04-20",
      budget: 35000,
      paid: 17500,
      contracts: [
        { id: 3, name: "Development Agreement.pdf", url: "/contracts/3", uploadDate: "2024-01-05", size: "3.2 MB" }
      ]
    },
    {
      id: 3,
      title: "Website Redesign",
      client: "Local Business",
      status: "released",
      deadline: "2025-01-15",
      budget: 15000,
      paid: 15000,
      contracts: [
        { id: 4, name: "Design Contract.pdf", url: "/contracts/4", uploadDate: "2023-12-15", size: "1.8 MB" }
      ]
    },
    {
      id: 4,
      title: "API Integration Project",
      client: "DataFlow Solutions",
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
      client: "CloudTech Systems",
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
      client: "Design Studio",
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
      client: "Media Corp",
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
      client: "Retail Solutions",
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
      client: "TechStart Inc.",
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
      client: "CryptoCorp",
      status: "work-submitted",
      deadline: "2025-10-05",
      budget: 30000,
      paid: 15000,
      contracts: [
        { id: 11, name: "Blockchain Contract.pdf", url: "/contracts/11", uploadDate: "2024-01-22", size: "4.2 MB" }
      ]
    },
    {
      id: 11,
      title: "Video Streaming Platform",
      client: "StreamTech",
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
      client: "SmartLiving",
      status: "draft",
      deadline: "2025-12-01",
      budget: 28000,
      paid: 0,
      contracts: [
        { id: 13, name: "IoT Contract.pdf", url: "/contracts/13", uploadDate: "2024-01-28", size: "2.9 MB" }
      ]
    }
  ],
  payments: [
    { id: 1, client: "TechCorp Inc.", amount: 12500, dueDate: "2024-02-01", status: "pending" },
    { id: 2, client: "StartupXYZ", amount: 17500, dueDate: "2024-02-15", status: "pending" },
    { id: 3, client: "DataFlow Solutions", amount: 10000, dueDate: "2024-02-28", status: "pending" },
    { id: 4, client: "CloudTech Systems", amount: 6000, dueDate: "2024-01-20", status: "overdue" }
  ],
  metrics: {
    activeProjects: 6, // accepted, funded, work-submitted (3 original + 3 new)
    completedProjects: 1, // released
    rejectedContracts: 1 // declined
  }
};
