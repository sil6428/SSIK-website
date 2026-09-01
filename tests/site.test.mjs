import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const pages = [
  'index.html',
  'services.html',
  'about.html',
  'projects.html',
  'booking.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'security.html',
];

const read = file => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('all internal page links resolve', () => {
  for (const page of pages) {
    const html = read(page);
    const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1]);

    for (const link of links) {
      if (/^(https?:|mailto:|tel:|#)/.test(link)) continue;
      const target = link.split(/[?#]/, 1)[0];
      assert.ok(existsSync(new URL(`../${target}`, import.meta.url)), `${page} links to missing ${target}`);
    }
  }
});

test('every page has current navigation, sharing metadata, policy links, and copyright', () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(html, /http-equiv="Content-Security-Policy"/);
    assert.match(html, /object-src 'none'/);
    assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin">/);
    assert.match(html, /<link rel="canonical" href="https:\/\/sil6428\.github\.io\/SSIK-website\/[^"]+">/);
    assert.match(html, /<link rel="icon" type="image\/png" sizes="32x32" href="assets\/favicon-32\.png">/);
    assert.match(html, /<meta property="og:image" content="https:\/\/sil6428\.github\.io\/SSIK-website\/assets\/ssik-social-card\.png">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
    assert.match(html, /projects\.html">How We Help</);
    assert.match(html, /privacy\.html">Privacy</);
    assert.match(html, /terms\.html">Terms</);
    assert.match(html, /security\.html">Security</);
    assert.match(html, /© 2026 SSIK IT Consulting & Solutions/);
    assert.doesNotMatch(html, />Projects</);
    assert.doesNotMatch(html, /© 2025/);
  }
});

test('brand assets and discovery files have production dimensions and links', () => {
  const dimensions = file => {
    const png = readFileSync(new URL(`../${file}`, import.meta.url));
    assert.equal(png.toString('ascii', 1, 4), 'PNG', `${file} is not a PNG`);
    return [png.readUInt32BE(16), png.readUInt32BE(20)];
  };

  assert.deepEqual(dimensions('assets/ssik-social-card.png'), [1200, 630]);
  assert.deepEqual(dimensions('assets/favicon-512.png'), [512, 512]);
  assert.deepEqual(dimensions('assets/favicon-32.png'), [32, 32]);
  assert.deepEqual(dimensions('assets/apple-touch-icon.png'), [180, 180]);
  assert.match(read('site.webmanifest'), /"name": "SSIK IT Consulting & Solutions"/);
  assert.match(read('robots.txt'), /Sitemap: https:\/\/sil6428\.github\.io\/SSIK-website\/sitemap\.xml/);
  assert.equal((read('sitemap.xml').match(/<url>/g) ?? []).length, pages.length);
});

test('service scenarios do not imply completed client projects', () => {
  const projects = read('projects.html');
  assert.match(projects, /These are examples of services SSIK is prepared to discuss, not published client case studies/);
  assert.match(projects, /Example Engagement Paths/);
  assert.doesNotMatch(projects, /Past Project Areas|Project Portfolio|Case studies coming soon/);
});

test('contact and booking flows create reviewable email drafts', () => {
  const contact = read('contact.html');
  const booking = read('booking.html');
  const mail = read('contact-mail.js');

  assert.match(contact, /id="contact-form"/);
  assert.match(contact, /id="contact-form-status"/);
  assert.match(booking, /id="booking-form"/);
  assert.match(booking, /id="booking-form-status"/);
  assert.match(booking, /name="preferred_window"/);
  assert.match(booking, /review the fit and reply with proposed times/i);
  assert.doesNotMatch(booking, /name="preferred_date"/);
  assert.match(mail, /mailto:\$\{inbox\}/);
  assert.match(mail, /contactForm\.addEventListener\('submit'/);
  assert.match(mail, /bookingForm\.addEventListener\('submit'/);
  assert.doesNotMatch(`${contact}\n${booking}`, /formsubmit\.co|method="POST"/);
});

test('the public service scope and written process match current capability', () => {
  const services = read('services.html');
  const index = read('index.html');

  assert.match(services, /Security Baseline Review/);
  assert.match(services, /Cyber Risk &amp; Control Review|Cyber Risk & Control Review/);
  assert.match(services, /Written Scope/);
  assert.match(services, /Authorize/);
  assert.match(services, /Follow Up/);
  assert.match(services, /excludes penetration testing and formal certification audits/i);
  assert.doesNotMatch(`${services}\n${index}`, /<h3>Penetration Testing<\/h3>|service=Penetration/);
});

test('policy pages communicate privacy and authorization boundaries', () => {
  assert.match(read('privacy.html'), /does not silently submit its contact forms/i);
  assert.match(read('privacy.html'), /does not sell inquiry information/i);
  assert.match(read('terms.html'), /does not create a professional or client relationship/i);
  assert.match(read('security.html'), /written authorization/i);
  assert.match(read('security.html'), /not blanket authorization/i);
});

test('contact FAQ controls support keyboard activation and expose state', () => {
  const contact = read('contact.html');
  assert.equal((contact.match(/<button type="button" class="faq-q" aria-expanded="false">/g) ?? []).length, 4);
  assert.match(contact, /setAttribute\('aria-expanded', String\(isOpen\)\)/);
});
