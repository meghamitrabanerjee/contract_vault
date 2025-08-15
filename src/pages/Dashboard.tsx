import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  FileText, 
  DollarSign, 
  Users, 
  Settings, 
  Plus, 
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

// Mock data
const stats = [
  { title: "Active Contracts", value: "12", change: "+2 this month", icon: FileText, color: "text-primary" },
  { title: "Pending Signatures", value: "3", change: "2 due today", icon: Clock, color: "text-warning" },
  { title: "Total Escrow", value: "$24,500", change: "+$5,200 this month", icon: DollarSign, color: "text-accent" },
  { title: "Completed Projects", value: "45", change: "+8 this month", icon: CheckCircle, color: "text-success" },
];

const contracts = [
  {
    id: "CNT-001",
    client: "TechCorp Inc.",
    project: "Website Redesign",
    value: "$8,500",
    status: "Active",
    dueDate: "Dec 15, 2024",
    progress: 65
  },
  {
    id: "CNT-002", 
    client: "StartupXYZ",
    project: "Mobile App UI",
    value: "$12,000",
    status: "Pending Signature",
    dueDate: "Dec 20, 2024",
    progress: 0
  },
  {
    id: "CNT-003",
    client: "Fashion Brand",
    project: "Brand Identity",
    value: "$6,200",
    status: "In Review",
    dueDate: "Dec 10, 2024",
    progress: 90
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-accent text-accent-foreground";
      case "Pending Signature": return "bg-warning text-warning-foreground";
      case "In Review": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Contract Vault</span>
            </div>
            <Badge variant="outline" className="text-xs">Freelancer</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="hero" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Contract
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card">
          <nav className="p-4 space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "contracts", label: "Contracts", icon: FileText },
              { id: "clients", label: "Clients", icon: Users },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-smooth ${
                    activeTab === item.id 
                      ? "bg-primary text-primary-foreground shadow-elegant" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-headline mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-muted-foreground">Here's what's happening with your contracts today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="shadow-elegant border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-small font-medium">{stat.title}</p>
                        <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contracts Table */}
          <Card className="shadow-elegant border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Contracts
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{contract.project}</p>
                          <p className="text-small">{contract.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{contract.client}</TableCell>
                      <TableCell className="font-medium">{contract.value}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{contract.dueDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;