import { useState } from 'react';
import { ListTitleBars } from "./ListTitleBars";

export function ProjectComponent({ project }) {
    const [title, setTitle] = useState(project.title);
    return (
        <section className="section my-2">
            <div className="content">
                <header className="show-hidden-action card-header is-flex">
                    <h3>
                        <a className="card-header-title is-flex" href={`/project/${project.id}`}>
                        {title}</a>
                    </h3>
                </header>
                <ListTitleBars project={project}/>
            </div>
        </section>
    );
}