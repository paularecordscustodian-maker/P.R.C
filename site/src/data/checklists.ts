// PRC Records Readiness Checklists — the 7 universal categories.
// Educational starting points, not requirements — see /service-boundaries.

export interface Checklist {
  slug: string;
  n: number;
  title: string;
  intro: string;
  sections: { heading: string; items: string[] }[];
}

export const checklists: Checklist[] = [
  {
    slug: 'identity',
    n: 1,
    title: 'Identity Records',
    intro: 'The documents that prove who you are. Almost every other record depends on these — and they are the hardest to replace in a hurry.',
    sections: [
      { heading: 'Core identity', items: [
        'Birth certificate (certified copy, not a photocopy)',
        'Social Security card',
        'Driver’s license or state ID (plus a photo/scan of it)',
        'Passport and any visas',
        'Citizenship or immigration documents',
        'Tribal enrollment documents, if applicable',
      ]},
      { heading: 'Name & family status', items: [
        'Marriage certificate(s)',
        'Divorce decree(s)',
        'Name-change orders',
        'Adoption records',
        'Custody or guardianship orders',
      ]},
      { heading: 'Keep ready', items: [
        'A list of where each original is stored',
        'Certified copies of the two or three you’re asked for most',
        'Expiration dates for license, passport, and permits — with renewal reminders',
      ]},
    ],
  },
  {
    slug: 'health',
    n: 2,
    title: 'Health & Care Records',
    intro: 'The records that let you or a caregiver make informed decisions quickly — and prove what happened, when, and who authorized it.',
    sections: [
      { heading: 'Medical', items: [
        'Immunization records for each family member',
        'Current medication list with dosages',
        'Allergy list',
        'Major diagnoses, surgeries, and hospitalizations (dates + providers)',
        'Names and contact info for every current provider',
      ]},
      { heading: 'Coverage & authority', items: [
        'Health insurance cards and policy documents',
        'Medicare / Medicaid documents, if applicable',
        'Medical power of attorney',
        'Advance directive / living will',
        'HIPAA release forms naming who may receive information',
      ]},
      { heading: 'Care situations', items: [
        'Care plans for dependents (children, elders, disabled family members)',
        'School or facility medical authorization forms',
        'Explanation-of-benefits statements for major treatments',
        'Receipts for out-of-pocket medical costs (tax and reimbursement)',
      ]},
    ],
  },
  {
    slug: 'financial',
    n: 3,
    title: 'Financial Records',
    intro: 'The proof behind every dollar in, dollar out, and dollar owed. When money is questioned, the record answers.',
    sections: [
      { heading: 'Accounts', items: [
        'List of every bank, credit union, and investment account (institution + last 4 digits)',
        'Recent statements for each account',
        'Credit card list with issuer contact numbers',
        'Loan documents: mortgage, auto, student, personal',
        'Retirement accounts (401k, IRA, pension) and beneficiary designations',
      ]},
      { heading: 'Income & taxes', items: [
        'Tax returns — keep at least seven years',
        'W-2s, 1099s, and other income statements',
        'Pay stubs (most recent several)',
        'Benefit award letters (Social Security, VA, disability, assistance)',
      ]},
      { heading: 'Proof & protection', items: [
        'Receipts for major purchases (warranty + insurance claims)',
        'Records of debts paid off — keep the payoff letter forever',
        'Credit reports (pull free ones annually and keep them)',
        'A list of automatic payments and subscriptions',
      ]},
    ],
  },
  {
    slug: 'housing',
    n: 4,
    title: 'Housing & Property Records',
    intro: 'Where you live and what you own. These records decide disputes about deposits, damage, ownership, and repairs.',
    sections: [
      { heading: 'Renting', items: [
        'Lease and every renewal or addendum',
        'Move-in / move-out condition photos with dates',
        'Security deposit receipt',
        'Rent payment receipts or ledger',
        'Every written notice to or from the landlord (keep proof of delivery)',
        'Renter’s insurance policy',
      ]},
      { heading: 'Owning', items: [
        'Deed and title insurance',
        'Mortgage documents and payoff statements',
        'Property tax records',
        'Homeowner’s insurance policy and claims history',
        'Survey, plat, or boundary documents',
        'HOA documents, if applicable',
      ]},
      { heading: 'Maintenance & improvements', items: [
        'Receipts and contracts for repairs and improvements (affects taxes at sale)',
        'Warranties for systems and appliances',
        'Photos of property condition, updated yearly',
        'Utility account numbers and provider contacts',
      ]},
    ],
  },
  {
    slug: 'employment',
    n: 5,
    title: 'Employment & Education Records',
    intro: 'Your work and learning history — the proof behind every job application, license renewal, and benefit claim.',
    sections: [
      { heading: 'Employment', items: [
        'Offer letters and employment contracts',
        'Job descriptions for each role held',
        'Performance reviews',
        'Pay stubs and W-2s',
        'Benefits enrollment documents',
        'Separation or severance agreements',
        'Employment verification letters',
      ]},
      { heading: 'Education & credentials', items: [
        'Diplomas and degrees',
        'Official transcripts (order two sealed copies)',
        'Professional licenses and certifications with renewal dates',
        'Training certificates and continuing-education records',
        'Student loan documents and payment history',
      ]},
      { heading: 'For job seekers', items: [
        'Current resume, kept updated even while employed',
        'Reference list with current contact info',
        'Portfolio or work samples where applicable',
        'Records of military service (DD-214) if applicable',
      ]},
    ],
  },
  {
    slug: 'legal',
    n: 6,
    title: 'Legal & Important Documents',
    intro: 'The documents that speak for you when you cannot — and the proof that stands up when a dispute arrives.',
    sections: [
      { heading: 'Planning documents', items: [
        'Will and any codicils',
        'Trust documents',
        'Durable power of attorney (financial)',
        'Medical power of attorney',
        'Beneficiary designations — reviewed after every major life event',
        'Guardianship nominations for minor children',
      ]},
      { heading: 'Legal history', items: [
        'Court orders and judgments involving you',
        'Settlement agreements',
        'Contracts you have signed (keep every version)',
        'Insurance policies of every kind, with declarations pages',
        'Vehicle titles and registrations',
      ]},
      { heading: 'If it applies to you', items: [
        'Immigration and naturalization documents',
        'Criminal record documents, expungement orders, or pardons',
        'Probation / supervision completion certificates',
        'Bankruptcy discharge papers — keep forever',
      ]},
    ],
  },
  {
    slug: 'family',
    n: 7,
    title: 'Personal & Family Records',
    intro: 'The records that carry your family’s story — and the practical ones a family needs on its hardest days.',
    sections: [
      { heading: 'Family essentials', items: [
        'Emergency contact list (paper copy, not just phones)',
        'List of every important account, policy, and where its records live',
        'Instructions a trusted person would need if you were unavailable',
        'Funeral or final wishes documents',
        'Death certificates for deceased family members (order extra certified copies)',
      ]},
      { heading: 'History & keepsakes', items: [
        'Family photos — organized, labeled, and backed up',
        'Family tree or genealogy records',
        'Military service records of family members',
        'Letters, journals, and documents worth preserving',
        'An inventory of heirlooms and who should receive them',
      ]},
      { heading: 'Digital life', items: [
        'List of online accounts that matter (email, photos, banking)',
        'Password manager or a sealed record a trusted person can access',
        'Backup of irreplaceable digital files in a second location',
      ]},
    ],
  },
];
