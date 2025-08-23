import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Shield, Users, Clock, CheckCircle, AlertTriangle, TrendingUp, Search, Filter, MoreHorizontal, Edit3, FileText, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutUser } from '../store/slices/userSlice';
import { useDashboard } from '../hooks/useDashboard';
import { ContractsList } from '../components/ContractList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import ProgressUpdate from '../components/ProgressUpdate';
import DisputeForm from '../components/DisputeForm';
import { Project, UserProfile } from '../types';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'funded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'work-submitted':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'released':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'disputed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'sent':
        return 'Sent';
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
      case 'funded':
        return 'Funded';
      case 'work-submitted':
        return 'Work Submitted';
      case 'approved':
        return 'Approved';
      case 'released':
        return 'Released';
      case 'disputed':
        return 'Disputed';
      case 'refunded':
        return 'Refunded';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${getStatusStyles(status)}`}>
      {getStatusDisplayName(status)}
    </span>
  );
};

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
        onClick={handleLogout}
        className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Log Out</span>
      </button>
    </div>
  );
};

const MetricCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend?: string;
  onClick?: () => void;
  isActive?: boolean;
}> = ({ 
  title, 
  value, 
  icon, 
  trend,
  onClick,
  isActive = false
}) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:scale-[1.02] ${onClick ? 'cursor-pointer' : ''} ${
        isActive 
          ? 'border-emerald-500 shadow-md bg-emerald-50' 
          : 'border-gray-100 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${isActive ? 'bg-emerald-100' : 'bg-emerald-50'}`}>
          <div className={`${isActive ? 'text-emerald-700' : 'text-emerald-600'}`}>{icon}</div>
        </div>
        {trend && (
          <div className="flex items-center text-emerald-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className={`text-2xl font-bold ${isActive ? 'text-emerald-700' : 'text-gray-900'}`}>{value}</p>
        <p className={`text-sm ${isActive ? 'text-emerald-600' : 'text-gray-600'}`}>{title}</p>
      </div>
    </div>
  );
};

