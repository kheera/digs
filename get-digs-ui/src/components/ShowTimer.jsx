import { useEffect, useState } from 'react';
import {formatLocalDateTime} from "./formatLocalDateTime";
import {ActiveTimer} from "./ActiveTimer";
import {BackendApi} from "../services/BackendApi";
import {PickTime} from "./PickTime";
import {PickTimeDuration} from "./PickTimeDuration";
import {formatEndTime} from "./formatEndTime";
import {formatSecondsAsDuration} from "./formatSecondsAsDuration";

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
        BackendApi().updateTimer(project.id, timer)
            .then(res => {
                setTimers(res.timers);
                setEditEndTime(false);
            });
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
                <PickTime
                    dateTime={startTime}
                    updateTime={updateStartTime}
                />
            ) : (
                <span className="tag" onClick={() => setEditStartTime(!editStartTime)}>{formatLocalDateTime(startTime)}</span>
            )}
            {
                timer.duration ? (
                    editEndTime ? (
                        <PickTimeDuration
                            project={project}
                            timer={timer}
                            updateTimer={updateTimer}
                        />
                    ) : (
                        <span onClick={() => setEditEndTime(!editEndTime)}>
                            <span className="tag"> - {formatEndTime(timer.startTime, timer.duration)}</span>
                            <span className="tag">{formatSecondsAsDuration(timer.duration)}</span>
                        </span>
                    )
                ) : (<>
                        <ActiveTimer
                            project={project}
                            timer={timer}/>
                        <button className={"button is-family-secondary"}
                                onClick={() => handleStopTimer(timer)}>Stop
                        </button>
                    </>

                )
            }
        </div>
    )
}