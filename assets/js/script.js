$(document).ready(function(){
	// cache the window object
	$window = $(window);
	$('section[data-type="background"]').each(function(){
		// declare the variable to affect the defined data-type
		var $scroll = $(this);
		$(window).scroll(function() {
			// HTML5 proves useful for helping with creating JS functions!
			// also, negative value because we're scrolling upwards
			var yPos = -($window.scrollTop() / $scroll.data('speed'));
			// background position
			var coords = '50% '+ yPos + 'px';
			// move the background
			$scroll.css({ backgroundPosition: coords });    
		}); // end window scroll
	});// end section function
	 loadMap();
	 youtubePlayer();
	 carouselNextSlideAutoplay();
});

function youtubePlayer() {
	var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Function that validates email address through a regular expression.
function validateEmail(address) {
	var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	return filter.test(address);
}

function loadMap() {
	var map = L.map('mapid');
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='© <a href="http://openstreetmap.org">OpenStreetMap</a>';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 20, attribution: osmAttrib});
    map.setView(new L.LatLng(47.204, -1.570),14);
	map.addLayer(osm);
	var PinIcon = L.Icon.extend({
		options: {
			iconAnchor:   [22, 55],
			popupAnchor:  [3, -52]
		}
	});
	var pinJDB = new PinIcon({iconUrl: '/assets/images/map/pinJDB.png'});
    var pinCSM = new PinIcon({iconUrl: '/assets/images/map/pinCSM.png'});
	var pinWH = new PinIcon({iconUrl: '/assets/images/map/pinWH.png'});
	var pinM = new PinIcon({iconUrl: '/assets/images/map/pinF.png'});
	var pinGTJ = new PinIcon({iconUrl: '/assets/images/map/pinGTJ.png'});
	var markerJDB = L.marker([47.207443, -1.5658337], {icon: pinJDB}).addTo(map);
	markerJDB.bindPopup("Jardin des Berges");
	var markerCSM = L.marker([47.206243,  -1.567234], {icon: pinCSM}).addTo(map);
	markerCSM.bindPopup("Cale des Sous-Marins");
	var markerWH = L.marker([47.201259, -1.572899], {icon: pinWH}).addTo(map);
	markerWH.bindPopup("Warehouse");
	var markerM = L.marker([47.197542, -1.589129], {icon: pinM}).addTo(map);
	markerM.bindPopup("Macadam");
	var markerGTJ = L.marker([47.20521, -1.56919], {icon: pinGTJ}).addTo(map);
	markerGTJ.bindPopup("Grue Titan Jaune");
}

function onYouTubeIframeAPIReady() {
	players = new Array();
	$(".embedYoutube").each(function() {
		this.id;
		var player = new YT.Player(this.id, {
			videoId: this.id,
			playerVars: {'modestbranding': 1}	,
			events: {
				'onStateChange': onPlayerStateChange
			}
		});
		players.push(player);
	});
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        stopVideo(event.target.a.id);
    }
}

function stopVideo(player_id) {
	players.forEach(function(player) {
		var curPlayId = player.getVideoData()['video_id'];
		if (curPlayId != player_id) {
			player.pauseVideo();
		}
	});
}

function playVideo(player_id) {
	players.forEach(function(player) {
		var curPlayId = player.getVideoData()['video_id'];
		if (curPlayId == player_id) {
			player.playVideo();
		}
	});
}

function carouselNextSlideAutoplay(){
	var callBacK = function (evt) {
		var activeId = $(evt.target).find('.carousel-inner > .carousel-item.active .embedYoutube').attr('id');
		playVideo(activeId);
	}
	$("#carouselVideoCSM").on('slid.bs.carousel', callBacK);
	$("#carouselVideoJDB").on('slid.bs.carousel', callBacK);
}
