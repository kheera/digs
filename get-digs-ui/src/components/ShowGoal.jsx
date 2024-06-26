import {useState} from "react";
import {formatLocalDateTime} from "./formatLocalDateTime";

export function ShowGoal({ goal }) {
    return (<div className="tags has-addons" key={goal.id}> { console.log('showing goal', goal)}
        <span className="tag is-info">{formatLocalDateTime(goal.dateTime)}</span>
        <span className="tag">{goal.description}</span>
    </div>)
}