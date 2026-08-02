import type { APIRoute } from 'astro';
import { checklists } from '../../data/checklists';
import { makeEpub, epubResponse, esc, type Chapter } from '../../lib/epub';

export const prerender = false;

const BOUNDARY =
  'These are educational starting points describing records commonly kept in each category — not legal, tax, or medical requirements. Confirm exact requirements with the appropriate attorney, accountant, agency, court, insurer, lender, or healthcare professional.';

export const GET: APIRoute = async () => {
  const chapters: Chapter[] = [
    {
      title: 'About This Handbook',
      html: `<h1>The PRC Records Readiness Starter Handbook</h1>
<p class="intro">Before there is a dispute, there should be a record.</p>
<p>This handbook compiles the seven universal record categories used in every PRC system.
Work through one category at a time. Check off what you have, note what's missing, and
keep the list where you keep the records.</p>
<p>More free tools — checklists, life-event guides, and the Records Request Builder — at
paularecordscustodian.com.</p>
<p class="small">${esc(BOUNDARY)}</p>`,
    },
    ...checklists.map((c) => ({
      title: `${c.n}. ${c.title}`,
      html: `<h1>Category ${c.n}: ${esc(c.title)}</h1>
<p class="intro">${esc(c.intro)}</p>${
        c.sections.map((s) =>
          `<h2>${esc(s.heading)}</h2><ul>${s.items.map((i) => `<li>☐ ${esc(i)}</li>`).join('')}</ul>`
        ).join('')
      }`,
    })),
  ];

  const bytes = await makeEpub({
    title: 'The PRC Records Readiness Starter Handbook',
    author: 'Paula Records Custodian LLC',
    id: 'prc-starter-handbook',
    chapters,
  });
  return epubResponse(bytes, 'PRC-Records-Readiness-Starter-Handbook.epub');
};
