import { useState } from 'react';
import { ListTitleBars } from "./ListTitleBars";

export function ShowProjectBrief({ project }) {
    const [title, setTitle] = useState(project.title);
    // search for active timers
    const [activeTimers, setActiveTimers] = useState(project.timers.filter(timer => !timer.duration).length > 0);

    return (
        <li> <a className="card-header-title is-flex" href={`/project/${project.id}`}>
            {(activeTimers) && <span style={{ color: 'red' }}>🕗</span>}
            {title}</a>
        </li>
    );
}