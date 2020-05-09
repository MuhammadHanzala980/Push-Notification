var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/main.js',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});



self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('https://suspicious-brattain-78b6ab.netlify.app/');
        notification.close();
    }
});


// self.addEventListener('notificationclose', function (e) {
//     var notification = e.notification;
//     var primaryKey = notification.data.primaryKey;

//     console.log('Closed notification: ' + primaryKey);
// });
self.addEventListener('push', function (e) {
    var options = {
        body: 'Here is a notification body!',
        icon: 'https://lh3.googleusercontent.com/j5Qh64sO4UGPG3yaNELSwCbk1ZraNxFyVly2W5Qz9IpZUZ5Xvo6_jpF-E6PLzdj_u4RRre90pw=w128-h128-e365',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore', title: 'Explore this new world',
                icon: 'https://lh3.googleusercontent.com/j5Qh64sO4UGPG3yaNELSwCbk1ZraNxFyVly2W5Qz9IpZUZ5Xvo6_jpF-E6PLzdj_u4RRre90pw=w128-h128-e365',
            },
            {
                action: 'close', title: 'Close notification',
                icon: 'https://lh3.googleusercontent.com/j5Qh64sO4UGPG3yaNELSwCbk1ZraNxFyVly2W5Qz9IpZUZ5Xvo6_jpF-E6PLzdj_u4RRre90pw=w128-h128-e365',
            },
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Hello world!', options)
    );
});
// console.log('Started', self);
// self.addEventListener('install', function (event) {
//     self.skipWaiting();
//     console.log('Installed', event);
// });
// self.addEventListener('activate', function (event) {
//     console.log('Activated', event);
// });
// self.addEventListener('push', function (event) {
//     console.log('Push message received', event);
// });