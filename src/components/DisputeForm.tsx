import React, { useState, useRef } from 'react';
import { X, Upload, FileText, AlertTriangle, Send, CheckCircle } from 'lucide-react';
import { Project, Contract } from '../types';

interface DisputeFormProps {
  project: Project;
  onClose: () => void;
  onSubmit: (disputeData: DisputeFormData) => Promise<void>;
}

export interface DisputeFormData {
  contractId: number;
  complaintText: string;
  projectLink: string;
  uploadedFiles: File[];
  contractDetails: {
    projectTitle: string;
    client: string;
    freelancer: string;
    deadline: string;
    budget: number;
    paid: number;
  };
}

interface FilePreview {
  file: File;
  id: string;
  preview?: string;
}

const DisputeForm: React.FC<DisputeFormProps> = ({ project, onClose, onSubmit }) => {
  const [complaintText, setComplaintText] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<FilePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!complaintText.trim()) {
      alert('Please provide a complaint description');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const disputeData: DisputeFormData = {
        contractId: project.contracts[0]?.id || project.id,
        complaintText: complaintText.trim(),
        projectLink: projectLink.trim(),
        uploadedFiles: uploadedFiles.map(f => f.file),
        contractDetails: {
          projectTitle: project.title,
          client: project.client,
          freelancer: 'Current User', // This would come from user context
          deadline: project.deadline,
          budget: project.budget,
          paid: project.paid,
        }
      };

      await onSubmit(disputeData);
      setIsSubmitted(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit update', error);
      alert('Failed to submit update. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dispute Submitted Successfully</h3>
            <p className="text-gray-600 mb-4">
              Your dispute has been submitted. Our support team will review and respond.
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Progress Update</h2>
                <p className="text-sm text-gray-600">Project: {project.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close dispute form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contract Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Contract Details (Auto-filled)</h3>
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

          {/* Complaint Text */}
          <div>
            <label htmlFor="complaint" className="block text-sm font-medium text-gray-700 mb-2">
              Project Update Details: *
            </label>
            <textarea
              id="complaint"
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              placeholder="Please describe your complaint or query in detail..."
              required
            />
          </div>

          {/* Project Link */}
          <div>
            <label htmlFor="projectLink" className="block text-sm font-medium text-gray-700 mb-2">
              Project Link
            </label>
            <input
              type="url"
              id="projectLink"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              placeholder="https://example.com/project"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supporting Documents
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors duration-200">
                             <input
                 ref={fileInputRef}
                 type="file"
                 multiple
                 accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                 onChange={handleFileUpload}
                 className="hidden"
                 aria-label="Upload supporting documents"
               />
              <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOC, XLS, Images (max 10MB each)
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
              disabled={isSubmitting || !complaintText.trim()}
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
                  <span>Submit Update</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisputeForm;
