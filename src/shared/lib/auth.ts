export function isAuthed() {
  const params = new URLSearchParams(globalThis.location.search);
  return params.get('authed') === '1';
}
