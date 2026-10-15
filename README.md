<div align="center">
  <img src="assets/favicon-512.png" width="88" alt="SSIK logo">
  <h1>SSIK IT Consulting &amp; Solutions</h1>
  <p><strong>A clear, bounded public site for practical IT and cybersecurity consulting.</strong></p>
  <p>SSIK was co-founded in May 2026 by Ontario Tech University classmates Affan Shaikh and Ghayas Sher.</p>

  <p>
    <a href="https://sil6428.github.io/SSIK-website/index.html"><img alt="Visit the live website" src="https://img.shields.io/badge/Live_Website-Visit-2563eb?logo=githubpages&amp;logoColor=white"></a>
    <a href="https://github.com/sil6428/SSIK-website/actions/workflows/quality.yml"><img alt="Quality checks" src="https://github.com/sil6428/SSIK-website/actions/workflows/quality.yml/badge.svg"></a>
    <img alt="Static HTML CSS and JavaScript" src="https://img.shields.io/badge/Stack-HTML_%2B_CSS_%2B_JS-f97316">
  </p>

  <p>
    <a href="https://sil6428.github.io/SSIK-website/services.html">Services</a> ·
    <a href="https://sil6428.github.io/SSIK-website/about.html">About</a> ·
    <a href="https://sil6428.github.io/SSIK-website/privacy.html">Privacy</a> ·
    <a href="https://sil6428.github.io/SSIK-website/security.html">Security</a>
  </p>
</div>

![SSIK IT Consulting & Solutions](assets/ssik-social-card.png)

## What the site communicates

- **A bounded service offering.** Security baseline reviews, cyber-risk and control reviews, infrastructure documentation, policy support, and phased improvement planning.
- **A defined engagement process.** Discovery, written scope, authorization, review and delivery, then follow-up.
- **Honest examples.** The project page shows representative service scenarios under “How We Help” without implying completed client work.
- **Reviewable contact flows.** Consultation and contact forms prepare an email draft that the visitor reviews before sending.
- **Public policies.** Privacy, terms, responsible disclosure, and authorization boundaries are readable before an inquiry.
- **No inflated security claims.** The site does not advertise penetration testing, formal certification audits, or guaranteed outcomes.

## Co-founders

- **Shared responsibilities:** Affan Shaikh and Ghayas Sher jointly handle service planning, security-control assessment, privacy and regulatory research, and stakeholder-ready recommendations.
- **Affan Shaikh:** Independently designed, built, published, and maintains this multi-page website and its GitHub Pages deployment.
- **Ghayas Sher:** Shares the consulting, security-assessment, privacy-research, and stakeholder-communication responsibilities.

## Site map

| Page | Purpose |
| --- | --- |
| `index.html` | Company overview and service preview |
| `services.html` | Service boundaries and deliverables |
| `about.html` | Company story, co-founders, values, and approach |
| `projects.html` | Clearly labelled example service scenarios |
| `booking.html` | Structured consultation-intake draft |
| `contact.html` | Contact details and review-before-send inquiry draft |
| `privacy.html` | Website inquiry and hosting privacy notice |
| `terms.html` | Website and consultation-request terms |
| `security.html` | Responsible disclosure and authorization boundaries |

## How it works

```text
Static HTML pages
      ↓ shared visual system
shared.css + legal.css
      ↓ review-before-send contact logic
contact-mail.js
      ↓
GitHub Pages
```

No application server is required for the public site. Contact and consultation forms create a local email draft rather than silently transmitting form contents to a third-party backend.

## Local preview

```bash
git clone https://github.com/sil6428/SSIK-website.git
cd SSIK-website
python -m http.server 8000
```

Open `http://127.0.0.1:8000`.

## Verification

```bash
node --test tests/site.test.mjs
```

The site test checks shared navigation, required policy pages, metadata, form behavior, public wording, and important links. GitHub also runs the quality workflow and CodeQL analysis.

## Privacy and security boundaries

- The public site is static and does not include a custom user-account system.
- Contact details stay in the visitor's reviewable email draft until they choose to send it.
- Example scenarios are not represented as real clients or completed engagements.
- Security work requires written scope and authorization.
- The responsible-disclosure page does not grant permission to test SSIK, its hosting provider, or any third party.
- The separate internal intelligence workflow is private and is not included in this repository.

## Development

### Repository map

| Path | Purpose |
| --- | --- |
| `shared.css` | Shared visual system and responsive layout |
| `legal.css` | Privacy, terms, and security-page layout |
| `contact-mail.js` | Review-before-send inquiry and consultation drafts |
| `assets/` | Favicons, touch icon, and social-preview artwork |
| `tests/site.test.mjs` | Public-content, policy, navigation, and form checks |
| `.github/workflows/quality.yml` | Automated site validation |
| `.github/workflows/codeql.yml` | Static security analysis |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | Search and browser metadata |

## Status and licence

The repository contains the public SSIK website only. Internal research, evidence, access controls, and operational tooling remain private.

Copyright © 2026 SSIK IT Consulting & Solutions. All rights reserved unless a file states otherwise.
