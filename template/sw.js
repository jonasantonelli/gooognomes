
function isSupported() {
    return self.registration && self.registration.navigationPreload;
}

const $Cache = {
    cacheFirst: 'app-cache',
    networkFirst: 'app-network',
};

workbox.core.setCacheNameDetails({
    prefix: 'app'
});
workbox.precaching.precacheAndRoute(self.__precacheManifest);

if(isSupported()) {
    workbox.navigationPreload.enable();
    const strategy = new workbox.strategies.NetworkFirst({
        cacheName: $Cache.navigation,
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ],
    });
    const navigationRoute = new workbox.routing.NavigationRoute(strategy, {
        // whitelist: [/\/app\/$/],
        // blacklist: [/^\/(\/.*)?$/]
    });
    workbox.routing.registerRoute(navigationRoute);
}

// ----- Networks First
workbox.routing.registerRoute(
    new RegExp('.*\githubusercontent.com'),
    workbox.strategies.networkFirst({
        cacheName: $Cache.networkFirst,
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// ------ Cache First
workbox.routing.registerRoute(
    new RegExp('.*.(?:png|jpg|jpeg|gif|svg|woff|woff2)'),
    new workbox.strategies.CacheFirst({
        cacheName: $Cache.cacheFirst,
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);
