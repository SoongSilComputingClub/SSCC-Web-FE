export function isAuthed() {
  const params = new URLSearchParams(window.location.search);
  return params.get('authed') === '1';
}
