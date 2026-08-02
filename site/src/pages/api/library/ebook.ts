import type { APIRoute } from 'astro';
import { guides } from '../../../data/guides';
import { env, getCookie, verifyScoped } from '../../../lib/session';
import { makeEpub, epubResponse, esc, type Chapter } from '../../../lib/epub';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals, redirect }) => {
  const { DB, SESSION_SECRET } = env(locals);
  const memberId = await verifyScoped('lib', getCookie(request, 'prc_lib'), SESSION_SECRET);
  if (!memberId) return redirect('/library#join');
  const member = await DB.prepare(
    "SELECT id FROM library_members WHERE id = ? AND active = 1 AND (expires_at IS NULL OR expires_at > datetime('now'))"
  ).bind(memberId).first();
  if (!member) return redirect('/library#join');

  const chapters: Chapter[] = [
    {
      title: 'About This Collection',
      html: `<h1>The PRC Guide Collection</h1>
<p class="intro">The complete member guides of the Records Readiness Library, in one volume.</p>
<p>Each guide walks one life or business situation end to end — the sequence, the records,
and the mistakes that cost people money. This copy is for your personal use as a
Library member.</p>
<p class="small">Educational content, not legal, tax, or medical advice. Confirm exact
requirements with the appropriate qualified professional.</p>`,
    },
    ...guides.map((g) => ({
      title: g.title,
      html: `<h1>${esc(g.title)}</h1>
<p class="intro">${esc(g.intro)}</p>${
        g.sections.map((s) =>
          `<h2>${esc(s.heading)}</h2>${s.body ? `<p>${esc(s.body)}</p>` : ''}${
            s.items ? `<ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''
          }`
        ).join('')
      }`,
    })),
  ];

  const bytes = await makeEpub({
    title: 'The PRC Guide Collection — Records Readiness Library',
    author: 'Paula Records Custodian LLC',
    id: 'prc-guide-collection',
    chapters,
  });
  return epubResponse(bytes, 'PRC-Guide-Collection.epub');
};
