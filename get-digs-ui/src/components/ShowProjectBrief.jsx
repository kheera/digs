import { useState } from 'react';
import { ListTitleBars } from "./ListTitleBars";

export function ShowProjectBrief({ project }) {
    const [title, setTitle] = useState(project.title);
    return (
        <li> <a className="card-header-title is-flex" href={`/project/${project.id}`}>
            {title}</a>
        </li>
    );
}