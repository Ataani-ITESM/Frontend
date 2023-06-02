self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      const urlsToCache = [
        "/",
        "/index.html",
        "/send.html",
        "/message/index.html",
      ];
      console.log("Caching URLs:", urlsToCache);
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache:", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.indexOf("/api/") !== -1) {
    event.respondWith(fetch(event.request));
    console.log("Serving an API request real");
    console.log(event.request.url);
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log("Serving a cached page");
      console.log(event.request.url);

      return response || fetch(event.request);
    })
  );
});
