export interface WithdrawalStep {
  title: string
  instruction: string
  proTip?: string
}

export interface WithdrawalGuide {
  id: string
  schemeId: string
  title: string
  subtitle: string
  beforeYouStart: string[]
  steps: WithdrawalStep[]
  commonRejections?: string[]
  keyLimits?: { label: string; value: string }[]
  videoLabel: string
  videoUrl: string
  chatQuestion: string
}

export const withdrawalGuides: WithdrawalGuide[] = [
  {
    id: 'epf-full',
    schemeId: 'epf',
    title: 'EPF Full Withdrawal',
    subtitle: 'Form 19 — Full PF Settlement',
    beforeYouStart: [
      'UAN must be activated',
      'Aadhaar linked and verified with UAN',
      'PAN linked and verified with UAN',
      'Bank account linked and digitally approved by employer',
      'Mobile number must be same as Aadhaar-linked number (for OTP)',
      'Date of Exit must be updated in service history',
      'Must be unemployed for 60+ days for full withdrawal',
    ],
    steps: [
      {
        title: 'Go to UAN Member Portal',
        instruction: 'Visit unifiedportal-mem.epfindia.gov.in and log in with your UAN number and password. Enter the captcha.',
      },
      {
        title: 'Verify KYC Status',
        instruction: 'Click "Manage" tab → "KYC". Confirm that Aadhaar, PAN, and Bank Account all show as "Verified" with green ticks.',
        proTip: 'If any KYC shows pending, update it first — this is the #1 reason claims get rejected.',
      },
      {
        title: 'Check Date of Exit',
        instruction: 'Click "View" tab → "Service History". Confirm your Date of Exit is filled for the employer you\'re claiming from.',
        proTip: 'If blank, go to "Manage" → "Mark Exit" and update it yourself. No need to contact your employer.',
      },
      {
        title: 'Start Online Claim',
        instruction: 'Go to "Online Services" tab → "Claim (Form-31, 19, 10C & 10D)".',
      },
      {
        title: 'Verify Bank Details',
        instruction: 'Enter last 4 digits of your linked bank account. Click "Verify". Your bank name and IFSC will appear.',
      },
      {
        title: 'Proceed for Online Claim',
        instruction: 'Tick the undertaking checkbox. Click "Proceed for Online Claim".',
      },
      {
        title: 'Select Claim Type',
        instruction: 'From the dropdown select "Only PF Withdrawal (Form 19)" for full settlement. For pension, also select "Only Pension Withdrawal (Form 10C)".',
      },
      {
        title: 'Fill Details',
        instruction: 'Enter the reason for withdrawal and your current address.',
      },
      {
        title: 'Submit with OTP',
        instruction: 'Click submit. An OTP will be sent to your Aadhaar-linked mobile number. Enter it to confirm.',
        proTip: 'Make sure your mobile number matches the one linked to Aadhaar. OTP issues are the #2 rejection reason.',
      },
      {
        title: 'Track Your Claim',
        instruction: 'Go to "Online Services" → "Track Claim Status". Claims up to ₹5 lakh are auto-settled within 3 days. Larger claims take 10-20 days.',
        proTip: 'Avoid filing claims in March (financial year-end backlog). If KYC shows "Digitally Approved", you qualify for auto-settlement.',
      },
    ],
    commonRejections: [
      'Aadhaar name doesn\'t match EPF records (even one letter difference)',
      'Bank account not verified/approved by employer',
      'Date of Exit not updated in service history',
      'Multiple member IDs not merged under one UAN',
      'Service history overlap between two employers',
    ],
    videoLabel: 'Watch: EPF Full Withdrawal Step-by-Step (5 min)',
    videoUrl: 'https://www.youtube.com/results?search_query=EPF+withdrawal+online+2025+step+by+step',
    chatQuestion: 'Help me withdraw my EPF — full settlement',
  },
  {
    id: 'epf-partial',
    schemeId: 'epf',
    title: 'EPF Partial Withdrawal',
    subtitle: 'Form 31 — PF Advance',
    beforeYouStart: [
      'Same KYC requirements as full withdrawal (UAN, Aadhaar, PAN, Bank verified)',
      'Must have valid reason (medical, education, marriage, home purchase, etc.)',
      'Different minimum service periods apply for different reasons',
    ],
    steps: [
      {
        title: 'Log in to UAN Portal',
        instruction: 'Visit unifiedportal-mem.epfindia.gov.in and log in with UAN and password.',
      },
      {
        title: 'Verify KYC',
        instruction: 'Manage → KYC. Ensure Aadhaar, PAN, Bank are all verified with green ticks.',
      },
      {
        title: 'Start Online Claim',
        instruction: 'Online Services → Claim (Form-31, 19, 10C & 10D).',
      },
      {
        title: 'Verify Bank & Proceed',
        instruction: 'Enter last 4 digits of linked bank account. Tick undertaking. Click "Proceed for Online Claim".',
      },
      {
        title: 'Select "PF Advance (Form 31)"',
        instruction: 'From the dropdown, select "PF Advance (Form 31)".',
      },
      {
        title: 'Choose Purpose',
        instruction: 'Select your reason: Medical / Marriage / Education / Home Purchase / Home Renovation / Unemployment (after 1 month).',
      },
      {
        title: 'Enter Amount',
        instruction: 'Enter the amount you need. Cannot exceed the maximum allowed for your purpose — the portal shows the limit.',
      },
      {
        title: 'Self-Declaration',
        instruction: 'As of October 2025, no documents needed. Just self-certify. The system auto-processes.',
        proTip: 'This is a major simplification — earlier you needed employer attestation and supporting documents.',
      },
      {
        title: 'Submit with OTP',
        instruction: 'Submit and enter the Aadhaar OTP sent to your registered mobile.',
      },
      {
        title: 'Track Claim',
        instruction: 'Online Services → Track Claim Status. Auto-settlement for claims up to ₹5 lakh.',
      },
    ],
    keyLimits: [
      { label: 'Medical emergency', value: 'No minimum service. Up to 6 months\' basic salary or employee share with interest' },
      { label: 'Marriage / Education', value: '7 years minimum service. Up to 50% of employee share' },
      { label: 'Home purchase', value: '5 years minimum service. Up to 90% of total balance' },
      { label: 'Unemployment (1 month+)', value: 'Up to 75% of total balance' },
    ],
    videoLabel: 'Watch: EPF Partial Withdrawal Process (4 min)',
    videoUrl: 'https://www.youtube.com/results?search_query=EPF+partial+withdrawal+form+31+online+2025',
    chatQuestion: 'Help me with EPF partial withdrawal',
  },
  {
    id: 'ppf-partial',
    schemeId: 'ppf',
    title: 'PPF Withdrawal',
    subtitle: 'Partial (Form C) & Full Maturity',
    beforeYouStart: [
      'PPF account must have completed 5 financial years (withdrawal from 7th FY)',
      'PPF passbook must be available',
      'Know your linked bank/post office branch',
    ],
    steps: [
      {
        title: 'Check Eligibility',
        instruction: 'Your PPF account must have completed 5 financial years. Example: opened in FY 2019-20 → first partial withdrawal in FY 2025-26.',
        proTip: 'Common confusion: You can withdraw from the 7th financial year, NOT after 5 years from the deposit date.',
      },
      {
        title: 'Calculate Maximum Amount',
        instruction: 'Lower of: 50% of balance at end of 4th year before withdrawal, OR 50% of balance at end of previous year.',
      },
      {
        title: 'Get Form C',
        instruction: 'Download from your bank\'s website or collect from the branch/post office where your PPF account is held.',
      },
      {
        title: 'Fill Form C',
        instruction: 'Enter: PPF account number, amount to withdraw, and number of years since account opening.',
      },
      {
        title: 'Submit at Branch',
        instruction: 'Submit Form C at your bank branch or post office along with your PPF passbook.',
      },
      {
        title: 'Receive Funds',
        instruction: 'Amount credited to your linked bank account within 3-7 working days. 100% tax-free — no TDS.',
        proTip: 'Only ONE partial withdrawal per financial year is allowed. Plan your withdrawal amount carefully.',
      },
    ],
    keyLimits: [
      { label: 'Partial withdrawal', value: '50% of balance from 4th preceding year. One per year.' },
      { label: 'Full maturity (15 years)', value: '100% balance. Tax-free. No formalities beyond Form C + passbook.' },
      { label: 'Premature closure (after 5 years)', value: 'Only for serious illness, higher education, NRI status change. 1% interest penalty.' },
    ],
    videoLabel: 'Watch: PPF Withdrawal Explained (4 min)',
    videoUrl: 'https://www.youtube.com/results?search_query=PPF+withdrawal+process+India+2025',
    chatQuestion: 'Help me withdraw from my PPF account',
  },
  {
    id: 'nps-partial',
    schemeId: 'nps',
    title: 'NPS Withdrawal',
    subtitle: 'Partial, Retirement & Premature Exit',
    beforeYouStart: [
      'PRAN (Permanent Retirement Account Number) must be active',
      'CRA portal login credentials ready',
      'Aadhaar, PAN, and bank account linked to NPS',
      'Know your POP (Point of Presence) or nodal office',
    ],
    steps: [
      {
        title: 'Check Eligibility',
        instruction: 'Partial withdrawal: Must have completed 3 years in NPS. Allowed for: children\'s education, marriage, medical treatment, house purchase, critical illness.',
      },
      {
        title: 'Log in to CRA Portal',
        instruction: 'Visit cra-nsdl.com or cra.nps-proteantech.in. Log in with PRAN and password.',
      },
      {
        title: 'Go to Transact Online',
        instruction: 'Navigate to "Transact Online" → Select "Withdrawal".',
      },
      {
        title: 'Select Withdrawal Type',
        instruction: 'Choose "Partial Withdrawal from Tier 1" for partial, or the appropriate option for retirement/exit.',
      },
      {
        title: 'Choose Reason & Amount',
        instruction: 'Select the applicable reason. Enter the amount (max 25% of YOUR contributions — not including employer contributions or returns).',
        proTip: 'Maximum 4 partial withdrawals in your entire NPS lifetime (updated 2025 rules).',
      },
      {
        title: 'Download & Submit Form',
        instruction: 'The system generates a form. Download it. Submit to your POP or nodal office with Aadhaar, PAN, and bank proof.',
      },
      {
        title: 'Processing',
        instruction: 'Funds typically credited within 10 working days.',
      },
    ],
    keyLimits: [
      { label: 'Partial (3+ years)', value: '25% of own contributions. Max 4 times in lifetime.' },
      { label: 'At retirement (age 60)', value: 'Non-govt: 80% lump sum (60% tax-free), 20% annuity. Govt: 60% lump sum, 40% annuity.' },
      { label: 'Corpus ≤ ₹8 lakh', value: '100% lump sum allowed. No annuity needed.' },
      { label: 'Premature exit (5+ years)', value: '20% lump sum, 80% annuity. If corpus ≤ ₹2.5L: 100% lump sum.' },
    ],
    videoLabel: 'Watch: NPS Withdrawal Process (6 min)',
    videoUrl: 'https://www.youtube.com/results?search_query=NPS+withdrawal+process+online+India+2025',
    chatQuestion: 'Help me understand NPS withdrawal options',
  },
  {
    id: 'ssy',
    schemeId: 'ssy',
    title: 'SSY Withdrawal',
    subtitle: 'Sukanya Samriddhi Yojana',
    beforeYouStart: [
      'Account passbook available',
      'Know the bank/post office branch where account is held',
      'For partial: girl child must be 18+ with education proof',
    ],
    steps: [
      {
        title: 'Determine Withdrawal Type',
        instruction: 'Partial: At age 18 for education (up to 50% of previous year\'s closing balance). Full: At maturity (21 years from opening) or after marriage if 18+.',
      },
      {
        title: 'Collect Documents',
        instruction: 'For partial: admission letter/fee receipt from educational institution + ID proof. For full maturity: passbook + withdrawal form + ID proof.',
      },
      {
        title: 'Visit Branch',
        instruction: 'Go to the bank/post office where the SSY account was opened with all documents.',
      },
      {
        title: 'Submit Withdrawal Form',
        instruction: 'Fill and submit the withdrawal/closure form along with the passbook.',
      },
      {
        title: 'Receive Funds',
        instruction: 'Amount credited to linked bank account. Entire amount is 100% tax-free (EEE status).',
        proTip: 'Account must have minimum ₹250 deposit per year to stay active. Missed years attract a ₹50 penalty.',
      },
    ],
    videoLabel: 'Watch: SSY Withdrawal Rules (3 min)',
    videoUrl: 'https://www.youtube.com/results?search_query=sukanya+samriddhi+withdrawal+rules+2025',
    chatQuestion: 'How do I withdraw from Sukanya Samriddhi Yojana?',
  },
  {
    id: 'scss',
    schemeId: 'scss',
    title: 'SCSS Withdrawal',
    subtitle: 'Senior Citizens Savings Scheme',
    beforeYouStart: [
      'SCSS passbook/certificate available',
      'Know the post office/bank branch',
      'Interest is paid quarterly — plan withdrawal timing accordingly',
    ],
    steps: [
      {
        title: 'Determine Withdrawal Timing',
        instruction: 'Premature after 1 year: 1.5% penalty. After 2 years: 1% penalty. At maturity (5 years): No penalty. Extension possible for 3 more years.',
      },
      {
        title: 'Visit Branch',
        instruction: 'Go to the post office or bank where your SCSS account is held with your passbook and ID.',
      },
      {
        title: 'Submit Closure Form',
        instruction: 'Fill the premature closure/maturity form. Provide bank details for fund transfer.',
      },
      {
        title: 'Receive Funds',
        instruction: 'Deposit amount minus any penalty credited to your bank account within 3-5 working days.',
        proTip: 'If extending for 3 years, submit extension request within 1 year of maturity. You can withdraw after 1 year of extension without penalty.',
      },
    ],
    videoLabel: 'Watch: SCSS Withdrawal & Extension Rules (3 min)',
    videoUrl: 'https://www.youtube.com/results?search_query=SCSS+withdrawal+senior+citizen+savings+2025',
    chatQuestion: 'Help me with SCSS withdrawal or extension',
  },
  {
    id: 'nsc',
    schemeId: 'nsc',
    title: 'NSC Redemption',
    subtitle: 'National Savings Certificate',
    beforeYouStart: [
      'NSC certificate (physical or e-certificate) available',
      'Know the post office where NSC was purchased',
      'NSC must have completed 5-year maturity (no partial withdrawal allowed)',
    ],
    steps: [
      {
        title: 'Wait for Maturity',
        instruction: 'NSC has a fixed 5-year maturity. No partial withdrawal is allowed. Premature encashment only in case of death of holder, court order, or forfeiture by pledgee.',
      },
      {
        title: 'Visit Post Office',
        instruction: 'Go to the post office where you purchased the NSC with the certificate and your ID proof.',
      },
      {
        title: 'Submit Encashment Form',
        instruction: 'Fill the NSC encashment/discharge form. Sign on the back of the NSC certificate.',
      },
      {
        title: 'Receive Maturity Amount',
        instruction: 'Principal + compounded interest paid out. Note: Interest is taxable in the year of maturity (but you can claim it year-by-year for tax purposes).',
        proTip: 'Interest accrued each year qualifies for 80C reinvestment deduction (except the final year). Smart taxpayers claim this annually.',
      },
    ],
    videoLabel: 'Watch: NSC Maturity & Encashment (3 min)',
    videoUrl: 'https://www.youtube.com/results?search_query=NSC+national+savings+certificate+encashment+2025',
    chatQuestion: 'How do I redeem my NSC at maturity?',
  },
]
