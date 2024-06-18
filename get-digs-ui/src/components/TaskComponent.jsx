import { useState } from 'react';
import { ListTitleBars } from "./ListTitleBars";

export function TaskComponent({ task }) {
    const [title, setTitle] = useState(task.title);
    return (
        <section className="section my-2">
            <div className="content">
                <header className="show-hidden-action card-header is-flex">
                    <h3>
                        <a className="card-header-title is-flex" href={`/task/${task.id}`}>
                        {title}</a>
                    </h3>
                </header>
                <ListTitleBars task={task}/>
            </div>
        </section>
    );
}