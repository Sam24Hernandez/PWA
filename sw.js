// Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_sam_hernandez_pwa';

// Ficheros a cachear en la aplicación
var urlsToCache = [
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/favicon-1024.png',
	'./img/favicon-512.png',
	'./img/favicon-384.png',
	'./img/favicon-256.png',
	'./img/favicon-192.png',
	'./img/favicon-128.png',
	'./img/favicon-96.png',
	'./img/favicon-64.png',
	'./img/favicon-32.png',
	'./img/favicon-16.png'
];

// Install Event
// Instalation Service Worker
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			  .then(cache => {
			  	return cache.addAll(urlsToCache)
			  				.then(() => {
			  					self.skipWaiting();
			  				});			  				
			  })
			  .catch(err => {
					console.log('No se ha registrado el cache', err);
				})
	);
});

// Activated Event
// La app funcionará sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys()
			  .then(cacheNames => {
			  	return Promise.all(
			  		cacheNames.map(cacheName => {
			  			if(cacheWhitelist.indexOf(cacheName) == -1){
			  				// Borrar elementos que no se necesitan
			  				return caches.delete(cacheName);
			  			}
			  		})
		  		);
			  })
			  .then(() => {
			  	// Activar cache
			  	self.clients.claim();
			  })
	);
});

// Fetch Event
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
			  .then(res => {
			  	if(res){
			  		// devuelve datos desde cache
			  		return res;
			  	}
			  	return fetch(e.request);
			  })
	);
});

