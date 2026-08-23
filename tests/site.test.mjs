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

test('every page has current navigation, metadata, and copyright', () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(html, /projects\.html">How We Help</);
    assert.match(html, /© 2026 SSIK IT Consulting & Solutions/);
    assert.doesNotMatch(html, />Projects</);
    assert.doesNotMatch(html, /© 2025/);
  }
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
  assert.match(mail, /mailto:\$\{inbox\}/);
  assert.match(mail, /contactForm\.addEventListener\('submit'/);
  assert.match(mail, /bookingForm\.addEventListener\('submit'/);
  assert.doesNotMatch(`${contact}\n${booking}`, /formsubmit\.co|method="POST"/);
});

test('contact FAQ controls support keyboard activation and expose state', () => {
  const contact = read('contact.html');
  assert.equal((contact.match(/<button type="button" class="faq-q" aria-expanded="false">/g) ?? []).length, 4);
  assert.match(contact, /setAttribute\('aria-expanded', String\(isOpen\)\)/);
});
