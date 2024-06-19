import { BackendApi } from "../services/BackendApi";
import { useEffect, useState } from "react";
import { ActiveTimer } from "./ActiveTimer";
import {formatLocalDateTime} from "./formatLocalDateTime";
import {TimePicker} from "./TimePicker";
import {ShowTimer} from "./ShowTimer";

// display timers in a card
export function ListTimers({ project }) {
    // get timers from the project
    const [timers, setTimers] = useState(project.timers);
    const [startTime, setStartTime] = useState(new Date());
    // if project changes
    useEffect(() => {
        setTimers(project.timers);
    }, [project]);

    // handle start timer button
    const handleStartTimer = () => {
        BackendApi().startTimer(project.id)
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
                        project={project}
                        timer={timer}
                        setTimers={setTimers}
                    />
                ))}
            </div>
        </div>
    );
}