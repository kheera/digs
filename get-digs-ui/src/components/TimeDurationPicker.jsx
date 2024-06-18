import {useState, useEffect} from "react";
import {formatLocalDateTime} from "./formatLocalDateTime";

export function TimeDurationPicker({ timer, updateTimer }) {
    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();
    const [duration, setDuration] = useState();

    // when timer changes update the above
    useEffect(() => {
        const start = new Date(timer.startTime);
        const duration = timer.duration;
        const end = start + duration * 1000;
        setStartDateTime(formatLocalDateTime(start));
        setEndDateTime(new Date(end));
        setDuration(timer.duration);
    }, [timer]);

    // check if the date time is a valid date
    function isValidDateTime(dateTime) {
        return dateTime instanceof Date && !isNaN(dateTime);
    }

    function handleChange(e) {
        const newDateTime = new Date(e.target.value);
        if (isValidDateTime(newDateTime)) {
            updateTimer(newDateTime);
            e.target.style.backgroundColor = 'white';
        } else {
            e.target.style.backgroundColor = 'red';
        }
    }

    return (
        <>
            {/*<input*/}
            {/*    value={myDateTime}*/}
            {/*    onChange={e => setMyDateTime(e.target.value)}*/}
            {/*    onBlur={handleChange}*/}
            {/*/>*/}
            <div> Start: { startDateTime } </div>
            <div> End: { endDateTime } </div>
            <div> Duration: { duration } </div>
        </>
    )

}