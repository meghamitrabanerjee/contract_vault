import { DashboardData } from './types';

export const mockDashboardData: DashboardData = {
  user: {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Senior Developer",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    phone: "+1 (555) 123-4567"
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
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: "StartupXYZ",
      status: "active",
      deadline: "2024-03-01",
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
      status: "completed",
      deadline: "2024-01-30",
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
      status: "pending",
      deadline: "2024-04-15",
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
      status: "overdue",
      deadline: "2024-01-20",
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
      status: "rejected",
      deadline: "2024-02-10",
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
      status: "rejected",
      deadline: "2024-03-15",
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
      status: "rejected",
      deadline: "2024-02-28",
      budget: 18000,
      paid: 0,
      contracts: [
        { id: 9, name: "Integration Contract.pdf", url: "/contracts/9", uploadDate: "2024-01-12", size: "3.1 MB" }
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
    activeProjects: 2,
    completedProjects: 1,
    rejectedContracts: 3
  }
};
