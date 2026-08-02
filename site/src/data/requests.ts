// PRC Records Request Center — request-letter library.
// Educational templates. Requirements, fees, and forms vary by organization — see /service-boundaries.

export interface RequestType {
  slug: string;
  label: string;
  recipientHint: string;   // placeholder for recipient line
  subject: string;         // RE: line
  relationship: string;    // clause after "records" in the opening sentence
  idLabel: string;         // label for the identifier field
  idHint: string;
  records: string[];       // checkable records list
  note?: string;           // type-specific caution shown in the form
  extraParagraph?: string; // type-specific paragraph inserted before closing
}

export const requestTypes: RequestType[] = [
  {
    slug: 'employer',
    label: 'Employer — personnel & payroll records',
    recipientHint: 'Human Resources Department',
    subject: 'Request for copies of my personnel and payroll records',
    relationship: 'relating to my employment with your organization',
    idLabel: 'Employee ID / dates of employment',
    idHint: 'e.g. Employee #4482, employed March 2021 – present',
    records: [
      'Personnel file',
      'Pay stubs / wage statements',
      'W-2 forms',
      'Time and attendance records',
      'Performance reviews',
      'Benefits enrollment documents',
      'Signed agreements and acknowledgements',
      'Employment verification letter',
    ],
    note: 'Some states give employees a legal right to inspect their personnel file; procedures vary by employer.',
  },
  {
    slug: 'school',
    label: 'School / college — education records',
    recipientHint: 'Registrar / Records Office',
    subject: 'Request for copies of my education records',
    relationship: 'relating to my enrollment at your institution',
    idLabel: 'Student ID / dates attended',
    idHint: 'e.g. Student #A102938, attended 2018–2022',
    records: [
      'Official transcript',
      'Unofficial transcript',
      'Diploma or certificate copy',
      'Enrollment verification',
      'Immunization records on file',
      'Financial aid records',
      'Disciplinary records, if any',
    ],
    note: 'Official transcripts usually require the school’s own order process and a fee — this letter works for the rest and for asking what that process is.',
  },
  {
    slug: 'medical',
    label: 'Medical provider — health records',
    recipientHint: 'Medical Records / Health Information Dept.',
    subject: 'Request for copies of my medical records',
    relationship: 'relating to my care at your practice or facility',
    idLabel: 'Date of birth / patient ID',
    idHint: 'e.g. DOB 01/15/1980 — do NOT include your SSN',
    records: [
      'Complete medical record',
      'Visit notes and summaries',
      'Test and lab results',
      'Imaging reports',
      'Immunization record',
      'Current medication list',
      'Billing records',
    ],
    note: 'Providers usually require their own signed authorization form (HIPAA). This letter starts the process and asks them to send you that form.',
    extraParagraph:
      'If your office requires a signed authorization form or identity verification before releasing records, please send me the required form at the contact information above.',
  },
  {
    slug: 'landlord',
    label: 'Landlord / property manager — tenancy records',
    recipientHint: 'Property Manager / Owner',
    subject: 'Request for copies of my tenancy records',
    relationship: 'relating to my tenancy at the address below',
    idLabel: 'Rental address / unit',
    idHint: 'e.g. 123 Main St, Unit 4B, tenancy since June 2023',
    records: [
      'Lease and all addenda',
      'Rent payment ledger',
      'Security deposit receipt and accounting',
      'Move-in / move-out inspection reports',
      'Maintenance request history',
      'Written notices sent or received',
    ],
  },
  {
    slug: 'bank',
    label: 'Bank / financial institution — account records',
    recipientHint: 'Customer Service / Records Department',
    subject: 'Request for copies of my account records',
    relationship: 'for my account(s) referenced below',
    idLabel: 'Account reference',
    idHint: 'Use only the LAST 4 digits, e.g. checking ****1234',
    records: [
      'Account statements',
      'Cleared check images',
      'Loan documents and payment history',
      'Payoff or account-closure letters',
      'Signature cards / account opening documents',
      'Dispute records',
    ],
    note: 'Never put a full account number or SSN in a letter. The institution can look you up from partial details plus ID.',
  },
  {
    slug: 'insurer',
    label: 'Insurance company — policy & claims records',
    recipientHint: 'Policy Services / Claims Department',
    subject: 'Request for copies of my policy and claims records',
    relationship: 'relating to my policy or claims referenced below',
    idLabel: 'Policy / claim number',
    idHint: 'e.g. Policy #HO-1234567, Claim #CL-2026-0456',
    records: [
      'Policy declarations pages',
      'Full policy documents',
      'Claim file and correspondence',
      'Adjuster reports and estimates',
      'Payment history',
      'Recorded statements, if any',
    ],
  },
  {
    slug: 'agency',
    label: 'Government agency — records on file',
    recipientHint: 'Records Custodian / Records Division',
    subject: 'Request for copies of records pertaining to me',
    relationship: 'that your agency maintains pertaining to me',
    idLabel: 'Case / reference number',
    idHint: 'e.g. Case #2024-00123, if you have one',
    records: [
      'Case file',
      'Applications and determinations',
      'Benefit or award letters',
      'Correspondence on file',
      'Certificates or licenses issued to me',
    ],
    note: 'Agencies have their own request procedures, forms, ID requirements, and fees — this letter asks them to identify the right procedure if a specific form is required.',
    extraParagraph:
      'If your agency requires a specific request form, identity verification, or a fee for copies, please let me know what is required so I can complete the process.',
  },
  {
    slug: 'property-transfer',
    label: 'Prior manager / seller — property transfer records (business)',
    recipientHint: 'Prior Management Company / Seller',
    subject: 'Request for transfer of property records',
    relationship: 'relating to the property referenced below, in connection with the recent change of ownership or management',
    idLabel: 'Property name / address',
    idHint: 'e.g. Oakwood Apartments, 500 Oak Ave (transferred July 2026)',
    records: [
      'All leases, renewals, and addenda',
      'Resident ledgers and deposit accounting',
      'Rent roll and fee schedules',
      'Maintenance and work-order history',
      'Vendor contracts and invoices',
      'Resident notices and proof of delivery',
      'Incident, complaint, and insurance records',
      'Exports from the property-management software',
    ],
    note: 'Written for a new owner or newly appointed manager requesting the records that should transfer with the property.',
    extraParagraph:
      'Please also identify any records that are unavailable, incomplete, or held by a third party (such as a software vendor), so open items can be tracked and resolved.',
  },
];
