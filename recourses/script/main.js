$(document).ready(function() {
    /* -------------------------------------------------------------------------------- */

    // initial values
    const breakLength = 5;
    const sessionLength = 25;
    // set values for break length and session length by clicking buttons on the page
    let breakLength_dynamycValue = 5;
    let sessionLength_dynamycValue = 25;
    //
    let breakLength_buffer = 0;
    let sessionLength_buffer = 0;
    let seconds = 59;
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
            breakLength_buffer = breakLength_dynamycValue;
            $('#break-length-value').html(`${breakLength_dynamycValue}`);
        }
    });
    $('.break-length-increase').on('click', () => {
        if (!isPlayed) {
            breakLength_dynamycValue += 1;
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
            sessionLength_buffer = sessionLength_dynamycValue;
            $('#session-length-value').html(`${sessionLength_dynamycValue}`);
            $('#time').html(`${sessionLength_dynamycValue}:00`);
        }
    });
    $('.session-length-increase').on('click', () => {
        if (!isPlayed) {
            sessionLength_dynamycValue += 1;
            sessionLength_buffer = sessionLength_dynamycValue;
            $('#session-length-value').html(`${sessionLength_dynamycValue}`);
            $('#time').html(`${sessionLength_dynamycValue}:00`);
        }
    });
    /* -------------------------------------------------------------------------------- */

    const breakStopwatch = () => {

        if (breakLength_dynamycValue === 0 && seconds === 0) {
            sessionLength_dynamycValue = sessionLength_buffer;
            isBreakRn = false;
            return;
        }

        if (seconds === 59) {
            breakLength_dynamycValue -= 1;
            $('#time').html(`${breakLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        } else if (seconds === 0) {
            seconds = 59;
            $('#time').html(`${breakLength_dynamycValue}:${seconds}`);
        } else if (seconds < 10) {
            $('#time').html(`${breakLength_dynamycValue}:0${seconds}`);
            seconds -= 1;
        } else {
            $('#time').html(`${breakLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        }
    }

    const sessionStopwatch = () => {

        if (sessionLength_dynamycValue === 0 && seconds === 0) {
            breakLength_dynamycValue = breakLength_buffer;
            isBreakRn = true;
            return;
        }

        if (seconds === 59) {
            sessionLength_dynamycValue -= 1;
            $('#time').html(`${sessionLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        } else if (seconds === 0) {
            seconds = 59;
            $('#time').html(`${sessionLength_dynamycValue}:${seconds}`);
        } else if (seconds < 10) {
            $('#time').html(`${sessionLength_dynamycValue}:0${seconds}`);
            seconds -= 1;
        } else {
            $('#time').html(`${sessionLength_dynamycValue}:${seconds}`);
            seconds -= 1;
        }
    }

    const reset = () => {
        $('#break-length-value').html(`${breakLength}`);
        $('#session-length-value').html(`${sessionLength}`);
        $('#time').html(`${sessionLength}:00`);
        breakLength_dynamycValue = breakLength;
        sessionLength_dynamycValue = sessionLength;
        seconds = 59;
        isRefreshClicked = false;
        isPauseClicked = false;
    }

    //
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
    }

    $('#start').on('click', () => {
        if (isPauseClicked && isRefreshClicked) {
            isPauseClicked = false;
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