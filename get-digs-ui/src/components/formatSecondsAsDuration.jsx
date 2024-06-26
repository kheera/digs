/**
 * Convert number of seconds into hour, minute, and seconds
 * @param {number} secs number of seconds
 * @returns {string} returns the time in HH:MM:SS format
 */
export function formatSecondsAsDuration(secs) {
    let formatter = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 1,
        useGrouping: false
    })

    let hours = formatter.format(Math.floor(secs / 3600));
    let minutes = formatter.format(Math.floor((secs % 3600) / 60));

    let time = '';
    if (hours !== '0') {
        time += hours + 'h ';
    }
    if (minutes !== '0') {
        time += minutes + 'm ';
    }
    // if the string is empty show 0 seconds
    if (time === '') {
        time = '0s';
    }
    return time;
}