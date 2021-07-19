document.addEventListener('DOMContentLoaded', () => {
    if ('fbq' in window) {
        targetFBQActions();
    }
});
function targetFBQActions() {
    document.addEventListener('services-campaign', function () {
        //console.log('services-campaign');
        fbq('track', 'ViewContent', {
            content_type: 'campaign',
        });
    });
    document.addEventListener('services-branding', function () {
        //console.log('services-branding');
        fbq('track', 'ViewContent', {
            content_type: 'branding',
        });
    });
    document.addEventListener('services-digital', function () {
        //console.log('services-digital');
        fbq('track', 'ViewContent', {
            content_type: 'digital',
        });
    });
    document.addEventListener('pillars-strategy', function () {
        //console.log('pillars-digital');
        fbq('track', 'ViewContent', {
            content_type: 'strategy',
        });
    });
    document.addEventListener('pillars-creative', function () {
        //console.log('pillars-creative');
        fbq('track', 'ViewContent', {
            content_type: 'creative',
        });
    });
    document.addEventListener('pillars-design', function () {
        //console.log('pillars-design');
        fbq('track', 'ViewContent', {
            content_type: 'design',
        });
    });
    document.addEventListener('pillars-innovation', function () {
        //console.log('pillars-innovation');
        fbq('track', 'ViewContent', {
            content_type: 'innovation',
        });
    });
    document.addEventListener('form-submit-success', function () {
        //console.log('form-submit-success');
        fbq('track', 'Lead');
    });
}