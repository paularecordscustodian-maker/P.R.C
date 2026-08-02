// PRC product catalog. Prices are launch pricing — edit here to change them site-wide.
// Orders are invoiced by PRC before payment (no online card processing yet).

export interface Product {
  slug: string;
  name: string;
  price: number | null; // null = quoted
  priceNote?: string;
  desc: string;
  kind: 'physical' | 'membership' | 'service';
}

export const products: Product[] = [
  {
    slug: 'piggy-bank-book',
    name: "Children's Piggy Bank Papers & Progress Book",
    price: 24.95,
    desc: 'A keepsake book that teaches children to keep their first records — money, milestones, and papers that matter.',
    kind: 'physical',
  },
  {
    slug: 'youth-keepsake-book',
    name: 'Youth Money, Papers & Progress Keepsake Book',
    price: 29.95,
    desc: 'For teens and young adults: first accounts, first paychecks, first credentials — recorded and kept.',
    kind: 'physical',
  },
  {
    slug: 'accordion-system',
    name: 'PRC Seven-Category Accordion File System',
    price: 39.95,
    desc: 'A physical filing system pre-labeled on the PRC framework: identity, health, financial, housing, employment, legal, family. Readiness you can put on a shelf.',
    kind: 'physical',
  },
  {
    slug: 'library-gift',
    name: 'Records Readiness Library — 1-Year Gift Membership',
    price: 79,
    desc: 'A year of full Library access for someone starting out: every member guide, delivered as a member code.',
    kind: 'membership',
  },
  {
    slug: 'workshop',
    name: 'Records Readiness Workshop (for your organization)',
    price: null,
    priceNote: 'Quoted by group size',
    desc: 'A live workshop for schools, churches, nonprofits, or workforce programs — practical records readiness for the people you serve.',
    kind: 'service',
  },
];
