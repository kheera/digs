import {useState} from "react";
import {ShowGoal} from "./ShowGoal";
import {ShowTimer} from "./ShowTimer";

export function ShowIntermingledItem({item, project, updater}) {
    function setGoals(goals) {
        console.log("Setting goals", goals);
        updater('goals', goals);
    }

    function setTimers(timers) {
        console.log("Setting timers", timers);
        updater('timers', timers);
    }

    return (
        item.id.startsWith('g-') ?
            <ShowGoal
                key={item.id}
                project={project}
                goal={item}
                setGoals={setGoals}
                item={item}
                updater={updater}
            />
        : item.id.startsWith('tmr-') &&
            <ShowTimer
                key={item.id}
                project={project}
                timer={item}
                setTimers={setTimers}
                item={item}
                updater={updater}
            />
    );

}