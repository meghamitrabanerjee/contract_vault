import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Send, CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react';
import { Project, ProgressSubmission, UserProfile } from '../types';

interface ProgressUpdateProps {
  project: Project;
  currentUser: UserProfile;
  onClose: () => void;
  onSubmitProgress?: (data: ProgressFormData) => Promise<void>;
  onReviewProgress?: (submissionId: number, action: 'approve' | 'reject', feedback?: string) => Promise<void>;
}

export interface ProgressFormData {
  projectId: number;
  description: string;
  uploadedFiles: File[];
}

interface FilePreview {
  file: File;
  id: string;
  preview?: string;
}

const ProgressUpdate: React.FC<ProgressUpdateProps> = ({ 
  project, 
  currentUser, 
  onClose, 
  onSubmitProgress,
  onReviewProgress 
}) => {
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<FilePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ProgressSubmission | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if deadline has passed
  const isDeadlinePassed = new Date(project.deadline) < new Date();
  
  // Check if user is freelancer or client
  const isFreelancer = currentUser.role === 'freelancer';
  const isClient = currentUser.role === 'client';

  // Get pending submissions for client review
  const pendingSubmissions = project.progressSubmissions?.filter(sub => sub.status === 'pending') || [];
  
  // Get all submissions for freelancer to view history
  const allSubmissions = project.progressSubmissions || [];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: FilePreview[] = files.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const handleSubmitProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || uploadedFiles.length === 0) {
      alert('Please provide a description and upload at least one file.');
      return;
    }

    if (!onSubmitProgress) return;

    setIsSubmitting(true);
    
    try {
      const progressData: ProgressFormData = {
        projectId: project.id,
        description: description.trim(),
        uploadedFiles: uploadedFiles.map(f => f.file)
      };

      await onSubmitProgress(progressData);
      setIsSubmitted(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit progress', error);
      alert('Failed to submit progress. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReview = async (action: 'approve' | 'reject') => {
    if (!selectedSubmission || !onReviewProgress) return;

    if (action === 'reject' && !feedback.trim()) {
      alert('Please provide feedback when rejecting progress.');
      return;
    }

    setIsReviewing(true);
    setReviewAction(action);
    
    try {
      await onReviewProgress(selectedSubmission.id, action, feedback.trim() || undefined);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Failed to review progress:', error);
      alert('Failed to review progress. Please try again.');
    } finally {
      setIsReviewing(false);
      setReviewAction(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  // If deadline has passed, show message and close button
  if (isDeadlinePassed) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Deadline Passed</h3>
            <p className="text-gray-600 mb-4">
              The project deadline has passed. Progress updates are no longer available.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success message for freelancer submission
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Submitted Successfully</h3>
            <p className="text-gray-600 mb-4">
              Your progress has been submitted for client review.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Client view - show pending submissions
  if (isClient && pendingSubmissions.length > 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Review Progress Updates</h2>
                  <p className="text-sm text-gray-600">Project: {project.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close progress review"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {pendingSubmissions.map((submission) => (
              <div key={submission.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Progress Update from {submission.submittedBy}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Description:</h4>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{submission.description}</p>
                </div>

                {submission.files.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Submitted Files:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {submission.files.map((file) => (
                        <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <FileText className="w-8 h-8 text-gray-400" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                          <button
                            onClick={() => window.open(file.url, '_blank')}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                            aria-label={`Download ${file.name}`}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submission.status === 'pending' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                        Feedback (Optional for approval, required for rejection)
                      </label>
                      <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide feedback on the progress submission..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => handleReview('reject')}
                        disabled={isReviewing || !feedback.trim()}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isReviewing && reviewAction === 'reject' ? 'Rejecting...' : 'Reject'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReview('approve')}
                        disabled={isReviewing}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isReviewing && reviewAction === 'approve' ? 'Approving...' : 'Approve'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Freelancer view - submit progress or view history
  if (isFreelancer) {
    // If there are existing submissions, show them first
    if (allSubmissions.length > 0) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Send className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Progress Updates</h2>
                    <p className="text-sm text-gray-600">Project: {project.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      // Reset form and show submission form
                      setDescription('');
                      setUploadedFiles([]);
                      setSelectedSubmission(null);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Submit New Progress
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Close progress view"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {allSubmissions.map((submission) => (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Progress Update #{submission.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Description:</h4>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{submission.description}</p>
                  </div>

                  {submission.files.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Submitted Files:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {submission.files.map((file) => (
                          <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-8 h-8 text-gray-400" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                            <button
                              onClick={() => window.open(file.url, '_blank')}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                              aria-label={`Download ${file.name}`}
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {submission.feedback && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Client Feedback:</h4>
                      <p className="text-gray-700 bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                        {submission.feedback}
                      </p>
                    </div>
                  )}

                  {submission.reviewedBy && (
                    <div className="text-xs text-gray-500">
                      Reviewed by {submission.reviewedBy} on {new Date(submission.reviewedAt!).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Send className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Submit Progress Update</h2>
                  <p className="text-sm text-gray-600">Project: {project.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close progress form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitProgress} className="p-6 space-y-6">
            {/* Project Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Project:</span>
                  <p className="font-medium">{project.title}</p>
                </div>
                <div>
                  <span className="text-gray-600">Client:</span>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div>
                  <span className="text-gray-600">Budget:</span>
                  <p className="font-medium">${project.budget.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Paid:</span>
                  <p className="font-medium">${project.paid.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Deadline:</span>
                  <p className="font-medium">{new Date(project.deadline).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p className="font-medium capitalize">{project.status}</p>
                </div>
              </div>
            </div>

            {/* Progress Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Progress Description: *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe the progress made on this project..."
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Files *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors duration-200">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.zip"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload supporting files"
                />
                <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, XLS, Images, ZIP (max 10MB each)
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Choose Files
                </button>
              </div>
            </div>

            {/* File Previews */}
            {uploadedFiles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Files</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((filePreview) => (
                    <div
                      key={filePreview.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {filePreview.preview ? (
                          <img
                            src={filePreview.preview}
                            alt="Preview"
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <FileText className="w-10 h-10 text-gray-400" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {filePreview.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(filePreview.file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(filePreview.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label={`Remove ${filePreview.file.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !description.trim() || uploadedFiles.length === 0}
                className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Progress</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Default view for client with no pending submissions
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Eye className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Reviews</h3>
          <p className="text-gray-600 mb-4">
            There are no progress updates waiting for your review.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressUpdate;
