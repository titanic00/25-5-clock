$(document).ready(function() {
    let countDownDate = 2500;
    var x = setInterval(function() {

        countDownDate -= 1;
        $('#time').html(countDownDate);
    }, 1000);
});