const cacheName = "ALTernative.MS-Aseprite To PNG Exporter-0.1";
const contentToCache = [
    "Build/WebGL_Aseprite_Runtime_Importer_Test6.loader.js",
    "Build/WebGL_Aseprite_Runtime_Importer_Test6.framework.js.unityweb",
    "Build/WebGL_Aseprite_Runtime_Importer_Test6.data.unityweb",
    "Build/WebGL_Aseprite_Runtime_Importer_Test6.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
