# Progress Update Functionality Guide

## Overview

The Progress Update feature allows both freelancers and clients to interact with project progress submissions. The interface changes based on the user's role and project deadline status.

## Features

### Role-Based Views

#### Freelancer View
- **Submit Progress**: Upload files and descriptions of work completed
- **View History**: See all previous submissions and their status (pending, approved, rejected)
- **Client Feedback**: View feedback provided by clients on submissions

#### Client View
- **Review Submissions**: View pending progress updates from freelancers
- **Approve/Reject**: Take action on submissions with optional feedback
- **Download Files**: Access submitted files for review

### Deadline Behavior
- Progress Update button disappears for both roles after the project deadline passes
- Shows a "Deadline Passed" message when attempting to access after deadline

## Testing Different Views

### To Test Freelancer View:
1. Open `src/hooks/useDashboard.tsx`
2. Ensure line 18 uses: `setDashboardData(mockDashboardData);`
3. Run the application
4. Click "Progress Update" on any project

### To Test Client View:
1. Open `src/hooks/useDashboard.tsx`
2. Change line 18 to: `setDashboardData(mockClientDashboardData);`
3. Comment out line 17: `// setDashboardData(mockDashboardData);`
4. Run the application
5. Click "Progress Update" on projects with pending submissions

### To Test Deadline Behavior:
1. Modify the deadline date in `src/mockdata.ts` or `src/mockdata-client.ts`
2. Set the deadline to a past date (e.g., "2024-01-01")
3. Run the application
4. Click "Progress Update" - you should see the deadline passed message

## Mock Data Structure

### Freelancer Projects (mockDashboardData)
- Contains projects with existing progress submissions
- Shows history of submissions with different statuses
- Allows submitting new progress updates

### Client Projects (mockClientDashboardData)
- Contains projects with pending progress submissions
- Shows submissions waiting for review
- Allows approving/rejecting submissions

## API Integration

The component is ready for backend integration with these endpoints:
- `POST /api/progress` - Submit new progress
- `PUT /api/progress/:id/review` - Review progress (approve/reject)

## File Upload

Supports multiple file types:
- Documents: PDF, DOC, DOCX, XLS, XLSX
- Images: JPG, JPEG, PNG, GIF
- Archives: ZIP

## Status Tracking

Progress submissions have three states:
- **Pending**: Awaiting client review
- **Approved**: Client approved the progress
- **Rejected**: Client rejected with feedback

## UI/UX Features

- Responsive design for mobile and desktop
- File preview and download functionality
- Real-time status updates
- Accessible design with proper ARIA labels
- Loading states and error handling
- Success/error feedback messages
