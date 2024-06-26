import {useState, useEffect} from "react";
import {formatLocalDateTime} from "./formatLocalDateTime";

export function PickTime({ dateTime, updateTime }) {
    const [myDateTime, setMyDateTime] = useState(formatLocalDateTime(dateTime));
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // update my date time if dateTime changes
    useEffect(() => {
        setMyDateTime(formatLocalDateTime(dateTime));
    }, [dateTime]);


    // check if the date time is a valid date
    function isValidDateTime(dateTime) {
        console.log("Setting date time: ", dateTime);
        return dateTime instanceof Date && !isNaN(dateTime);
    }

    function handleChange(e) {
        const newDateTime = new Date(e.target.value + ' ' + currentYear);
        if (isValidDateTime(newDateTime)) {
            updateTime(newDateTime);
            e.target.style.backgroundColor = 'white';
        } else {
            e.target.style.backgroundColor = 'red';
        }
    }

    return (
        <>
            <input
                value={myDateTime}
                onChange={e => setMyDateTime(e.target.value)}
                onBlur={handleChange}
            /> {currentYear}
        </>
    )

}