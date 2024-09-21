// Set the date we're counting down to
var countDownDateStart = new Date("Jun 2, 2024 14:00:00 GMT+02").getTime();
var countDownDateEnd = new Date("Jun 2, 2024 20:00:00 GMT+02").getTime();

$(function() {
    countDown();
});

function countDown() {
  // Get today's date and time
  var now = new Date().getTime();  
  // Find the distance between now and the count down date
  var distance = countDownDateStart - now;
  //alert('totote');
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Display the result in the element with id="demo"
  var result = "Prochain évènement dans " + days + "j " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    if (countDownDateEnd - now > 0) {
        result = "Le Goûtez Electronique a lieu en ce moment !";
    } else {
        result = "";
    }
  }
  document.getElementById("countDown").innerHTML = result;
}

var x = setInterval(countDown, 1000);