import { useState } from 'react';
import { BackendApi} from "../services/BackendApi";
import { ListTitleBars } from "./ListTitleBars";
import { ListTimers } from "./ListTimers";
import { ListGoals } from "./ListGoals";

export function TaskDetailComponent({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const handleBlur = () => {
        setIsEditing(false);
        BackendApi().updateTaskTitle(task.id, title);
    };

    return (
        <div className="card my-2">
            <header className="show-hidden-action card-header is-hoverable is-flex">
                {isEditing ? (
                    <input
                        className="input"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={() => handleBlur()}
                    />
                ) : (
                    <>
                        <p className="card-header-title is-flex"
                           onClick={() => setIsEditing(true)}>
                            <span className="is-flex">{title}</span>
                            <span className="hidden-action icon">
                                <i className="fas fa-pencil-alt"></i>
                            </span>
                        </p>
                        <p className="card-header-title is-flex is-justify-content-flex-end is-inline-flex no-margin-block-end">
                            <span className="icon flex">
                                <i className="fas fa-cog"></i>
                            </span>
                        </p>
                    </>
                )}
            </header>
            <div className="card-content">
                <ListTimers task={task} />
                <ListGoals task={task} />
                <ListTitleBars task={task} />
            </div>
        </div>
    );
}