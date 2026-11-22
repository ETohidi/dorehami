// بازی‌های دورهمی — offline cache
const CACHE='dorehami-f2ae79c39c-2';
const ASSETS=['./', 'esmfamil.html', 'fonts/Vazirmatn.woff2', 'headsup.html', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'index.html', 'mafia.html', 'manifest.webmanifest', 'moshaere.html', 'spy.html', 'taboo.html', 'truth.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())));
});
