import { useEffect, useState } from "react";

export function ActiveTimer({ startTime }) {
    const [timeElapsed, setTimeElapsed] = useState(0);

    /**
     * Convert number of seconds into hour, minute, and seconds
     * @param {number} secs number of seconds
     * @returns {string} returns the time in HH:MM:SS format
     */
    function formatTime(secs) {
        let formatter = new Intl.NumberFormat('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        let hours = formatter.format(Math.floor(secs / 3600));
        let minutes = formatter.format(Math.floor((secs % 3600) / 60));
        let seconds = formatter.format(secs % 60);

        let time = '';
        if (hours !== '00') {
            time += hours + ':';
        }
        if (minutes !== '00') {
            time += minutes + ':';
        }
        time += seconds;
        return time;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            const st = new Date(startTime);
            const elapsedTime = Math.floor((currentTime - st) / 1000);
            setTimeElapsed(elapsedTime);
            // update webpage title with time elapsed
            // document.title = `DIGS: ${formatTime(elapsedTime)} seconds`;
            document.title = `DIGS: ${formatTime(elapsedTime)}`;

        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);


    return (
        <span>{formatTime(timeElapsed)}</span>
    );
}