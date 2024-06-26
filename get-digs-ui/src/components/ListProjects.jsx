import { useState, useEffect } from 'react';
import { ShowProjectBrief } from './ShowProjectBrief';
import { AddNewProject } from './AddNewProject';

const global = {
    apiUri: process.env.REACT_APP_GET_DIGS_API_URI
};

export function ListProjects() {
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
            <AddNewProject show={showAddNewProject} setShow={setShowAddNewProject} setProjects={setProjects}/>
            <ul className="project-list">
                {projects.map(project => (
                    <ShowProjectBrief key={project.id} project={project}/>
                ))}
            </ul>
        </div>
    );
}