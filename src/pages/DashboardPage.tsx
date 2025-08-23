import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Contact as FileContract, Users, Clock, CheckCircle, AlertTriangle, TrendingUp, Search, Filter, MoreHorizontal, Edit3 } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { ContractsList } from '../components/ContractList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Project, UserProfile } from '../types';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${getStatusStyles(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const UserProfileCard: React.FC<{ user: UserProfile; onUpdate: () => Promise<void> }> = ({ user, onUpdate }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-100"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.role}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <button
        onClick={onUpdate}
        className="w-full flex items-center justify-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02]"
      >
        <Edit3 className="w-4 h-4" />
        <span>Update Profile</span>
      </button>
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend?: string }> = ({ 
  title, 
  value, 
  icon, 
  trend 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-emerald-50 rounded-lg">
          <div className="text-emerald-600">{icon}</div>
        </div>
        {trend && (
          <div className="flex items-center text-emerald-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const disputeMenuRef = useRef<HTMLDivElement>(null);
  const { dashboardData, loading, error, refetch, updateUserProfile, downloadContract } = useDashboard();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (disputeMenuRef.current && !disputeMenuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // This would typically open a modal or form
      // For now, we'll just log and could integrate with a form
      console.log('Update profile clicked');
      // Example: await updateUserProfile({ name: 'New Name' });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleDownloadContract = async (contractId: number, fileName: string) => {
    try {
      await downloadContract(contractId, fileName);
    } catch (error) {
      console.error('Failed to download contract:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !dashboardData) {
    return <ErrorMessage message={error || 'Failed to load dashboard data'} onRetry={refetch} />;
  }

  const { user, projects, payments, metrics } = dashboardData;

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <FileContract className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Project Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UserProfileCard
            user={user}
            onUpdate={handleUpdateProfile}
          />
          <MetricCard
            title="Active Projects"
            value={metrics.activeProjects.toString()}
            icon={<Users className="w-6 h-6" />}
          />
          <MetricCard
            title="Completed Projects"
            value={metrics.completedProjects.toString()}
            icon={<CheckCircle className="w-6 h-6" />}
          />
                                           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <div className="text-emerald-600">
                    <FileContract className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Contract Actions</h3>
                <button
                  onClick={() => console.log('Generate contract clicked')}
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <FileContract className="w-4 h-4" />
                  <span>Generate Contract</span>
                </button>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Active Projects</h2>
                  <div className="flex space-x-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contracts</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            <div className="text-sm text-gray-500">{project.client}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={project.status} />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>${project.paid.toLocaleString()} / ${project.budget.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <ContractsList
                            contracts={project.contracts}
                            onDownload={handleDownloadContract}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(project.deadline).toLocaleDateString()}
                        </td>
                                                 <td className="px-6 py-4">
                           <div className="relative" ref={disputeMenuRef}>
                             <button
                               onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                               className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                             >
                               <MoreHorizontal className="w-4 h-4" />
                             </button>
                             {openMenuId === project.id && (
                               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                 <div className="py-1">
                                   <button
                                     onClick={() => {
                                       console.log('Report dispute clicked for project:', project.id);
                                       setOpenMenuId(null);
                                     }}
                                     className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                   >
                                     <AlertTriangle className="w-4 h-4 mr-3 text-red-500" />
                                     Report Dispute
                                   </button>
                                 </div>
                               </div>
                             )}
                           </div>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
              </div>
              <div className="p-6 space-y-4">
                {projects
                  .filter(p => p.status !== 'completed')
                  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                  .slice(0, 4)
                  .map((project) => (
                    <div key={project.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className={`p-2 rounded-lg ${
                        project.status === 'overdue' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {project.status === 'overdue' ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <Calendar className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{project.title}</p>
                        <p className="text-sm text-gray-500">{new Date(project.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Payment Status</h3>
              </div>
              <div className="p-6 space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{payment.client}</p>
                      <p className="text-sm text-gray-500">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${payment.amount.toLocaleString()}</p>
                      <StatusBadge status={payment.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;