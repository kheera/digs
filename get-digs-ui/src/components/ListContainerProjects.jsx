import { useState, useEffect } from 'react';
import { ProjectComponent } from './ProjectComponent';
import { AddNewProjectComponent } from './AddNewProjectComponent';

const global = {
    apiUri: process.env.REACT_APP_GET_DIGS_API_URI
};

export function ListContainerProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(global.apiUri + '/projects')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(data => setProjects(data))
    }, []);

    const [showAddNewProject, setShowAddNewProject] = useState(false);

    return (
        <div>
            <button
                style={{display: showAddNewProject ? 'none' : 'block'}}
                className="button is-primary" onClick={() => setShowAddNewProject(true)}>
                New Project</button>
            <AddNewProjectComponent show={showAddNewProject} setShow={setShowAddNewProject} setProjects={setProjects}/>
            <div className="project-list">
                {projects.map(project => (
                    <ProjectComponent key={project.id} project={project}/>
                ))}
            </div>
        </div>
    );
}