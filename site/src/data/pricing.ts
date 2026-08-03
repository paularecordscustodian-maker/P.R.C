// PRC launch pricing — edit this file to change prices site-wide.
// Every engagement is confirmed by written scope; these are the published starting points.

export interface PriceRow {
  service: string;
  price: string;
  detail: string;
}

export const oneTime: PriceRow[] = [
  { service: 'Records Health Check — Individual / Family', price: '$249', detail: 'Full inventory across the seven categories, missing-record report, and a readiness plan.' },
  { service: 'Records Health Check — Business', price: 'from $495', detail: 'Scoped by entities, accounts, and document volume. The starting point for every business engagement.' },
  { service: 'New Ownership Records Transition Review', price: 'base $1,500 + $15/unit', detail: 'For newly acquired properties: transferred-record inventory, missing-record report, trackers, and the 30/60/90 plan. Use the estimator below.' },
  { service: 'Key-Person & Employee Handoff Review', price: 'from $750', detail: 'Capture what a departing key person holds; document responsibilities and access.' },
  { service: 'Software Exit Records Package', price: 'from $950', detail: 'Full extraction, organization, and indexing before access to the old system ends.' },
  { service: 'Business Records Continuity Plan', price: 'from $1,250', detail: 'The written plan for surviving the loss of a person, device, system, or office.' },
  { service: 'Life Transition Kit (per situation)', price: '$149–$349', detail: 'First apartment, first job, caregiver, senior, reentry, estate — records organized for one life event.' },
];

export const monthly: PriceRow[] = [
  { service: 'Records Organization', price: '$195/mo', detail: 'Ongoing filing, indexing, and retrieval support for a small business or family office.' },
  { service: 'Records & Bookkeeping Readiness Support', price: '$395/mo', detail: 'Records organization plus transaction-to-record connection, ready for your bookkeeper or CPA.' },
  { service: 'Property Records Management', price: '$2/unit/mo (min $150)', detail: 'Leases, ledgers, work orders, and notices — maintained and retrievable, per property.' },
  { service: 'Business Continuity Membership', price: '$95/mo', detail: 'Continuity plan kept current, quarterly readiness reviews, annual restore drill.' },
  { service: 'Annual Records Health Check', price: '$395/yr', detail: 'A yearly re-inventory and refreshed readiness plan for businesses.' },
  { service: 'Life Ready Membership', price: '$19/mo', detail: 'Family records kept ready: annual review, reminders, and Library access included.' },
  { service: 'Records Readiness Library', price: '$79/yr', detail: 'All member guides plus the complete e-book collection.' },
];

// New Ownership Records Transition Review estimator
export const transition = { base: 1500, perUnit: 15, minUnits: 1, maxUnits: 1000 };
