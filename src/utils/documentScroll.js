export function disableDocumentScroll() {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
  document.body.style.overflowY = 'scroll';
}

export function enableDocumentScroll() {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, parseInt(scrollY) * -1);
}
