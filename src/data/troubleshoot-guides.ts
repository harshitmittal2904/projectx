export interface TroubleshootCategory {
  id: string
  title: string
  icon: string
  description: string
  issues: TroubleshootIssue[]
}

export interface TroubleshootIssue {
  title: string
  steps: string[]
  helplineNumber?: string
  portalUrl?: string
}

export const troubleshootCategories: TroubleshootCategory[] = [
  {
    id: 'epf-issues',
    title: 'EPF / EPFO Issues',
    icon: 'Building2',
    description: 'UAN activation, claim rejections, KYC mismatch, employer issues',
    issues: [
      {
        title: 'EPF claim rejected',
        steps: [
          'Check rejection reason on EPFO member portal under "Track Claim Status"',
          'Common reasons: KYC mismatch, incorrect bank details, name mismatch',
          'Fix KYC: Login to EPFO portal > Manage > KYC > Update details',
          'Ensure Aadhaar name, PAN name, and bank account name match exactly',
          'Re-submit claim after corrections (allow 3-5 days for KYC approval)',
          'If employer approval pending, contact HR to approve on employer portal',
        ],
        helplineNumber: '1800-118-005',
        portalUrl: 'https://unifiedportal-mem.epfindia.gov.in',
      },
      {
        title: 'UAN not activating',
        steps: [
          'Verify UAN is allotted: Check with your employer\'s HR department',
          'Try activating at member.epfindia.gov.in > "Activate UAN"',
          'Enter UAN, Aadhaar, Name, DOB, Mobile number, and email',
          'OTP will be sent to Aadhaar-linked mobile number',
          'If Aadhaar mobile mismatch: Update mobile in Aadhaar first',
          'If still failing: Visit nearest EPFO office with Aadhaar and UAN details',
        ],
        helplineNumber: '1800-118-005',
        portalUrl: 'https://unifiedportal-mem.epfindia.gov.in',
      },
      {
        title: 'EPF transfer when changing jobs',
        steps: [
          'Login to EPFO member portal',
          'Go to Online Services > One Member - One EPF Account (Transfer Request)',
          'Verify your current and previous employer details',
          'Select which EPF account to transfer from',
          'Submit request — both current and previous employer must approve online',
          'Track status under "Track Claim Status"',
          'Typical processing time: 10-20 working days',
        ],
        portalUrl: 'https://unifiedportal-mem.epfindia.gov.in',
      },
      {
        title: 'KYC mismatch / Name mismatch',
        steps: [
          'Login to EPFO member portal > Manage > KYC',
          'Check which KYC documents are verified (green tick)',
          'If name mismatch: Request "Joint Declaration" correction from employer',
          'Employer submits correction on employer portal with supporting documents',
          'For Aadhaar/PAN update: Upload corrected documents on member portal',
          'Wait 3-5 days for EPFO field office approval',
        ],
        helplineNumber: '1800-118-005',
      },
    ],
  },
  {
    id: 'nps-issues',
    title: 'NPS / PRAN Issues',
    icon: 'TrendingUp',
    description: 'PRAN frozen, contribution issues, fund manager changes',
    issues: [
      {
        title: 'PRAN account frozen / inactive',
        steps: [
          'Login to CRA-NSDL (cra-nsdl.com) or CRA-KFintech portal',
          'Check if minimum annual contribution of ₹1,000 was made',
          'To reactivate: Pay minimum contribution + ₹100 penalty per year of default',
          'Submit "Continuation of Subscriber Account" form (S-10) through your nodal office or POP',
          'If online: Use eNPS portal to make contribution and request reactivation',
        ],
        portalUrl: 'https://cra-nsdl.com',
      },
      {
        title: 'NPS contribution not reflecting',
        steps: [
          'Login to CRA portal and check transaction history',
          'For employer contributions: Check with HR if contribution was uploaded',
          'For self-contributions via eNPS: Check payment status on eNPS portal',
          'If payment was deducted but not credited: Raise a grievance on CRA portal',
          'Keep payment receipt / bank statement as proof',
          'Allow 3-5 working days for contribution to reflect',
        ],
        helplineNumber: '1800-222-080',
        portalUrl: 'https://enps.nsdl.com',
      },
    ],
  },
  {
    id: 'ppf-issues',
    title: 'PPF Account Issues',
    icon: 'Shield',
    description: 'Dormant account, withdrawal, transfer between banks',
    issues: [
      {
        title: 'PPF account dormant / inactive',
        steps: [
          'Account becomes dormant if minimum ₹500/year is not deposited',
          'To revive: Visit the bank/post office where account is held',
          'Pay ₹500 for each defaulted year + ₹50 penalty per year',
          'Submit written request for account revival',
          'Once revived, resume regular deposits',
          'Note: Dormant accounts still earn interest but no withdrawals/loans allowed until revived',
        ],
      },
      {
        title: 'Transfer PPF from post office to bank (or vice versa)',
        steps: [
          'Submit transfer application at current branch (Form requesting transfer)',
          'Current branch sends the PPF account file and balance to the new branch',
          'Visit the new branch with KYC documents and original passbook',
          'New branch opens the transferred account and issues new passbook',
          'Process takes 2-4 weeks typically',
          'No charges for transfer in most cases',
        ],
      },
    ],
  },
  {
    id: 'portal-issues',
    title: 'Portal / Login Issues',
    icon: 'Globe',
    description: 'Login failures, OTP issues, website errors',
    issues: [
      {
        title: 'EPFO portal login not working',
        steps: [
          'Clear browser cache and cookies, try incognito mode',
          'Use Chrome or Firefox (avoid Internet Explorer)',
          'If "Invalid Credentials": Reset password using "Forgot Password"',
          'Password requires: 8+ chars, uppercase, lowercase, number, special char',
          'If UAN locked: Wait 24 hours or contact EPFO helpline',
          'EPFO portal maintenance usually happens 11 PM - 6 AM IST',
        ],
        helplineNumber: '1800-118-005',
      },
      {
        title: 'OTP not received for eNPS/EPFO',
        steps: [
          'Ensure mobile number is linked to Aadhaar (for Aadhaar-based OTP)',
          'Check for network issues or SMS blockers',
          'Wait 2-3 minutes before requesting resend',
          'Try at different times (servers may be overloaded during peak hours)',
          'If Aadhaar mobile is different: Update mobile at Aadhaar enrollment center',
          'Alternative: Use email OTP option if available',
        ],
      },
    ],
  },
  {
    id: 'grievance-filing',
    title: 'Filing Grievances',
    icon: 'FileWarning',
    description: 'How to escalate issues with government authorities',
    issues: [
      {
        title: 'Grievance escalation process',
        steps: [
          'Step 1: Try resolving through the official portal (EPFO, CRA-NSDL, India Post)',
          'Step 2: Call the helpline — EPFO: 1800-118-005, NPS: 1800-222-080',
          'Step 3: File online grievance — EPFiGMS (epfigms.gov.in) for EPF, CPGRAMS (pgportal.gov.in) for others',
          'Step 4: Visit Regional Office with all documents and grievance receipt',
          'Step 5: If unresolved in 30 days, escalate on CPGRAMS portal',
          'Step 6: Approach Banking Ombudsman (for bank-related issues) or PFRDA (for NPS)',
          'Keep all reference numbers, screenshots, and correspondence records',
        ],
        portalUrl: 'https://pgportal.gov.in',
      },
    ],
  },
]

export const escalationSteps = [
  { step: 1, title: 'Official Portal', description: 'Try resolving through the scheme\'s official website', icon: 'Globe' },
  { step: 2, title: 'Helpline', description: 'Call the toll-free helpline number', icon: 'Phone' },
  { step: 3, title: 'Online Grievance', description: 'File on EPFiGMS or CPGRAMS portal', icon: 'FileText' },
  { step: 4, title: 'Regional Office', description: 'Visit with documents and grievance receipt', icon: 'MapPin' },
  { step: 5, title: 'CPGRAMS', description: 'Escalate if unresolved in 30 days', icon: 'AlertTriangle' },
  { step: 6, title: 'Ombudsman', description: 'Banking/PFRDA Ombudsman as final escalation', icon: 'Scale' },
]
