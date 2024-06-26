import {useEffect} from "react";
import {BackendApi} from "../services/BackendApi";

export function AddActiveTimer({project, setTimers}) {
    const handleStartTimer = () => {
        BackendApi().startTimer(project.id)
            .then(res => {
                setTimers(res.timers);
            });
    };

    return (
            <button className="button is-primary" onClick={handleStartTimer}>Start Timer</button>

    );
}