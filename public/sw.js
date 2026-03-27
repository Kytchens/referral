// No-op service worker to prevent 404 errors from stale registrations.
// This immediately activates and does nothing.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
