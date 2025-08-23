// Email service utility for sending dispute reports
// This would typically integrate with a backend email service like SendGrid, AWS SES, or similar

export interface DisputeEmailData {
  contractId: number;
  complaintText: string;
  projectLink: string;
  contractDetails: {
    projectTitle: string;
    client: string;
    freelancer: string;
    deadline: string;
    budget: number;
    paid: number;
  };
  fileUrls?: string[];
}

export const sendDisputeEmail = async (disputeData: DisputeEmailData): Promise<void> => {
  // This is a placeholder implementation
  // In a real application, this would call your backend API
  // which would then send the email using a service like SendGrid, AWS SES, etc.
  
  const emailContent = {
    to: 'contractvault.info@gmail.com',
    subject: `Dispute Report - Contract #${disputeData.contractId}`,
    html: `
      <h2>New Dispute Report</h2>
      <p><strong>Contract ID:</strong> ${disputeData.contractId}</p>
      <p><strong>Project:</strong> ${disputeData.contractDetails.projectTitle}</p>
      <p><strong>Client:</strong> ${disputeData.contractDetails.client}</p>
      <p><strong>Freelancer:</strong> ${disputeData.contractDetails.freelancer}</p>
      <p><strong>Budget:</strong> $${disputeData.contractDetails.budget.toLocaleString()}</p>
      <p><strong>Paid:</strong> $${disputeData.contractDetails.paid.toLocaleString()}</p>
      <p><strong>Deadline:</strong> ${new Date(disputeData.contractDetails.deadline).toLocaleDateString()}</p>
      <p><strong>Project Link:</strong> <a href="${disputeData.projectLink}">${disputeData.projectLink}</a></p>
      <h3>Complaint Description:</h3>
      <p>${disputeData.complaintText}</p>
      ${disputeData.fileUrls && disputeData.fileUrls.length > 0 ? `
        <h3>Supporting Documents:</h3>
        <ul>
          ${disputeData.fileUrls.map(url => `<li><a href="${url}">${url.split('/').pop()}</a></li>`).join('')}
        </ul>
      ` : ''}
    `
  };

  // Simulate API call
  console.log('Sending dispute email:', emailContent);
  
  // In a real implementation, you would make an API call here:
  // const response = await fetch('/api/send-dispute-email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(emailContent)
  // });
  
  // if (!response.ok) {
  //   throw new Error('Failed to send dispute email');
  // }
  
  // For now, we'll simulate a successful email send
  await new Promise(resolve => setTimeout(resolve, 1000));
};

