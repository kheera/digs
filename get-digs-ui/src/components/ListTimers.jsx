import { useEffect, useState } from "react";
import { ShowTimer } from "./ShowTimer";
import { AddActiveTimer } from "./AddActiveTimer";

// display timers in a card
export function ListTimers({ project }) {
    // get timers from the project
    const [timers, setTimers] = useState([]);
    function setSortedTimers(timers) {
        const timersInReverseTimeOrder = timers.sort((a, b) => {
            return new Date(b.startTime) - new Date(a.startTime);
        });
        setTimers(timersInReverseTimeOrder);
    }

    // if project changes
    useEffect(() => {
        setSortedTimers(project.timers)
    }, [project]);

    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">Timers</p>
            </header>
            <div className="card-content">
                <AddActiveTimer
                    project={project}
                    setTimers={setSortedTimers}
                />
                {timers.map(timer => (
                    <ShowTimer
                        key={timer.id}
                        project={project}
                        timer={timer}
                        setTimers={setSortedTimers}
                    />
                ))}
            </div>
        </div>
    );
}