import {useEffect, useState} from "react";
import {BackendApi} from "../services/BackendApi";
import {ShowGearMenu} from "./ShowGearMenu";

export function ShowProjectHeader({project}) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const handleBlur = () => {
        setIsEditing(false);
        BackendApi().updateProjectTitle(project.id, title);
    };

    // function to delete project
    const handleDeleteProject = () => {
        console.log("Deleting project", project.id);
        BackendApi().deleteProject(project.id)
            .then(res => {
                console.log("Deleted project", res);
                window.location.href = '/';
            });
    };

    const menuItems = [{
        name: '🗑️ Delete',
        confirm: true,
        action: () => handleDeleteProject()
    }]


    return (
        <header className="show-hidden-action card-header is-hoverable is-flex" style={{ height: '50px'}}>
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
                    <ShowGearMenu menuItems={menuItems}/>
                </>
            )}
        </header>
    );
}