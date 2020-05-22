export function disableDocumentScroll() {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
  document.body.style.overflowY = 'scroll';
  document.body.style.scrollBehavior = 'auto';
}

export function enableDocumentScroll() {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';
  document.body.style.scrollBehavior = '';
  window.scrollTo(0, parseInt(scrollY) * -1);
}
