import { BackendApi } from "../services/BackendApi";
import { useEffect, useState } from "react";
import { ActiveTimer } from "./ActiveTimer";
import {formatLocalDateTime} from "./formatLocalDateTime";
import {TimePicker} from "./TimePicker";
import {ShowTimer} from "./ShowTimer";

// display timers in a card
export function ListTimers({ task }) {
    // get timers from the task
    const [timers, setTimers] = useState(task.timers);
    const [startTime, setStartTime] = useState(new Date());
    // if task changes
    useEffect(() => {
        setTimers(task.timers);
    }, [task]);

    // handle start timer button
    const handleStartTimer = () => {
        BackendApi().startTimer(task.id)
            .then(res => {
                setTimers(res.timers);
            });
    };

    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">Timers</p>
            </header>
            <div className="card-content">
                <button className="button is-primary" onClick={handleStartTimer}>Start Timer</button>
                {timers.map(timer => (
                    <ShowTimer
                        key={timer.id}
                        task={task}
                        timer={timer}
                        setTimers={setTimers}
                    />
                ))}
            </div>
        </div>
    );
}