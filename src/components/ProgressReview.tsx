import React, { useState } from 'react';
import { X, Download, CheckCircle, XCircle, Clock, File } from 'lucide-react';
import { ProgressSubmission } from '../types';

interface ProgressReviewProps {
  submission: ProgressSubmission;
  onClose: () => void;
  onApprove: (submissionId: number, feedback?: string) => Promise<void>;
  onReject: (submissionId: number, feedback: string) => Promise<void>;
}

const ProgressReview: React.FC<ProgressReviewProps> = ({ 
  submission, 
  onClose, 
  onApprove, 
  onReject 
}) => {
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = async () => {
    setIsProcessing(true);
    setAction('approve');
    try {
      await onApprove(submission.id, feedback.trim() || undefined);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error('Failed to approve progress:', error);
      alert('Failed to approve progress. Please try again.');
    } finally {
      setIsProcessing(false);
      setAction(null);
    }
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      alert('Please provide feedback when rejecting progress.');
      return;
    }
    
    setIsProcessing(true);
    setAction('reject');
    try {
      await onReject(submission.id, feedback.trim());
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error('Failed to reject progress:', error);
      alert('Failed to reject progress. Please try again.');
    } finally {
      setIsProcessing(false);
      setAction(null);
    }
  };

  const getStatusIcon = () => {
    switch (submission.status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (submission.status) {
      case 'approved':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">Review Progress Submission</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor()}`}>
              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close progress review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Submission Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Submitted by:</span>
                <p className="font-medium">{submission.submittedBy}</p>
              </div>
              <div>
                <span className="text-gray-600">Submitted on:</span>
                <p className="font-medium">{new Date(submission.submittedAt).toLocaleDateString()}</p>
              </div>
              {submission.reviewedBy && (
                <div>
                  <span className="text-gray-600">Reviewed by:</span>
                  <p className="font-medium">{submission.reviewedBy}</p>
                </div>
              )}
              {submission.reviewedAt && (
                <div>
                  <span className="text-gray-600">Reviewed on:</span>
                  <p className="font-medium">{new Date(submission.reviewedAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Description */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Progress Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{submission.description}</p>
            </div>
          </div>

          {/* Submitted Files */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Submitted Files</h3>
            <div className="space-y-2">
              {submission.files.map((file) => (
                <div key={file.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <File className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {file.size} • {file.type} • {new Date(file.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(file.url, '_blank')}
                    className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Feedback */}
          {submission.feedback && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Previous Feedback</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{submission.feedback}</p>
              </div>
            </div>
          )}

          {/* Review Actions - Only show if status is pending */}
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

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={isProcessing || !feedback.trim()}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing && action === 'reject' ? 'Rejecting...' : 'Reject'}
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing && action === 'approve' ? 'Approving...' : 'Approve'}
                </button>
              </div>
            </div>
          )}

          {/* Success Messages */}
          {isProcessing && (
            <div className="text-center py-4">
              {action === 'approve' && (
                <div className="flex items-center justify-center space-x-2 text-emerald-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Approving progress submission...</span>
                </div>
              )}
              {action === 'reject' && (
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <XCircle className="w-5 h-5" />
                  <span>Rejecting progress submission...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressReview;

