// Records Readiness Library — member guides.
// Educational content; not legal, tax, or medical advice — see /service-boundaries.

export interface Guide {
  slug: string;
  title: string;
  audience: string;
  minutes: number;
  intro: string;
  sections: { heading: string; body?: string; items?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: 'first-apartment',
    title: 'The First Apartment Records Guide',
    audience: 'Renters & young adults',
    minutes: 12,
    intro: 'Most deposit disputes are lost before move-in day — by the records nobody made. This guide walks the full tenancy arc: what to capture before you apply, at signing, on move-in day, during the tenancy, and on the way out.',
    sections: [
      { heading: 'Before you apply', items: [
        'Save every listing screenshot for the unit you apply to — price, promises, included amenities.',
        'Keep copies of what you submit: application, pay stubs, references, application-fee receipt.',
        'If a leasing agent promises anything verbally ("we\'ll replace the carpet"), follow up by email so the promise has a record.',
      ]},
      { heading: 'At signing', items: [
        'Get the complete lease — every page, every addendum, every rule attachment — before you sign, and keep the signed copy forever.',
        'Get the security deposit receipt in writing, with the amount and where it\'s held if your state requires that disclosure.',
        'Record who your landlord actually is: legal entity name, mailing address, emergency contact. This is on the lease — photograph it separately.',
      ]},
      { heading: 'Move-in day (the hour that decides your deposit)', body: 'Before a single box crosses the threshold, walk every room with your phone.', items: [
        'Photograph every wall, floor, ceiling, appliance, and fixture — wide shots plus close-ups of any existing damage.',
        'Video a single continuous walkthrough narrating the date and address.',
        'Complete the move-in condition report if one is offered; if not, write your own list, date it, and email it to the landlord so a timestamp exists.',
        'Photograph serial numbers on appliances and meters (and the meter readings).',
      ]},
      { heading: 'During the tenancy', items: [
        'Pay rent in a way that leaves a record — never untraceable cash without a signed receipt.',
        'Report every maintenance issue in writing, even if you also call. Keep the request and the response.',
        'Photograph any new damage or repair immediately, before and after.',
        'Keep every notice you send or receive, with proof of delivery when it matters.',
        'Renew renter\'s insurance and keep the declarations page with your lease.',
      ]},
      { heading: 'Moving out', items: [
        'Give notice in writing per the lease terms; keep proof you sent it and when.',
        'Repeat the move-in ritual in reverse: full photo and video sweep of the cleaned, empty unit.',
        'Request a walkthrough inspection and get its results in writing.',
        'Provide a forwarding address in writing — deposit-return clocks often start there.',
        'If deductions come back, compare them against your move-in and move-out evidence before deciding anything.',
      ]},
    ],
  },
  {
    slug: 'first-job',
    title: 'The First Job Records Guide',
    audience: 'New workers & career changers',
    minutes: 10,
    intro: 'Working life generates records from the first interview to the last paycheck. The people who keep them negotiate better, claim every benefit, and never scramble when a background check, loan application, or dispute asks for proof.',
    sections: [
      { heading: 'The offer stage', items: [
        'Keep the job posting you applied to — it documents the promised role and pay range.',
        'Save the offer letter and any negotiation emails. If a recruiter promises something by phone, confirm it by email.',
        'Keep the final signed offer/contract, including bonus, equity, or relocation terms.',
      ]},
      { heading: 'First-week paperwork', items: [
        'Copies of everything you sign: handbook acknowledgement, NDA, non-compete, arbitration agreement, IP assignment.',
        'Benefits elections and beneficiary designations — and confirmations.',
        'Your W-4 as filed, and your employee ID / start date in writing.',
      ]},
      { heading: 'Ongoing, every year', items: [
        'Every pay stub until the W-2 confirms the year, then at least the final stub of the year.',
        'Every W-2 — permanently. Social Security corrections decades later depend on them.',
        'Performance reviews, awards, and significant praise emails — your case file for raises and your defense file if things sour.',
        'Records of hours if you\'re hourly — your own log beats no log in a wage dispute.',
        'Certificates from any training the employer provides.',
      ]},
      { heading: 'If problems develop', items: [
        'Move to contemporaneous notes: date, time, who, what was said, who witnessed.',
        'Keep copies of relevant policies as they existed at the time (handbooks change).',
        'Send factual summary emails after important verbal conversations ("Confirming what we discussed today…").',
        'Forward nothing confidential to personal accounts — keep personal notes personal, and know the difference.',
      ]},
      { heading: 'Leaving a job', items: [
        'Resignation letter (keep a copy) or termination paperwork — every page.',
        'Final pay stub, payout of unused leave, and severance agreement if any.',
        'COBRA and benefits-continuation notices.',
        'Contact info for HR and a verification-of-employment letter while it\'s easy to get.',
        'Retirement account statements and rollover paperwork — orphaned 401(k)s are a records failure.',
      ]},
    ],
  },
  {
    slug: 'caregiver',
    title: 'The Caregiver Records Guide',
    audience: 'Family caregivers',
    minutes: 14,
    intro: 'When you care for another person, you become their records custodian — often overnight, often mid-crisis. This guide sequences the work so authority, medical, financial, and daily-care records come under control in the right order.',
    sections: [
      { heading: 'First: the authority to act', body: 'Without the right documents, providers and banks legally cannot work with you. Establish authority first — everything else depends on it.', items: [
        'Medical power of attorney or healthcare proxy naming you (or know who it names).',
        'Durable financial power of attorney.',
        'HIPAA authorizations at every provider, naming you.',
        'Advance directive / living will — know where the original is.',
        'If no documents exist and capacity allows, this is the most urgent conversation to have — with a qualified professional\'s help.',
      ]},
      { heading: 'The medical file', items: [
        'One current medication list — name, dose, prescriber, pharmacy — updated at every change and carried to every appointment.',
        'Diagnosis list with dates, and the story of each major event.',
        'Every provider: name, specialty, phone, portal login existence (not the passwords in the open).',
        'Insurance cards, plan documents, and every explanation of benefits for major care.',
        'Appointment log: date, provider, what was said, what changes.',
      ]},
      { heading: 'The financial picture', items: [
        'Inventory of accounts, income sources (Social Security, pension, annuities), and recurring bills.',
        'Benefit award letters — Social Security, VA, Medicaid, long-term-care insurance.',
        'Caregiving expense receipts, mileage, and time — some become tax-relevant or reimbursable.',
        'Property documents: deed, insurance, tax bills.',
      ]},
      { heading: 'Daily operations', items: [
        'A care binder anyone could pick up: routines, medications, allergies, providers, emergency contacts.',
        'Communication log between family members who share care.',
        'Records from paid caregivers or facilities: contracts, invoices, incident reports.',
      ]},
      { heading: 'If care ends', body: 'Whether through recovery, transition to a facility, or loss — the records you kept become the record of what was done, and the foundation for whatever comes next (see the Estate & Loss guide).' },
    ],
  },
  {
    slug: 'estate-loss',
    title: 'The Estate & Loss Records Guide',
    audience: 'Families after a death',
    minutes: 15,
    intro: 'Grief comes with paperwork — dozens of institutions, each asking for proof. This guide orders the records work of loss: what to get immediately, what the first month asks of you, and what to preserve forever.',
    sections: [
      { heading: 'Immediately', items: [
        'Order more certified death certificates than you think you need — ten is common; banks, insurers, agencies, and utilities each may demand an original.',
        'Locate the will or trust and note who is named to act.',
        'Secure the home, mail, vehicles, and anything of value — and start a simple log of actions taken.',
        'Do not rush to close accounts or distribute anything; the sequence matters and a qualified professional can order it.',
      ]},
      { heading: 'The first month\'s gathering', items: [
        'Identity documents of the deceased: birth certificate, Social Security card, marriage/divorce records, military discharge (DD-214).',
        'Financial map: statements, deeds, titles, insurance policies, retirement accounts, debts.',
        'Life insurance policies — and any employer, union, or association benefits nobody remembers.',
        'Recent tax returns.',
        'Bills that must keep being paid (insurance, mortgage, utilities) versus subscriptions to cancel.',
      ]},
      { heading: 'Working with institutions', items: [
        'Keep a contact log: institution, person, date, what they require, what you sent, confirmation numbers.',
        'Send copies, never originals, unless a certified original is explicitly required.',
        'Get every "the account is closed / transferred / paid" in writing, and keep those letters permanently.',
      ]},
      { heading: 'Preserve forever', items: [
        'The final estate accounting and distribution records.',
        'Death certificate copies (keep at least two).',
        'The family-history record: photos, letters, service records, the stories attached to heirlooms.',
        'Beneficiary paperwork you signed as an heir — it affects your own taxes later.',
      ]},
      { heading: 'For your own family', body: 'The hardest lesson of estate paperwork is how much easier it could have been. When the immediate work settles, use the Family Records checklist to build the file your own family will one day need — the emergency sheet, the account map, the wishes in writing.' },
    ],
  },
  {
    slug: 'reentry',
    title: 'The Fresh Start / Reentry Records Guide',
    audience: 'Returning citizens & supporting families',
    minutes: 12,
    intro: 'Reentry runs on documents: identification to work, records to rent, proof to stay in compliance. This guide sequences the rebuild so each document unlocks the next.',
    sections: [
      { heading: 'The identity chain', body: 'Documents unlock each other in order. Work the chain:', items: [
        'Birth certificate first — it unlocks nearly everything else (order from the vital records office of the birth state).',
        'Social Security card replacement (free; beware paid "services").',
        'State ID or driver\'s license — bring the birth certificate, Social Security card, and proof of address.',
        'Keep certified copies safe and carry photocopies where possible.',
      ]},
      { heading: 'Release paperwork — keep all of it', items: [
        'Release/discharge documents and certificate of completion for any program finished inside.',
        'Education and vocational certificates earned — they count, keep them visible.',
        'Medical records and prescriptions from the facility, so care continues without a gap.',
        'Any money or property receipts from processing out.',
      ]},
      { heading: 'Supervision compliance file', body: 'If under supervision, build the file that proves compliance before anyone questions it:', items: [
        'The supervision conditions themselves, in writing.',
        'Every check-in: date, officer, outcome — your own log.',
        'Payment receipts for fees, fines, and restitution — every single one, forever.',
        'Program attendance records and completion certificates.',
        'Travel or residence permissions in writing.',
      ]},
      { heading: 'Work and housing', items: [
        'Resume built from real history including inside work and certifications.',
        'Reference letters — collect them as you earn them.',
        'Keep every job application receipt or confirmation if supervision requires job-search proof.',
        'Rental applications and receipts; a record of on-time payments builds the next application.',
        'Benefit applications and award letters (SNAP, Medicaid, veterans benefits).',
      ]},
      { heading: 'Clearing the record, where possible', body: 'Expungement, sealing, and pardons are legal processes with strict document requirements — court records, disposition records, completion proof. The file you have been building is exactly what a legal-aid organization or attorney will ask for. PRC organizes records; qualified professionals advise on the law.' },
    ],
  },
  {
    slug: 'property-dataroom',
    title: 'The Property Transfer Data Room Guide',
    audience: 'Buyers of rental property & new managers',
    minutes: 18,
    intro: 'When a property changes hands, the records are half the asset — and the half most often delivered broken. This guide is the acquisition-side companion to PRC\'s New Ownership Records Transition Review: what to demand, when, and how to track what never arrives.',
    sections: [
      { heading: 'Before closing: demand the data room', items: [
        'Every lease, renewal, and addendum — matched against the rent roll, unit by unit.',
        'The rent roll itself, dated, with move-in dates, deposits held, and balances.',
        'Deposit accounting: exactly which deposits transfer, and the ledger behind each.',
        'Delinquency and payment-plan records.',
        'Vendor contracts that survive closing (laundry, cable, landscaping, waste).',
        'Open work orders, recent inspections, and code-violation history.',
        'Insurance loss runs for the property.',
        'Utility accounts and who pays what.',
      ]},
      { heading: 'Red flags in the data room', items: [
        'Units on the rent roll with no lease behind them.',
        'Deposits listed with no ledger showing where the money sits.',
        'A gap between claimed rents and the bank deposits that should show them.',
        '"The prior manager has those" — name the manager, get the commitment in writing.',
      ]},
      { heading: 'Day of transfer', items: [
        'Written inventory of every record received, signed by both sides — this becomes your proof of what was and wasn\'t delivered.',
        'Keys, access codes, and a list of who else holds them (staff, vendors).',
        'Software export from the prior property-management system — full data, not summaries, before their access is cut off.',
        'Meter readings and photos of building condition, common areas, and mechanicals.',
      ]},
      { heading: 'First 30 days', items: [
        'Estoppel-style confirmation to every resident: your records of their lease terms, deposit, and balance — asking them to confirm or dispute. Disputes found now are cheap; found in court, expensive.',
        'Missing-record report: every gap from the transfer inventory, assigned to whoever owes it.',
        'Unresolved-item tracker: open maintenance, disputes, notices mid-flight.',
        'New folder structure — organized by unit and by category from day one.',
      ]},
      { heading: 'Days 30–90', items: [
        'Chase the missing-record list to closure or written dead-end.',
        'Verify deposit transfers reconcile to the ledger, unit by unit.',
        'Confirm vendor contracts were assigned, replaced, or ended — in writing.',
        'Software exit complete: prior system data archived in your possession, access ended.',
        'By day 90: the transferred-record inventory, missing-record report, and trackers become the property\'s permanent records baseline.',
      ]},
      { heading: 'When to bring in PRC', body: 'This guide is the do-it-yourself map. The New Ownership Records Transition Review is the done-for-you version: inventory, missing-record report, proof-of-connection table, trackers, and the 30/60/90 plan, delivered. Most buyers hire it done for the same reason they hire an inspector.' },
    ],
  },
];
