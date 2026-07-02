// sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
  // 快取主頁面與資源 (HTML, CSS, JS)
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  // 快取圖片與字體 (Cache First)
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image' || request.destination === 'font',
    new workbox.strategies.CacheFirst({
      cacheName: 'image-font-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 天
        }),
      ],
    })
  );
} else {
  console.log("Workbox 載入失敗 😬");
}
