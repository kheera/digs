import { useEffect, useState } from 'react';
import {formatLocalDateTime} from "./formatLocalDateTime";
import {ActiveTimer} from "./ActiveTimer";
import {BackendApi} from "../services/BackendApi";
import {TimePicker} from "./TimePicker";
import {TimeDurationPicker} from "./TimeDurationPicker";

export function ShowTimer({ project, timer, setTimers }) {

    const [startTime, setStartTime] = useState(new Date(timer.startTime));
    const [endTime, setEndTime] = useState();

    // when they click time let them edit it
    const [editStartTime, setEditStartTime] = useState(false);
    const [editEndTime, setEditEndTime] = useState(false);

    function updateStartTime(startTime) {
        setStartTime(startTime);
        BackendApi().updateTimer(project.id, { ...timer, startTime })
            .then(res => {
                setTimers(res.timers);
                setEditStartTime(false);
            });
    }

    function updateTimer(timer) {
        console.log("Will update with new timer: ", timer);
    }

    function formatEndTime(startTime, duration) {
        const startDateTime = new Date(startTime);
        const endDateTime = new Date(startDateTime.getTime() + duration * 1000);
        return formatLocalDateTime(endDateTime);
    }

    /**
     * Convert number of seconds into hour, minute, and seconds
     * @param {number} secs number of seconds
     * @returns {string} returns the time in HH:MM:SS format
     */
    function formatTime(secs) {
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


    // handle stop timer
    const handleStopTimer = (timer) => {
        const currentDateTime = new Date();
        const startDateTime = new Date(timer.startTime);
        const diff = currentDateTime - startDateTime;
        timer.duration = Math.round(diff / 1000);
        BackendApi().updateTimer(project.id, timer)
            .then(res => {
                setTimers(res.timers);
            });
    };

    const handleDeleteTimer = (timer) => {
        BackendApi().deleteTimer(project.id, timer.id)
            .then(res => {
                setTimers(res.timers);
            });
    };

    return (
        <div className="tags has-addons" key={timer.id}>
            <button className="button is-danger is-light is-small" onClick={() => handleDeleteTimer(timer)}>
                <span className="icon is-small">
                    <i className="fas fa-trash"></i>
                </span>
            </button>
            {editStartTime ? (
                <TimePicker
                    dateTime={startTime}
                    updateTime={updateStartTime}
                />
            ) : (
                <span className="tag" onClick={() => setEditStartTime(!editStartTime)}>{formatLocalDateTime(startTime)}</span>
            )}
            {
                timer.duration ? (
                    editEndTime ? (
                        <TimeDurationPicker
                            timer={timer}
                            updateTime={updateTimer}
                        />
                    ) : (
                        <span onClick={() => setEditEndTime(!editEndTime)}>
                            <span className="tag"> - {formatEndTime(timer.startTime, timer.duration)}</span>
                            <span className="tag">{formatTime(timer.duration)}</span>
                        </span>
                    )
                ) : (
                    <button className={"button is-family-secondary"}
                            onClick={() => handleStopTimer(timer)}>Stop <span
                        className="tag"><ActiveTimer startTime={timer.startTime}/></span>
                    </button>
                )
            }
        </div>
    )
}