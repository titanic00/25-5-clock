$(document).ready(function() {
    // set initial value for break length and session length
    let breakLength_initialValue = 5;
    let sessionLength_initialValue = 25;
    // view values on the web page
    $('#break-length-value').html(`${breakLength_initialValue}`);
    $('#session-length-value').html(`${sessionLength_initialValue}`);

    // decrease and inrease value of break length
    $('.break-length-decrease').on('click', () => {
        if (breakLength_initialValue == 1)
            return;
        breakLength_initialValue -= 1;
        $('#break-length-value').html(`${breakLength_initialValue}`);
    });
    $('.break-length-increase').on('click', () => {
        breakLength_initialValue += 1;
        $('#break-length-value').html(`${breakLength_initialValue}`);
    });

    // decrease and inrease value of session length
    $('.session-length-decrease').on('click', () => {
        if (sessionLength_initialValue == 1)
            return;
        sessionLength_initialValue -= 1;
        $('#session-length-value').html(`${sessionLength_initialValue}`);
    });
    $('.session-length-increase').on('click', () => {
        sessionLength_initialValue += 1;
        $('#session-length-value').html(`${sessionLength_initialValue}`);
    });
});