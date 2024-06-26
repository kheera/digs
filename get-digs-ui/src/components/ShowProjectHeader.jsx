import {useEffect, useState} from "react";
import {BackendApi} from "../services/BackendApi";

export function ShowProjectHeader({project}) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const handleBlur = () => {
        setIsEditing(false);
        BackendApi().updateProjectTitle(project.id, title);
    };


    return (
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
                    <div className="card-header-title is-flex button left-align-button"
                         onClick={() => setIsEditing(true)}>
                        <span className="is-flex">{title}</span>
                        <span className="hidden-action icon">
                                <i className="fas fa-pencil-alt"></i>
                            </span>
                    </div>
                    <div
                        className="card-header-title is-flex is-justify-content-flex-end is-inline-flex no-margin-block-end">
                            <span className="icon flex">
                                <i className="fas fa-cog"></i>
                            </span>
                    </div>
                </>
            )}
        </header>
    );
}