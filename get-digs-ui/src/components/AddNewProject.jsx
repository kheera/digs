import { useState, useEffect } from "react";
import { BackendApi } from "../services/BackendApi";

export function AddNewProject({ show, setShow, setProjects }) {
    const [project, setProject] = useState({
        title: ''
    });

    // handle add project button
    const addProject = () => {
        console.log("Adding project", project);
        BackendApi().addProject(project)
            .then((updatedProjectList) => {
                console.log("Updated project list", updatedProjectList);
                setProjects(updatedProjectList);
            });
        setShow(false);
    };

    return (
        <div style={{display: show ? 'block' : 'none'}}>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input className="input" type="text"
                           placeholder="Project Title"
                           value={project.title}
                           onChange={e => setProject({title: e.target.value})}
                    />
                    <button className="button is-primary" onClick={addProject}>Add Project</button>
                </div>
            </div>
        </div>
    )

}