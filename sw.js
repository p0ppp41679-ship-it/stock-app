// 캐시(Cache) 이름 설정
const CACHE_NAME = 'portfolio-dashboard-v1';

// 오프라인에서도 동작하기 위해 캐싱할 파일 목록
const urlsToCache = [
  'dashboard.html',
  'manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// 서비스 워커 설치 시 파일 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('파일이 정상적으로 캐시되었습니다.');
        return cache.addAll(urlsToCache);
      })
  );
});

// 네트워크 요청 시 캐시된 데이터 제공 (오프라인 지원)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 데이터가 있으면 반환, 없으면 네트워크 요청 진행
        return response || fetch(event.request);
      })
  );
});