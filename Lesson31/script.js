var countDate = new Date("Jan 1, 2024 00:00:00").getTime();

var interval = setInterval(function() {
  var now = new Date().getTime();

  var timeLeft = countDate - now;

  var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = days + " днів " + hours + " годин " + minutes + " хвилин " + seconds + " секунд";
 
  if (timeLeft < 0) {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "З Новим Роком!";
  }
}, 1000);