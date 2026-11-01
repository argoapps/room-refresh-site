/* Vercel Web Analytics must be enabled on the project. No cookies or photo data. */
(() => {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical || location.origin !== new URL(canonical.href).origin) return;
  window.va = window.va || function (...args) { (window.vaq = window.vaq || []).push(args); };
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  script.dataset.sdkn = 'static-website';
  script.dataset.sdkv = '1.0.0';
  document.head.append(script);
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('a[data-event]') : null;
    if (!target || !['shopify_install_click','demo_click'].includes(target.dataset.event)) return;
    window.va('event', {name: target.dataset.event, data: {
      page: location.pathname,
      placement: target.dataset.placement || 'content'
    }});
  });
})();
