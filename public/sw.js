self.addEventListener("install", e=> {
	e.waitUntil(
		caches.open("static").then(cache => {
			return cache.addAll([
					"./",
	"./assets/theme/css/style.css", 
	"./assets/theme/css/skin-black.css",
	"./assets/theme/images/logos/logo192.png",
	"./assets/plugins/bootstrap-3.3.1/css/bootstrap.min.css",
	"./assets/plugins/typed/typed.css",
	"./assets/plugins/font-awesome-4.2.0/css/font-awesome.min.css"
				]);
		})
	);
});

self.addEventListener("fetch", e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
			})
		);
});
