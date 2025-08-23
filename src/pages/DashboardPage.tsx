import React, { useState } from 'react';
import { Calendar, Contact as FileContract, Users, CheckCircle, AlertTriangle, TrendingUp, Search, Filter, Edit3 } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { ContractsList } from '../components/ContractList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import ProgressUpdate, { ProgressFormData } from '../components/ProgressUpdate';
import { Project, UserProfile } from '../types';
import { apiService } from '../services/api';

/* ---------------- Status Badge ---------------- */
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
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all duration-200 ${getStatusStyles(
        status
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

/* ---------------- User Profile Card ---------------- */
const UserProfileCard: React.FC<{ user: UserProfile; onUpdate: () => Promise<void> }> = ({ user, onUpdate }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-center space-x-4 mb-3">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-emerald-100"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">{user.name}</h3>
          <p className="text-xs text-gray-600">{user.role}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      <button
        onClick={onUpdate}
        className="w-full flex items-center justify-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-1.5 px-3 rounded-lg transition-all duration-200 hover:scale-[1.01] text-sm"
      >
        <Edit3 className="w-4 h-4" />
        <span>Update Profile</span>
      </button>
    </div>
  );
};

/* ---------------- Metric Card ---------------- */
const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend?: string }> = ({
  title,
  value,
  icon,
  trend,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-start justify-between">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">{icon}</div>
        <p className="text-xs font-medium text-gray-600">{title}</p>
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className="flex items-center text-emerald-600 text-xs font-medium mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- Dashboard ---------------- */
function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProjectForProgress, setSelectedProjectForProgress] = useState<Project | null>(null);
  const [activeView, setActiveView] = useState<'all' | 'active' | 'completed' | 'upcoming'>('all');
  const { dashboardData, loading, error, refetch, updateUserProfile, downloadContract } = useDashboard();

  const handleUpdateProfile = async () => {
    console.log('Update profile clicked');
  };

  const handleDownloadContract = async (contractId: number, fileName: string) => {
    try {
      await downloadContract(contractId, fileName);
    } catch (error) {
      console.error('Failed to download contract:', error);
    }
  };

  const handleProgressSubmit = async (progressData: ProgressFormData) => {
    try {
      await apiService.submitProgress(progressData);
      console.log('Progress submitted successfully');
    } catch (error) {
      console.error('Failed to submit progress', error);
      throw error;
    }
  };

  const handleProgressReview = async (submissionId: number, action: 'approve' | 'reject', feedback?: string) => {
    try {
      await apiService.reviewProgress(submissionId, action, feedback);
      console.log('Progress review completed successfully');
    } catch (error) {
      console.error('Failed to review progress', error);
      throw error;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error || !dashboardData) return <ErrorMessage message={error || 'Failed to load dashboard data'} onRetry={refetch} />;

  const { user, projects, metrics } = dashboardData;

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;

    let matchesView = true;
    if (activeView === 'active') {
      matchesView = project.status === 'active';
    } else if (activeView === 'completed') {
      matchesView = project.status === 'completed';
    } else if (activeView === 'upcoming') {
      const deadline = new Date(project.deadline);
      const today = new Date();
      const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      matchesView = daysUntilDeadline <= 7 && project.status !== 'completed';
    }

    return matchesSearch && matchesFilter && matchesView;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <FileContract className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">Contract Vault</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-all duration-200"
                />
              </div>
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                title="Filter projects"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <UserProfileCard user={user} onUpdate={handleUpdateProfile} />
          <button
            onClick={() => setActiveView('active')}
            className={`rounded-xl p-4 shadow-sm border transition-all duration-200 hover:scale-[1.01] w-full ${
              activeView === 'active' ? 'border-emerald-500 shadow-emerald-100 bg-white' : 'border-gray-100 bg-white hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-600">Active Projects</p>
            </div>
            <div className="flex flex-col items-center mt-5">
              <p className="text-2xl font-bold text-gray-900">{metrics.activeProjects}</p>
            </div>
          </button>
          <button
            onClick={() => setActiveView('completed')}
            className={`rounded-xl p-4 shadow-sm border transition-all duration-200 hover:scale-[1.01] w-full ${
              activeView === 'completed' ? 'border-emerald-500 shadow-emerald-100 bg-white' : 'border-gray-100 bg-white hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-600">Completed Projects</p>
            </div>
            <div className="flex flex-col items-center mt-5">
              <p className="text-2xl font-bold text-gray-900">{metrics.completedProjects}</p>
            </div>
          </button>
          <button
            onClick={() => setActiveView('upcoming')}
            className={`rounded-xl p-4 shadow-sm border transition-all duration-200 hover:scale-[1.01] w-full ${
              activeView === 'upcoming' ? 'border-emerald-500 shadow-emerald-100 bg-white' : 'border-gray-100 bg-white hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-600">Upcoming Deadlines</p>
            </div>
            <div className="flex flex-col items-center mt-5">
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter((p) => {
                  const deadline = new Date(p.deadline);
                  const today = new Date();
                  const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  return daysUntilDeadline <= 7 && p.status !== 'completed';
                }).length}
              </p>
            </div>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-900">
                {activeView === 'active' && 'Active Projects'}
                {activeView === 'completed' && 'Completed Projects'}
                {activeView === 'upcoming' && 'Upcoming Deadlines'}
                {activeView === 'all' && 'All Projects'}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveView('all')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${
                    activeView === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  title="Filter by status"
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
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Project</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Status</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Budget</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Contracts</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Deadline</th>
                  <th className="px-5 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-5 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        <div className="text-xs text-gray-500">{project.client}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-5 py-3 text-gray-900">
                      ${project.paid.toLocaleString()} / ${project.budget.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <ContractsList contracts={project.contracts} onDownload={handleDownloadContract} />
                    </td>
                    <td className="px-5 py-3 text-gray-600">{new Date(project.deadline).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => setSelectedProjectForProgress(project)}
                        className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1 px-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] text-xs"
                        title="Open progress update"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Progress Update</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Sticky Generate Contract Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => console.log('Generate contract clicked')}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-5 rounded-full shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm"
        >
          <FileContract className="w-4 h-4" />
          <span>Generate Contract</span>
        </button>
      </div>

      {/* Progress Update Modal */}
      {selectedProjectForProgress && (
        <ProgressUpdate
          project={selectedProjectForProgress}
          currentUser={user}
          onClose={() => setSelectedProjectForProgress(null)}
          onSubmitProgress={handleProgressSubmit}
          onReviewProgress={handleProgressReview}
        />
      )}
    </div>
  );
}

export default DashboardPage;
