// Post-build site integrity checks (run after `next build`, against out/).
//
// 1. Sitemap <-> exported pages stay in sync (catches forgetting to update
//    public/sitemap.xml when events are added/removed in lib/config.ts).
// 2. Link policy guard: no mailto:/tel:/instagram.com links may appear in the
//    built HTML until real ones are verified (see LINK POLICY in lib/config.ts),
//    and every external href/src must be on the verified allowlist.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

// On Windows, URL.pathname yields "/C:/..." — strip the leading slash so fs
// calls get a valid drive path. (No-op on POSIX/CI. Assumes no spaces or other
// percent-encoded characters in the repo path; use fileURLToPath if that changes.)
const OUT = new URL('../out/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITE_URL = 'https://container2.jahdev.com';

// External URL prefixes that are VERIFIED-REAL for this site.
const ALLOWED_EXTERNAL = [
  'https://www.google.com/maps', // Open-in-Maps link + embed iframe
  'https://schema.org',
  'http://schema.org',
  'http://www.w3.org', // SVG namespace
  SITE_URL,
];

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error('FAIL: ' + msg);
};

if (!existsSync(OUT) || !existsSync(join(OUT, 'index.html'))) {
  console.error('FAIL: out/index.html missing — run `next build` first.');
  process.exit(1);
}

// ── 1. sitemap <-> exported pages ──────────────────────────────────────────
if (!existsSync(join(OUT, 'sitemap.xml'))) {
  console.error('FAIL: out/sitemap.xml missing (should be copied from public/).');
  process.exit(1);
}
const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

for (const url of sitemapUrls) {
  if (!url.startsWith(SITE_URL)) {
    fail(`sitemap URL ${url} is not under ${SITE_URL}`);
    continue;
  }
  const path = url.slice(SITE_URL.length).replace(/\/$/, '');
  const file = join(OUT, path, 'index.html');
  if (!existsSync(file)) fail(`sitemap lists ${url} but ${file} was not exported`);
}

const eventsDir = join(OUT, 'events');
if (existsSync(eventsDir)) {
  for (const slug of readdirSync(eventsDir)) {
    if (!statSync(join(eventsDir, slug)).isDirectory()) continue;
    const url = `${SITE_URL}/events/${slug}/`;
    if (!sitemapUrls.includes(url)) fail(`exported event page ${url} missing from sitemap.xml`);
  }
}

// ── 2. link policy on built HTML ───────────────────────────────────────────
const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) htmlFiles.push(p);
  }
})(OUT);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  // Anchored to href=/quote boundaries so prose like "Hotel:" can't false-positive.
  for (const banned of [/href="(?:mailto|tel):/i, /["'\s>](?:mailto|tel):[^\s"'<]+@/i, /instagram\.com/i]) {
    if (banned.test(html)) fail(`${file} matches ${banned} — no verified handle/mailbox exists (see lib/config.ts LINK POLICY)`);
  }
  // Best-effort scan: double-quoted href/src in raw HTML (misses srcset/inline
  // CSS/RSC payload escapes — acceptable for a policy tripwire, not a hard gate).
  for (const m of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    if (url.startsWith(SITE_URL)) continue;
    if (!ALLOWED_EXTERNAL.some((p) => url.startsWith(p))) {
      fail(`${file} links to unverified external URL: ${url}`);
    }
  }
}

if (failures) {
  console.error(`\ncheck-site: ${failures} failure(s).`);
  process.exit(1);
}
console.log(`check-site: OK — ${sitemapUrls.length} sitemap URLs, ${htmlFiles.length} HTML files checked.`);
