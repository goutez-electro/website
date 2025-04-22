document.addEventListener('DOMContentLoaded', function () {
  // cache the window object
  const windowObj = window;

  // Background parallax effect
  const scrollElements = document.querySelectorAll(
    'section[data-type="background"]',
  );
  for (const scrollElement of scrollElements) {
    window.addEventListener('scroll', function () {
      const yPos = -(windowObj.scrollY / scrollElement.dataset.speed);
      scrollElement.style.backgroundPosition = '50% ' + yPos + 'px';
    });
  }

  // Load the map
  loadMap();

  // Load YouTube API
  let tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Initialize carousel autoplay functionality
  carouselNextSlideAutoplay('#swiper-container1');
  carouselNextSlideAutoplay('#swiper-container2');
});

let players = {};

// YouTube API Ready function
function onYouTubeIframeAPIReady() {
  const embedYoutubeElements = document.querySelectorAll('.embedYoutube');
  for (const element of embedYoutubeElements) {
    const videoId = element.dataset.videoId || element.id; // Use data attribute if available, otherwise fallback to id
    players[element.id] = new YT.Player(videoId, {
      videoId: videoId,
      playerVars: {
        controls: 0,
        color: 'white',
        // 'modestbranding': 1 // deprecated, does nothing https://developers.google.com/youtube/player_parameters#release_notes_08_15_2023
      },
    });
  }
}

// Function that validates email address through a regular expression.
function validateEmail(address) {
  const filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  return filter.test(address);
}

// Map loading function
function loadMap() {
  const map = L.map('mapid');
  const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib = '© <a href="http://openstreetmap.org">OpenStreetMap</a>';
  const osm = new L.TileLayer(osmUrl, {
    minZoom: 8,
    maxZoom: 20,
    attribution: osmAttrib,
  });
  map.setView(new L.LatLng(47.204, -1.57), 14);
  map.addLayer(osm);

  const PinIcon = L.Icon.extend({
    options: {
      iconAnchor: [22, 55],
      popupAnchor: [3, -52],
    },
  });

  //const pinJDB = new PinIcon({ iconUrl: '/assets/images/map/pinJDB.png' });
  const pinCSM = new PinIcon({ iconUrl: '/assets/images/map/pinCSM.png' });
  //const pinWH = new PinIcon({ iconUrl: '/assets/images/map/pinWH.png' });
  const pinM = new PinIcon({ iconUrl: '/assets/images/map/pinF.png' });
  const pinGTJ = new PinIcon({ iconUrl: '/assets/images/map/pinGTJ.png' });

  //const markerJDB = L.marker([47.207443, -1.5658337], { icon: pinJDB }).addTo(map);
  //markerJDB.bindPopup('Jardin des Berges');

  const markerCSM = L.marker([47.206243, -1.567234], { icon: pinCSM }).addTo(
    map,
  );
  markerCSM.bindPopup('Cale des Sous-Marins');

  //const markerWH = L.marker([47.201259, -1.572899], { icon: pinWH }).addTo(map);
  //markerWH.bindPopup('Warehouse');

  const markerM = L.marker([47.197542, -1.589129], { icon: pinM }).addTo(map);
  markerM.bindPopup('Macadam');

  const markerGTJ = L.marker([47.20521, -1.56919], { icon: pinGTJ }).addTo(map);
  markerGTJ.bindPopup('Grue Titan Jaune');
}

// Carousel autoplay function
/*
function carouselNextSlideAutoplay(selector) {
  const swiperEl = document.querySelector(selector).swiper;
  swiperEl.on('slideChange', (event) => {
    for (const playerId in players) {
      players[playerId].pauseVideo();
    }
    if (event && event.slides && Object.keys(players).length > 0 && players[event.slides[event.activeIndex].firstElementChild.id]) {
      players[event.slides[event.activeIndex].firstElementChild.id].playVideo();
    }
  });
}
*/