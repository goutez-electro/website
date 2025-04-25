// Liste des événements avec des dates de début et de fin
var events = [
  { start: new Date("Apr 26, 2025 19:24:00 GMT+02").getTime(), end: new Date("Jun 8, 2025 20:00:00 GMT+02").getTime() },

  { start: new Date("Jun 8, 2025 14:00:00 GMT+02").getTime(), end: new Date("Jun 8, 2025 20:00:00 GMT+02").getTime() },
  { start: new Date("Sep 14, 2025 14:00:00 GMT+02").getTime(), end: new Date("Sep 14, 2025 20:00:00 GMT+02").getTime() },
  { start: new Date("Sep 27, 2025 17:00:00 GMT+02").getTime(), end: new Date("Sep 27, 2025 23:00:00 GMT+02").getTime() },
];

$(function() {
  countDown();
});

function countDown() {
  // Get today's date and time
  var now = new Date().getTime();
  var result = "";
  var nextEvent = null;

  // Parcourir la liste des événements pour trouver le prochain événement
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    if (now < event.end) {
      nextEvent = event;
      break;
    }
  }

  if (nextEvent) {
    var distance = nextEvent.start - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="countDown"
    result = "Prochain évènement dans ";
    if (days > 0) {
      result += days + "j ";
    }
    if (hours > 0) {
      result += hours + "h ";
    }
    if (minutes > 0) {
      result += minutes + "m ";
    }
    result += seconds + "s";

    // If the count down is finished, write some text
    if (distance < 0) {
      if (nextEvent.end - now > 0) {
        result = "L'événement a lieu en ce moment !";
      } else {
        result = "";
      }
    }
  } else {
    result = "Aucun événement à venir.";
  }

  document.getElementById("countDown").innerHTML = result;
}

var x = setInterval(countDown, 1000);
