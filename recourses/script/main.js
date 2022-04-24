$(document).ready(function() {
    /* -------------------------------------------------------------------------------- */

    // played between the transition from the work session to the rest, and vice versa
    const notification = new Audio('./recourses/sounds/notification.wav');
    // initial values
    const breakLength = 5;
    const sessionLength = 25;
    // set values for break length and session length by clicking buttons on the page
    let breakLength_dynamycValue = 5;
    let sessionLength_dynamycValue = 25;
    // we need these values to make the transition between rest and work session
    let breakLength_buffer = breakLength_dynamycValue;
    let sessionLength_buffer = sessionLength_dynamycValue;
    let seconds = 59;
    // check if buttons have been pressed
    let isPauseClicked = false;
    let isRefreshClicked = false;
    let isBreakRn = false;
    let isPlayed = false;

    /* -------------------------------------------------------------------------------- */

    // view values on the web page
    $('#break-length-value').html(`${breakLength_dynamycValue}`);
    $('#session-length-value').html(`${sessionLength_dynamycValue}`);
    $('#time').html(`${sessionLength_dynamycValue}:00`);

    // decrease and inrease value of break length
    $('.break-length-decrease').on('click', () => {
        if (!isPlayed) {
            if (breakLength_dynamycValue == 1)
                return;
            breakLength_dynamycValue -= 1;
            // we need thie value to make the transition between rest and work session
            breakLength_buffer = breakLength_dynamycValue;
            $('#break-length-value').html(`${breakLength_dynamycValue}`);
        }
    });
    $('.break-length-increase').on('click', () => {
        if (!isPlayed) {
            breakLength_dynamycValue += 1;
            // we need thie value to make the transition between rest and work session
            breakLength_buffer = breakLength_dynamycValue;
            $('#break-length-value').html(`${breakLength_dynamycValue}`);
        }
    });

    // decrease and inrease value of session length
    $('.session-length-decrease').on('click', () => {
        if (!isPlayed) {
            if (sessionLength_dynamycValue == 1)
                return;
            sessionLength_dynamycValue -= 1;
            // we need thie value to make the transition between rest and work session
            sessionLength_buffer = sessionLength_dynamycValue;
            $('#session-length-value').html(`${sessionLength_dynamycValue}`);
            $('#time').html(`${sessionLength_dynamycValue}:00`);
        }
    });
    $('.session-length-increase').on('click', () => {
        if (!isPlayed) {
            sessionLength_dynamycValue += 1;
            // we need thie value to make the transition between rest and work session
            sessionLength_buffer = sessionLength_dynamycValue;
            $('#session-length-value').html(`${sessionLength_dynamycValue}`);
            $('#time').html(`${sessionLength_dynamycValue}:00`);
        }
    });

    /* -------------------------------------------------------------------------------- */

    // first launch starts from working session
    $('#session-break').html('Session');

    // stopwatch counts rest time
    const breakStopwatch = () => {

        // if the rest is over (the timer has dropped to 0:0), then the working session is started
        if (breakLength_dynamycValue == 0 && seconds == 0) {
            notification.play();
            $('#session-break').html('Session');
            breakLength_dynamycValue = breakLength_buffer;
            seconds = 59;
            isBreakRn = false;
            return;
        }

        // stopwatch
        if (seconds === 59) {
            breakLength_dynamycValue -= 1;
            $('#time').html(`${breakLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        } else if (seconds === 0) {
            seconds = 59;
            $('#time').html(`${breakLength_dynamycValue}:00`);
        } else if (seconds < 10) {
            $('#time').html(`${breakLength_dynamycValue}:0${seconds}`);
            seconds -= 1;
        } else {
            $('#time').html(`${breakLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        }
    };

    // stepwatch counts session time
    const sessionStopwatch = () => {

        // if the working session is over (the timer has dropped to 0:0), then a break is started
        if (sessionLength_dynamycValue == 0 && seconds == 0) {
            notification.play();
            $('#session-break').html('Time relax!');
            sessionLength_dynamycValue = sessionLength_buffer;
            seconds = 59;
            isBreakRn = true;
            return;
        }

        // stopwatch
        if (seconds === 59) {
            sessionLength_dynamycValue -= 1;
            $('#time').html(`${sessionLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        } else if (seconds === 0) {
            seconds = 59;
            $('#time').html(`${sessionLength_dynamycValue}:00`);
        } else if (seconds < 10) {
            $('#time').html(`${sessionLength_dynamycValue}:0${seconds}`);
            seconds -= 1;
        } else {
            $('#time').html(`${sessionLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        }
    };

    // reset value if reset button has been clicked
    const reset = () => {
        $('#break-length-value').html(`${breakLength}`);
        $('#session-length-value').html(`${sessionLength}`);
        $('#time').html(`${sessionLength}:00`);
        breakLength_dynamycValue = breakLength;
        sessionLength_dynamycValue = sessionLength;
        seconds = 59;
        isRefreshClicked = false;
        isPauseClicked = false;
    };

    // start timer
    const time = () => {
        isPlayed = true;
        const stopwatch = setInterval(() => {
            if (isPauseClicked || isRefreshClicked) {
                clearInterval(stopwatch);
                isPlayed = false;
            } else {
                isBreakRn ? breakStopwatch() : sessionStopwatch();
            }
        }, 1000)
    };

    // timer starts on click
    $('#start').on('click', () => {
        if (isPauseClicked && isRefreshClicked) { // if the buttons were pressed,
            isPauseClicked = false; // we must set a false by pressing the start of the timer
            isRefreshClicked = false;
        } else if (isPauseClicked) {
            isPauseClicked = false;
        } else if (isRefreshClicked) {
            isRefreshClicked = false;
        }
        if (!isPlayed)
            time();
    });

    $('#pause').on('click', () => { // 
        isPauseClicked = true;
    });

    $('#reset').on('click', () => { //
        reset();
        isRefreshClicked = true;
    });
});