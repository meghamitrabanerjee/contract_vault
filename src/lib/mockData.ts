export interface User {
    id: string;
    email: string;
    password: string;
    userType: 'freelancer' | 'client';
    name: string;
    company?: string;
    skills?: string[];
  }
  
  // Shared mock database of registered users
  export const mockUsers: User[] = [
    {
      id: "1",
      email: "sarah@freelancer.com",
      password: "password123",
      userType: "freelancer",
      name: "Sarah Johnson",
      skills: ["Web Design", "UI/UX", "React"]
    },
    {
      id: "2",
      email: "mike@freelancer.com",
      password: "password123",
      userType: "freelancer",
      name: "Mike Chen",
      skills: ["Mobile Development", "iOS", "React Native"]
    },
    {
      id: "3",
      email: "techcorp@company.com",
      password: "password123",
      userType: "client",
      name: "TechCorp Inc.",
      company: "TechCorp Inc."
    },
    {
      id: "4",
      email: "startup@company.com",
      password: "password123",
      userType: "client",
      name: "StartupXYZ",
      company: "StartupXYZ"
    }
  ];
  
  // User-specific contracts data
  export interface Contract {
    id: string;
    project: string;
    client?: string;
    freelancer?: string;
    value: string;
    status: string;
    dueDate: string;
    progress: number;
    startDate: string;
    milestones?: Array<{ id: number; name: string; completed: boolean; dueDate: string }>;
  }
  
  export const userContracts: Record<string, Contract[]> = {
    // Sarah Johnson's contracts (freelancer)
    "1": [
      {
        id: "CNT-001",
        project: "Website Redesign",
        client: "TechCorp Inc.",
        value: "$8,500",
        status: "In Progress",
        dueDate: "Dec 25, 2024",
        progress: 65,
        startDate: "Nov 1, 2024",
        milestones: [
          { id: 1, name: "Design Mockups", completed: true, dueDate: "Nov 15, 2024" },
          { id: 2, name: "Homepage Development", completed: true, dueDate: "Nov 30, 2024" },
          { id: 3, name: "About Page", completed: false, dueDate: "Dec 10, 2024" },
          { id: 4, name: "Final Testing", completed: false, dueDate: "Dec 12, 2024" }
        ]
      },
      {
        id: "CNT-002",
        project: "Mobile App UI",
        client: "StartupXYZ",
        value: "$12,000",
        status: "Review Phase",
        dueDate: "Dec 20, 2024",
        progress: 85,
        startDate: "Oct 15, 2024",
        milestones: [
          { id: 1, name: "Wireframes", completed: true, dueDate: "Oct 25, 2024" },
          { id: 2, name: "Design System", completed: true, dueDate: "Nov 10, 2024" },
          { id: 3, name: "Screen Designs", completed: true, dueDate: "Nov 30, 2024" },
          { id: 4, name: "Client Review", completed: false, dueDate: "Dec 25, 2024" }
        ]
      }
    ],
    // Mike Chen's contracts (freelancer)
    "2": [
      {
        id: "CNT-003",
        project: "Brand Identity",
        client: "Fashion Brand",
        value: "$6,200",
        status: "Completed",
        dueDate: "Dec 10, 2024",
        progress: 100,
        startDate: "Sep 20, 2024",
        milestones: [
          { id: 1, name: "Logo Design", completed: true, dueDate: "Oct 5, 2024" },
          { id: 2, name: "Color Palette", completed: true, dueDate: "Oct 20, 2024" },
          { id: 3, name: "Typography", completed: true, dueDate: "Nov 5, 2024" },
          { id: 4, name: "Brand Guidelines", completed: true, dueDate: "Nov 25, 2024" }
        ]
      }
    ],
    // TechCorp Inc.'s contracts (client)
    "3": [
      {
        id: "CNT-001",
        project: "Website Redesign",
        freelancer: "Sarah Johnson",
        value: "$8,500",
        status: "In Progress",
        dueDate: "Dec 25, 2024",
        progress: 65,
        startDate: "Nov 1, 2024"
      },
      {
        id: "CNT-004",
        project: "E-commerce Platform",
        freelancer: "Alex Rodriguez",
        value: "$15,000",
        status: "Planning",
        dueDate: "Jan 15, 2025",
        progress: 15,
        startDate: "Dec 1, 2024"
      }
    ],
    // StartupXYZ's contracts (client)
    "4": [
      {
        id: "CNT-002",
        project: "Mobile App UI",
        freelancer: "Mike Chen",
        value: "$12,000",
        status: "Review Phase",
        dueDate: "Dec 20, 2024",
        progress: 85,
        startDate: "Oct 15, 2024"
      }
    ]
  };
  
  // User-specific project updates data
  export interface ProjectUpdate {
    id: number;
    contractId: string;
    project: string;
    client?: string;
    freelancer?: string;
    update: string;
    status: string;
    date: string;
    type: string;
    attachments?: string[];
  }
  
  export const userProjectUpdates: Record<string, ProjectUpdate[]> = {
    // Sarah Johnson's updates (freelancer)
    "1": [
      {
        id: 1,
        contractId: "CNT-001",
        project: "Website Redesign",
        client: "TechCorp Inc.",
        update: "Completed the homepage design and started working on the about page. All feedback from the last review has been incorporated.",
        status: "On Track",
        date: "Dec 5, 2024",
        type: "progress",
        attachments: ["homepage-mockup.png", "about-page-wireframe.pdf"]
      },
      {
        id: 2,
        contractId: "CNT-002",
        project: "Mobile App UI",
        client: "StartupXYZ",
        update: "Final design mockups are ready for review. Please check the latest version in the shared folder.",
        status: "Awaiting Review",
        date: "Dec 4, 2024",
        type: "review",
        attachments: ["app-screens.zip", "design-specs.pdf"]
      }
    ],
    // Mike Chen's updates (freelancer)
    "2": [
      {
        id: 3,
        contractId: "CNT-003",
        project: "Brand Identity",
        client: "Fashion Brand",
        update: "Project completed successfully! All deliverables have been sent and the final payment has been processed.",
        status: "Completed",
        date: "Dec 3, 2024",
        type: "completed",
        attachments: ["brand-guidelines.pdf", "logo-files.zip"]
      }
    ],
    // TechCorp Inc.'s updates (client)
    "3": [
      {
        id: 1,
        contractId: "CNT-001",
        project: "Website Redesign",
        freelancer: "Sarah Johnson",
        update: "Completed the homepage design and started working on the about page. All feedback from the last review has been incorporated.",
        status: "On Track",
        date: "Dec 5, 2024",
        type: "progress"
      },
      {
        id: 4,
        contractId: "CNT-004",
        project: "E-commerce Platform",
        freelancer: "Alex Rodriguez",
        update: "Initial project scope and timeline have been finalized. Starting with the database architecture design.",
        status: "On Track",
        date: "Dec 2, 2024",
        type: "planning"
      }
    ],
    // StartupXYZ's updates (client)
    "4": [
      {
        id: 2,
        contractId: "CNT-002",
        project: "Mobile App UI",
        freelancer: "Mike Chen",
        update: "Final design mockups are ready for review. Please check the latest version in the shared folder.",
        status: "Awaiting Review",
        date: "Dec 4, 2024",
        type: "review"
      }
    ]
  };
  
  // User-specific feedback queries data
  export interface FeedbackQuery {
    id: number;
    subject: string;
    message: string;
    status: string;
    priority: string;
    date: string;
    category: string;
  }
  
  export const userFeedbackQueries: Record<string, FeedbackQuery[]> = {
    // Sarah Johnson's queries (freelancer)
    "1": [
      {
        id: 1,
        subject: "Contract Timeline Extension",
        message: "I need to extend the timeline for the website redesign project due to additional requirements from the client. Can we discuss the new timeline?",
        status: "Open",
        priority: "High",
        date: "Dec 5, 2024",
        category: "Contract Changes"
      },
      {
        id: 2,
        subject: "Payment Question",
        message: "I'd like to understand the payment schedule for milestone-based projects. When can I expect the next payment?",
        status: "Answered",
        priority: "Medium",
        date: "Dec 3, 2024",
        category: "Billing"
      }
    ],
    // Mike Chen's queries (freelancer)
    "2": [
      {
        id: 3,
        subject: "Platform Feature Request",
        message: "It would be helpful to have a time tracking feature for projects. Is this something that could be implemented?",
        status: "In Progress",
        priority: "Low",
        date: "Dec 1, 2024",
        category: "Platform"
      }
    ],
    // TechCorp Inc.'s queries (client)
    "3": [
      {
        id: 1,
        subject: "Contract Modification Request",
        message: "We need to add two additional pages to the website redesign project. Can we discuss the timeline and cost implications?",
        status: "Open",
        priority: "Medium",
        date: "Dec 5, 2024",
        category: "Contract Changes"
      },
      {
        id: 2,
        subject: "Payment Schedule Question",
        message: "I'd like to understand the payment schedule for milestone-based projects. Are there any options for more frequent payments?",
        status: "Answered",
        priority: "Low",
        date: "Dec 3, 2024",
        category: "Billing"
      }
    ],
    // StartupXYZ's queries (client)
    "4": [
      {
        id: 3,
        subject: "Platform Feature Request",
        message: "It would be helpful to have a notification system when freelancers submit updates. Is this feature planned?",
        status: "In Progress",
        priority: "High",
        date: "Dec 1, 2024",
        category: "Platform"
      }
    ]
  };
  
  // Function to generate starter data for new users
  export const generateStarterData = (userId: string, userType: 'freelancer' | 'client', userName: string) => {
    if (userType === 'freelancer') {
      // Add starter contract for new freelancers
      if (!userContracts[userId]) {
        userContracts[userId] = [
          {
            id: `CNT-${userId}-001`,
            project: "Welcome Project",
            client: "Sample Client",
            value: "$2,000",
            status: "Planning",
            dueDate: "Jan 30, 2025",
            progress: 10,
            startDate: "Jan 1, 2025",
            milestones: [
              { id: 1, name: "Project Setup", completed: false, dueDate: "Jan 5, 2025" },
              { id: 2, name: "Initial Design", completed: false, dueDate: "Jan 15, 2025" },
              { id: 3, name: "Client Review", completed: false, dueDate: "Jan 25, 2025" }
            ]
          }
        ];
      }
  
      // Add starter project update
      if (!userProjectUpdates[userId]) {
        userProjectUpdates[userId] = [
          {
            id: 1,
            contractId: `CNT-${userId}-001`,
            project: "Welcome Project",
            client: "Sample Client",
            update: "Welcome to Contract Vault! This is a sample project to help you get started. You can create real contracts and track your progress here.",
            status: "On Track",
            date: "Jan 1, 2025",
            type: "planning"
          }
        ];
      }
  
      // Add starter feedback query
      if (!userFeedbackQueries[userId]) {
        userFeedbackQueries[userId] = [
          {
            id: 1,
            subject: "Getting Started",
            message: "Hi! I'm new to the platform and would love some guidance on how to create my first contract and manage projects effectively.",
            status: "Open",
            priority: "Medium",
            date: "Jan 1, 2025",
            category: "General"
          }
        ];
      }
    } else {
      // Add starter contract for new clients
      if (!userContracts[userId]) {
        userContracts[userId] = [
          {
            id: `CNT-${userId}-001`,
            project: "Sample Project",
            freelancer: "Sample Freelancer",
            value: "$3,500",
            status: "Planning",
            dueDate: "Feb 15, 2025",
            progress: 5,
            startDate: "Jan 15, 2025"
          }
        ];
      }
  
      // Add starter project update
      if (!userProjectUpdates[userId]) {
        userProjectUpdates[userId] = [
          {
            id: 1,
            contractId: `CNT-${userId}-001`,
            project: "Sample Project",
            freelancer: "Sample Freelancer",
            update: "Welcome to Contract Vault! This is a sample project to help you understand how the platform works. You can create real projects and hire freelancers here.",
            status: "On Track",
            date: "Jan 15, 2025",
            type: "planning"
          }
        ];
      }
  
      // Add starter feedback query
      if (!userFeedbackQueries[userId]) {
        userFeedbackQueries[userId] = [
          {
            id: 1,
            subject: "Platform Introduction",
            message: "Hello! I'm new to Contract Vault and would like to understand how to post projects and find suitable freelancers for my business needs.",
            status: "Open",
            priority: "Medium",
            date: "Jan 15, 2025",
            category: "General"
          }
        ];
      }
    }
  }; 