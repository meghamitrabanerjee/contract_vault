# Dispute Reporting Functionality

## Overview
This document describes the implementation of the dispute reporting functionality for the Contract Vault application.

## Features Implemented

### 1. Dispute Form Component (`src/components/DisputeForm.tsx`)
- **Auto-filled contract details**: Project title, client, budget, paid amount, deadline, status
- **User input fields**: 
  - Complaint/Query description (required)
  - Project link (optional)
  - File upload support (multiple files, various formats)
- **File upload features**:
  - Drag and drop support
  - File preview for images
  - File size display
  - Remove individual files
  - Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG, GIF

### 2. Integration with Dashboard (`src/pages/DashboardPage.tsx`)
- **Trigger**: "Report Dispute" button in project actions menu
- **Modal display**: Form opens as a modal overlay
- **State management**: Tracks selected project for dispute

### 3. API Service (`src/services/api.ts`)
- **Dispute submission**: Handles form data and file uploads
- **Email integration**: Sends dispute details to contractvault.info@gmail.com
- **Database storage**: Prepares dispute record for database storage

### 4. Email Service (`src/lib/emailService.ts`)
- **Email template**: Structured HTML email with all dispute details
- **File attachments**: Links to uploaded supporting documents
- **Recipient**: contractvault.info@gmail.com

## Data Flow

1. **User clicks "Report Dispute"** → Opens dispute form modal
2. **User fills form** → Validates required fields
3. **User uploads files** → Generates previews and stores files
4. **User submits form** → 
   - Uploads files to storage (simulated)
   - Sends email to support team
   - Stores dispute record in database
   - Shows success confirmation
   - Auto-closes modal after 3 seconds

## Database Schema

```typescript
interface Dispute {
  id: number;
  contractId: number;
  disputeRaisedBy: string;
  disputeStatus: 'pending' | 'reviewing' | 'resolved' | 'rejected';
  disputeProofUrl: string[];
  projectLink: string;
  complaintText: string;
  createdAt: string;
  updatedAt: string;
}
```

## Email Template

The email sent to contractvault.info@gmail.com includes:
- Contract ID and project details
- Client and freelancer information
- Budget and payment information
- Deadline information
- Project link (if provided)
- Detailed complaint description
- Links to supporting documents

## File Upload Implementation

### Current Implementation (Frontend Only)
- Files are stored in browser memory during form session
- File URLs are simulated for email attachments
- File previews are generated for images

### Production Implementation Required
- **Backend file upload endpoint**: Handle multipart form data
- **Cloud storage integration**: Upload to S3, Cloudinary, or similar
- **File validation**: Size limits, type restrictions
- **Security**: Virus scanning, file type verification

## Backend Requirements

To complete the implementation, you'll need:

1. **File Upload API**:
   ```typescript
   POST /api/disputes/upload-files
   Content-Type: multipart/form-data
   ```

2. **Dispute Storage API**:
   ```typescript
   POST /api/disputes
   Content-Type: application/json
   ```

3. **Email Service Integration**:
   - SendGrid, AWS SES, or similar email service
   - Email templates for dispute notifications
   - File attachment handling

4. **Database Table**:
   ```sql
   CREATE TABLE disputes (
     id SERIAL PRIMARY KEY,
     contract_id INTEGER NOT NULL,
     dispute_raised_by VARCHAR(255) NOT NULL,
     dispute_status VARCHAR(50) DEFAULT 'pending',
     dispute_proof_url TEXT[],
     project_link TEXT,
     complaint_text TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Security Considerations

1. **File Upload Security**:
   - Validate file types and sizes
   - Scan for viruses/malware
   - Store files in secure cloud storage
   - Generate secure, time-limited URLs

2. **Email Security**:
   - Use secure email service
   - Validate email content
   - Implement rate limiting

3. **Data Protection**:
   - Encrypt sensitive data
   - Implement proper access controls
   - Log all dispute activities

## Testing

### Manual Testing Checklist
- [ ] Form opens when "Report Dispute" is clicked
- [ ] Contract details are auto-filled correctly
- [ ] File upload works with various file types
- [ ] File previews display correctly
- [ ] Form validation works (required fields)
- [ ] Success message displays after submission
- [ ] Modal closes automatically after success
- [ ] Email is sent with correct content

### Unit Tests Needed
- DisputeForm component rendering
- File upload functionality
- Form validation
- Email service integration
- API service error handling

## Future Enhancements

1. **Dispute Tracking**: Allow users to view dispute status
2. **File Management**: Better file organization and preview
3. **Notifications**: Real-time updates on dispute status
4. **Dispute History**: View all past disputes
5. **Admin Panel**: Support team interface for managing disputes
6. **Automated Responses**: Initial acknowledgment emails
7. **Dispute Categories**: Predefined dispute types for better organization

