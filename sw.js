// بازی‌های دورهمی — offline cache
const CACHE='dorehami-0f32814e0f';
const ASSETS=['./', 'fonts/Vazirmatn.woff2', 'headsup.html', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'index.html', 'mafia.html', 'manifest.webmanifest', 'spy.html', 'truth.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())));
});
