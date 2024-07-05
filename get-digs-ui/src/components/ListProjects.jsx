import { useState, useEffect } from 'react';
import { ShowProjectBrief } from './ShowProjectBrief';
import { AddNewProject } from './AddNewProject';

const global = {
    apiUri: process.env.REACT_APP_GET_DIGS_API_URI
};

export function ListProjects() {
    const [projects, setProjects] = useState([]);
    const [activeTimers, setActiveTimers] = useState([]);

    useEffect(() => {
        fetch(global.apiUri + '/projects')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(data => setProjects(data))
    }, []);

    const [showAddNewProject, setShowAddNewProject] = useState(false);

    // when projects changes loop through and look for any active timers
    // if no duration then it is active
    useEffect(() => {
        const activeTimers = projects.filter(project => {
            return project.timers.filter(timer => !timer.duration).length > 0;
        });
        setActiveTimers(activeTimers);
    }, [projects]);

    return (
        <div>
            <button
                style={{display: showAddNewProject ? 'none' : 'block'}}
                className="button is-primary" onClick={() => setShowAddNewProject(true)}>
                New Project
            </button>
            <AddNewProject show={showAddNewProject} setShow={setShowAddNewProject} setProjects={setProjects}/>

            {(activeTimers.length > 0) && <>
                    <h2>Active Timers:</h2>
                    <ul>
                        {activeTimers.map(project => (
                            <ShowProjectBrief key={project.id} project={project}/>
                        ))}
                    </ul>
                </>
            }

            <h2>Projects</h2>
            <ul className="project-list">
                {projects.map(project => (
                    <ShowProjectBrief key={project.id} project={project}/>
                ))}
            </ul>
        </div>
    );
}