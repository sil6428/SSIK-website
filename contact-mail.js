(() => {
  const inbox = 'ssiksolutions@gmail.com';

  const fieldValue = (form, name) => {
    const value = new FormData(form).get(name);
    return typeof value === 'string' ? value.trim() : '';
  };

  const addLine = (lines, label, value) => {
    if (value) lines.push(`${label}: ${value}`);
  };

  const openEmailDraft = (subject, lines, statusElement) => {
    const mailto = `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    statusElement.textContent = `Opening a draft addressed to ${inbox}. Review it, then press Send in your email app.`;
    window.location.href = mailto;
  };

  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-form-status');

  if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      const name = fieldValue(contactForm, 'name');
      const organization = fieldValue(contactForm, 'organization');
      const inquiryType = fieldValue(contactForm, 'inquiry_type');
      const lines = [
        'Hello SSIK,',
        '',
        'I would like to discuss the following inquiry.',
        '',
      ];

      addLine(lines, 'Name', name);
      addLine(lines, 'Email', fieldValue(contactForm, 'email'));
      addLine(lines, 'Phone', fieldValue(contactForm, 'phone'));
      addLine(lines, 'Organization', organization);
      addLine(lines, 'Inquiry type', inquiryType);
      lines.push('', 'Message:', fieldValue(contactForm, 'message'), '', 'Thank you.');

      const subjectDetails = [inquiryType, organization].filter(Boolean).join(' - ');
      const subject = `SSIK inquiry${subjectDetails ? ` - ${subjectDetails}` : ''}`;
      openEmailDraft(subject, lines, contactStatus);
    });
  }

  const bookingForm = document.getElementById('booking-form');
  const bookingStatus = document.getElementById('booking-form-status');

  if (bookingForm && bookingStatus) {
    bookingForm.addEventListener('submit', event => {
      event.preventDefault();

      const firstName = fieldValue(bookingForm, 'first_name');
      const lastName = fieldValue(bookingForm, 'last_name');
      const organization = fieldValue(bookingForm, 'organization');
      const service = fieldValue(bookingForm, 'service');
      const lines = [
        'Hello SSIK,',
        '',
        'I would like to request a free consultation.',
        '',
        `Name: ${[firstName, lastName].filter(Boolean).join(' ')}`,
      ];

      addLine(lines, 'Business email', fieldValue(bookingForm, 'email'));
      addLine(lines, 'Phone', fieldValue(bookingForm, 'phone'));
      addLine(lines, 'Organization', organization);
      addLine(lines, 'Organization size', fieldValue(bookingForm, 'organization_size'));
      addLine(lines, 'Industry', fieldValue(bookingForm, 'industry'));
      addLine(lines, 'Service of interest', service);
      addLine(lines, 'Preferred contact window', fieldValue(bookingForm, 'preferred_window'));
      lines.push('', 'Additional context:', fieldValue(bookingForm, 'message') || 'No additional context provided.', '', 'Thank you.');

      const subjectDetails = [service, organization].filter(Boolean).join(' - ');
      const subject = `SSIK consultation request${subjectDetails ? ` - ${subjectDetails}` : ''}`;
      openEmailDraft(subject, lines, bookingStatus);
    });
  }
})();
