document.addEventListener('DOMContentLoaded', () => {
  if ('fbq' in window) {
    targetFBQActions();
  }
});

function targetFBQActions() {
  document.addEventListener('services-campaign', () => {
    //console.log('services-campaign');
    // eslint-disable-next-line no-undef
    fbq('track', 'ViewContent', {
      content_type: 'campaign',
    });
  });
  document.addEventListener('services-branding', () => {
    //console.log('services-branding');
    // eslint-disable-next-line no-undef
    fbq('track', 'ViewContent', {
      content_type: 'branding',
    });
  });
  document.addEventListener('services-digital', () => {
    //console.log('services-digital');
    // eslint-disable-next-line no-undef
    fbq('track', 'ViewContent', {
      content_type: 'digital',
    });
  });
  document.addEventListener('pillars-strategy', () => {
    //console.log('pillars-digital');
    // eslint-disable-next-line no-undef
    fbq('track', 'ViewContent', {
      content_type: 'strategy',
    });
  });
  document.addEventListener('pillars-creative', () => {
    //console.log('pillars-creative');
    // eslint-disable-next-line no-undef
    fbq('track', 'ViewContent', {
      content_type: 'creative',
    });
  });
  document.addEventListener('pillars-design', () => {
    //console.log('pillars-design');
    // eslint-disable-next-line no-undef
    fbq('track', 'ViewContent', {
      content_type: 'design',
    });
  });
  document.addEventListener('pillars-innovation', () => {
    //console.log('pillars-innovation');
    // eslint-disable-next-line no-undef
    fbq('track', 'ViewContent', {
      content_type: 'innovation',
    });
  });
  document.addEventListener('form-submit-success', () => {
    //console.log('form-submit-success');
    // eslint-disable-next-line no-undef
    fbq('track', 'Lead');
  });
}