// Minimal EPUB3 generator — assembles a valid .epub (zip) in memory from chapters.
import JSZip from 'jszip';

export interface Chapter { title: string; html: string } // html = body-level XHTML, already escaped

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const CSS = `
body { font-family: Georgia, serif; line-height: 1.55; margin: 5%; color: #1a1a1a; }
h1 { font-size: 1.5em; margin: 1em 0 0.4em; }
h2 { font-size: 1.15em; margin: 1.2em 0 0.4em; }
p.intro { font-style: italic; color: #444; }
ul { padding-left: 1.2em; }
li { margin: 0.3em 0; }
p.small { font-size: 0.85em; color: #555; }
`;

function xhtml(title: string, body: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>${esc(title)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>${body}</body>
</html>`;
}

export async function makeEpub(opts: { title: string; author: string; id: string; chapters: Chapter[] }): Promise<Uint8Array> {
  const { title, author, id, chapters } = opts;
  const zip = new JSZip();
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
  zip.file('META-INF/container.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`);

  const manifest = chapters.map((_, i) =>
    `<item id="ch${i}" href="ch${i}.xhtml" media-type="application/xhtml+xml"/>`).join('\n    ');
  const spine = chapters.map((_, i) => `<itemref idref="ch${i}"/>`).join('\n    ');
  const modified = new Date().toISOString().replace(/\.\d+Z$/, 'Z');

  zip.file('OEBPS/package.opf',
    `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">urn:uuid:${id}</dc:identifier>
    <dc:title>${esc(title)}</dc:title>
    <dc:creator>${esc(author)}</dc:creator>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">${modified}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
    ${manifest}
  </manifest>
  <spine>
    ${spine}
  </spine>
</package>`);

  zip.file('OEBPS/nav.xhtml', xhtml('Contents',
    `<nav epub:type="toc" id="toc"><h1>Contents</h1><ol>${
      chapters.map((c, i) => `<li><a href="ch${i}.xhtml">${esc(c.title)}</a></li>`).join('')
    }</ol></nav>`));

  zip.file('OEBPS/style.css', CSS);
  chapters.forEach((c, i) => zip.file(`OEBPS/ch${i}.xhtml`, xhtml(c.title, c.html)));

  return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
}

export function epubResponse(bytes: Uint8Array, filename: string): Response {
  return new Response(bytes, {
    headers: {
      'Content-Type': 'application/epub+zip',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