function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProgressUpdate, setShowProgressUpdate] = useState(false);
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'deadlines'>('active');
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
      console.log('Update profile clicked');
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

  const handleMetricCardClick = (type: 'active' | 'completed' | 'deadlines') => {
    console.log('Metric card clicked:', type);
    setActiveTab(type);
    console.log('Active tab set to:', type);
  };

  const handleProgressUpdate = async (data: any) => {
    try {
      console.log('Progress update submitted:', data);
      // Here you would typically call an API to submit the progress update
    } catch (error) {
      console.error('Failed to submit progress update:', error);
    }
  };

  const handleReviewProgress = async (submissionId: number, action: 'approve' | 'reject', feedback?: string) => {
    try {
      console.log('Progress review:', { submissionId, action, feedback });
      // Here you would typically call an API to review the progress
    } catch (error) {
      console.error('Failed to review progress:', error);
    }
  };

  const handleDisputeSubmit = async (data: any) => {
    try {
      console.log('Dispute submitted:', data);
      // Here you would typically call an API to submit the dispute
    } catch (error) {
      console.error('Failed to submit dispute:', error);
    }
  };

  const getFilteredProjects = () => {
    let filtered = dashboardData?.projects || [];
    
    // Filter by active tab
    switch (activeTab) {
      case 'active':
        // Show projects that are in active workflow (accepted, funded, work-submitted)
        filtered = filtered.filter(p => ['accepted', 'funded', 'work-submitted'].includes(p.status));
        break;
      case 'completed':
        // Show projects that are completed (approved, released)
        filtered = filtered.filter(p => ['approved', 'released'].includes(p.status));
        break;
      case 'deadlines':
        // Show all projects that are not in final states (not approved, released, declined, refunded)
        filtered = filtered.filter(p => !['approved', 'released', 'declined', 'refunded'].includes(p.status));
        filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    return filtered;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !dashboardData) {
    return <ErrorMessage message={error || 'Failed to load dashboard data'} onRetry={refetch} />;
  }

  const { projects, payments, metrics } = dashboardData;
  const user = currentUser || dashboardData.user; // Use Redux user or fallback to dashboard data
  
  // Debug logging
  console.log('Dashboard Data:', dashboardData);
  console.log('All Projects:', projects);
  console.log('Active Tab:', activeTab);
  console.log('Filter Status:', filterStatus);
  
  const filteredProjects = getFilteredProjects();
  console.log('Filtered Projects:', filteredProjects);

  // Calculate upcoming deadlines count - show projects that are not in final states
  const upcomingDeadlinesCount = projects.filter(p => 
    !['approved', 'released', 'declined', 'refunded'].includes(p.status)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-emerald-700">Contract Vault</h1>
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
          />
          <MetricCard
            title="Active Projects"
            value={metrics.activeProjects.toString()}
            icon={<Users className="w-6 h-6" />}
            onClick={() => handleMetricCardClick('active')}
            isActive={activeTab === 'active'}
          />
          <MetricCard
            title="Completed Projects"
            value={metrics.completedProjects.toString()}
            icon={<CheckCircle className="w-6 h-6" />}
            onClick={() => handleMetricCardClick('completed')}
            isActive={activeTab === 'completed'}
          />
          <MetricCard
            title="Upcoming Deadlines"
            value={upcomingDeadlinesCount.toString()}
            icon={<Clock className="w-6 h-6" />}
            onClick={() => handleMetricCardClick('deadlines')}
            isActive={activeTab === 'deadlines'}
          />
        </div>

        {/* Sticky Generate Contract Button - Only show for freelancers */}
        {user.role === 'freelancer' && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => navigate('/contracts/create')}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              <span>Generate Contract</span>
            </button>
          </div>
        )}

                 {/* Projects Table - Full Width */}
         <div className="w-full">
           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
             <div className="p-6 border-b border-gray-200">
               <div className="flex justify-between items-center">
                 <h2 className="text-lg font-semibold text-gray-900">
                   {activeTab === 'active' && 'Active Projects'}
                   {activeTab === 'completed' && 'Completed Projects'}
                   {activeTab === 'deadlines' && 'Upcoming Deadlines'}
                 </h2>
                 <div className="flex space-x-2">
                   <select
                     value={filterStatus}
                     onChange={(e) => setFilterStatus(e.target.value)}
                     className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                     aria-label="Filter projects by status"
                   >
                     <option value="all">All Status</option>
                     <option value="draft">Draft</option>
                     <option value="sent">Sent</option>
                     <option value="accepted">Accepted</option>
                     <option value="declined">Declined</option>
                     <option value="funded">Funded</option>
                     <option value="work-submitted">Work Submitted</option>
                     <option value="approved">Approved</option>
                     <option value="released">Released</option>
                     <option value="disputed">Disputed</option>
                     <option value="refunded">Refunded</option>
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
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                         <div className="flex space-x-2">
                           {/* Progress Update Button - Only show if deadline hasn't passed */}
                           {new Date(project.deadline) > new Date() && (
                             <button
                               onClick={() => {
                                 setSelectedProject(project);
                                 setShowProgressUpdate(true);
                               }}
                               className="flex items-center space-x-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors duration-200"
                             >
                               <Send className="w-3 h-3" />
                               <span>Progress Update</span>
                             </button>
                           )}
                           
                           {/* Report Dispute Button - Conditional logic based on user role and project status */}
                           {(() => {
                             const isDeadlinePassed = new Date(project.deadline) < new Date();
                             const hasProgressSubmissions = project.progressSubmissions && project.progressSubmissions.length > 0;
                             
                             // For freelancer: show if deadline passed AND progress was submitted
                             if (user.role === 'freelancer' && isDeadlinePassed && hasProgressSubmissions) {
                               return (
                                 <button
                                   onClick={() => {
                                     setSelectedProject(project);
                                     setShowDisputeForm(true);
                                   }}
                                   className="flex items-center space-x-1 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors duration-200"
                                 >
                                   <AlertTriangle className="w-3 h-3" />
                                   <span>Report Dispute</span>
                                 </button>
                               );
                             }
                             
                             // For client: show if deadline passed AND NO progress was submitted
                             if (user.role === 'client' && isDeadlinePassed && !hasProgressSubmissions) {
                               return (
                                 <button
                                   onClick={() => {
                                     setSelectedProject(project);
                                     setShowDisputeForm(true);
                                   }}
                                   className="flex items-center space-x-1 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors duration-200"
                                 >
                                   <AlertTriangle className="w-3 h-3" />
                                   <span>Report Dispute</span>
                                 </button>
                               );
                             }
                             
                             return null;
                           })()}
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         </div>
      </main>

      {/* Progress Update Modal */}
      {showProgressUpdate && selectedProject && (
        <ProgressUpdate
          project={selectedProject}
          currentUser={user}
          onClose={() => {
            setShowProgressUpdate(false);
            setSelectedProject(null);
          }}
          onSubmitProgress={handleProgressUpdate}
          onReviewProgress={handleReviewProgress}
        />
      )}

      {/* Dispute Form Modal */}
      {showDisputeForm && selectedProject && (
        <DisputeForm
          project={selectedProject}
          onClose={() => {
            setShowDisputeForm(false);
            setSelectedProject(null);
          }}
          onSubmit={handleDisputeSubmit}
        />
      )}
    </div>
  );
}

export default DashboardPage;