$(document).ready(function() {
    // initial values
    const breakLength = 5;
    const sessionLength = 25;
    // set values for break length and session length by clicking buttons on the page
    let breakLength_dynamycValue = 5;
    let sessionLength_dynamycValue = 25;
    let seconds = 59;
    let isPauseClicked = false;
    let isRefreshClicked = false;
    // view values on the web page
    $('#break-length-value').html(`${breakLength_dynamycValue}`);
    $('#session-length-value').html(`${sessionLength_dynamycValue}`);
    $('#time').html(`${sessionLength_dynamycValue}:00`);

    // decrease and inrease value of break length
    $('.break-length-decrease').on('click', () => {
        if (breakLength_dynamycValue == 1)
            return;
        breakLength_dynamycValue -= 1;
        $('#break-length-value').html(`${breakLength_dynamycValue}`);
    });
    $('.break-length-increase').on('click', () => {
        breakLength_dynamycValue += 1;
        $('#break-length-value').html(`${breakLength_dynamycValue}`);
    });

    // decrease and inrease value of session length
    $('.session-length-decrease').on('click', () => {
        if (sessionLength_dynamycValue == 1)
            return;
        sessionLength_dynamycValue -= 1;
        $('#session-length-value').html(`${sessionLength_dynamycValue}`);
        $('#time').html(`${sessionLength_dynamycValue}:00`);
    });
    $('.session-length-increase').on('click', () => {
        sessionLength_dynamycValue += 1;
        $('#session-length-value').html(`${sessionLength_dynamycValue}`);
        $('#time').html(`${sessionLength_dynamycValue}:00`);
    });

    const handleClick = (isPaused, isRefreshed) => {
        if (isPaused) {
            isPauseClicked = true;
            return;
        } else if (isRefreshed) {
            isRefreshClicked = true;
            return;
        }

        //
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
        return;
    }

    //
    $('#start').on('click', () => {
        const stopwatch = setInterval(() => {
            /* if (!isPauseClicked) {
                 handleClick(null, null);
             } else if (isPauseClicked) {
                 clearInterval(stopwatch);
                 isPauseClicked = false;
             } else if (isRefreshClicked) {
                 $('#break-length-value').html(`${breakLength}`);
                 $('#session-length-value').html(`${sessionLength}`);
                 $('#time').html(`${sessionLength}:00`);
                 breakLength_dynamycValue = breakLength;
                 sessionLength_dynamycValue = sessionLength;
                 clearInterval(stopwatch);
                 isRefreshClicked = false;
             } */

            if (isPauseClicked) {
                clearInterval(stopwatch);
                isPauseClicked = false;
            } else if (isRefreshClicked) {
                clearInterval(stopwatch);
                $('#break-length-value').html(`${breakLength}`);
                $('#session-length-value').html(`${sessionLength}`);
                $('#time').html(`${sessionLength}:00`);
                breakLength_dynamycValue = breakLength;
                sessionLength_dynamycValue = sessionLength;
                isRefreshClicked = false;
            } else {
                handleClick(null, null);
            }
        }, 1000);
    });

    $('#pause').on('click', () => {
        handleClick(true, null)
    });

    $('#reset').on('click', () => {
        handleClick(null, true)
    });
});