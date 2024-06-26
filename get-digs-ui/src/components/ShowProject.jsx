import {useEffect, useState} from "react";
import { ListTimers } from "./ListTimers";
import { ListGoals } from "./ListGoals";
import { ShowGoal } from "./ShowGoal";
import { ShowProjectHeader } from "./ShowProjectHeader";
import { ShowTimer } from "./ShowTimer";
import { AddActiveTimer } from "./AddActiveTimer";
import { ShowIntermingledItem } from "./ShowIntermingledItem";
import {AddNewGoal} from "./AddNewGoal";

export function ShowProject({ project }) {
    // I want to create an array that intermingles the timers and goals
    // so that they are displayed in the order they were created
    const [intermingled, setIntermingled] = useState([])
    const [timers, setTimers] = useState(project.timers);
    const [goals, setGoals] = useState(project.goals);

    useEffect(() => {
        const combined = timers.concat(goals)
        const sorted = combined.sort((a, b) => {
            const aTime = new Date(a.startTime || a.dateTime);
            const bTime = new Date(b.startTime || b.dateTime);
            return bTime - aTime;
        })
        // if the id 'g-' it's a goal. if it starts with tmr- it's a timer
        setIntermingled(sorted);
        console.log("Intermingled", intermingled);
    }, [timers, goals]);

    useEffect(() => {
        setTimers(project.timers);
        setGoals(project.goals);
    }, [project.timers, project.goals]);

    function updater(listType, updatedList) {
        if (listType === 'goals') {
            console.log("Updating goals", updatedList);
            setGoals(updatedList);
        } else if (listType === 'timers') {
            console.log("Updating timers", updatedList);
            setTimers(updatedList);
        }
    }

    return (
        <div className="card my-2">
            <ShowProjectHeader project={project}/>
            <div className="card-content">
                <div className="buttons">
                    <AddActiveTimer project={project} setTimers={setTimers} />
                    <AddNewGoal project={project} updater={updater} />
                </div>
                {intermingled.map(item => {
                    return <ShowIntermingledItem
                        key={item.id}
                        project={project}
                        item={item}
                        updater={updater}
                    />
                })}
            </div>
        </div>
    );
}