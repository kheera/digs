import { useEffect, useState } from "react";

export function ActiveTimer({ timer, project }) {
    const [timeElapsed, setTimeElapsed] = useState(0);

    const listOfFunTimePassingEmojis = [
        '🤪',
        '😜',
        '😎',
        '🤩',
        '🥳',
        '🎉',
        '🤓',
        '🥱',
        '😴',
        '😵',
        '🤢',
        '🎉🎉',
        '🛑'
    ];

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
        const startTime = timer.startTime;
        const interval = setInterval(() => {
            const currentTime = new Date();
            const st = new Date(startTime);
            const elapsedTime = Math.floor((currentTime - st) / 1000);
            setTimeElapsed(elapsedTime);
            let emojiIndex = Math.floor(elapsedTime / 60 / 10);
            // if we're out of emojis just keep the last one
            if (emojiIndex >= listOfFunTimePassingEmojis.length) {
                emojiIndex = listOfFunTimePassingEmojis.length - 1;
            }

            const selectedEmoji = listOfFunTimePassingEmojis[emojiIndex];
            document.title = `${selectedEmoji} ${formatTime(elapsedTime)} ${project.title}`

        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);


    return (
        <span>{formatTime(timeElapsed)}</span>
    );
}