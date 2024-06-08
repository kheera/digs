import { useState } from 'react';
import { ShowTitleBars } from "./ShowTitleBars";

export function TaskComponent({ task }) {
    const [title, setTitle] = useState(task.title);
    return (
        <div className="card my-2">
        <header className="show-hidden-action card-header is-flex">
            <a className="card-header-title is-flex" href={`/task/${task.id}`}>
                <span className="is-flex">{title}</span>
            </a>
        </header>
        <ShowTitleBars titleBars={task.titleBars} />
        </div>
    );
}