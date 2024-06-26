import {useState, useEffect} from "react";
import {formatLocalDateTime} from "./formatLocalDateTime";
import {formatEndTime} from "./formatEndTime";
import {formatSecondsAsDuration} from "./formatSecondsAsDuration";
import {PickTime} from "./PickTime";

export function PickTimeDuration({ timer, updateTimer }) {
    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();
    const [duration, setDuration] = useState();
    // show endTimePicker

    // when timer changes update the above
    useEffect(() => {
        const startDateTime = new Date(timer.startTime);
        // duration is in seconds, add it to the start date time
        const duration = timer.duration;
        const end = new Date(startDateTime.getTime() + duration * 1000);
        setStartDateTime(startDateTime);
        setEndDateTime(end);
        setDuration(duration);
    }, [timer]);


    // check if the date time is a valid date
    function isValidDateTime(dateTime) {
        return dateTime instanceof Date && !isNaN(dateTime);
    }

    // handle change
    function handleChange(e) {
        const newDateTime = new Date(e);
        if (isValidDateTime(newDateTime)) {
            // calc new duration
            const newDuration = Math.round((newDateTime - startDateTime) / 1000);
            setEndDateTime(e);
            setDuration(newDuration);
            // hide it
            timer.duration = newDuration;
            updateTimer(timer);
        }
    }

    return (
        <>
            <PickTime
                dateTime={endDateTime}
                updateTime={e => handleChange(e)}
            />
            <div style={{padding: '10px'}}> Duration: { formatSecondsAsDuration(duration) } </div>
        </>
    )

}