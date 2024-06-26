export function BackendApi() {
    const global = {
        apiUri: process.env.REACT_APP_GET_DIGS_API_URI
    };

    return {
        getProjects: async function() {
            return fetch(global.apiUri + '/projects')
                .then(res => res.json());
        },
        addProject: async function(project) {
            return fetch(global.apiUri + '/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            })
                .then(res => res.json());
        },
        getProject: async function(id) {
            console.trace("Getting project");
            return fetch(`${global.apiUri}/project/${id}`)
                .then(res => res.json());
        },
        updateProjectTitle: async function(id, title) {
            console.log("Sending query to update project: ", id, title);
            return fetch(`${global.apiUri}/project/${id}/title`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title })
            })
                .then(res => res.json());
        }, // add new project
        startTimer: async function(projectId) {
            return fetch(`${global.apiUri}/project/${projectId}/timer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ startTime: new Date() })
            })
                .then(res => {
                    return res.json();
                }   );
        },
        updateTimer: async function(projectId, timer) {
            return fetch(`${global.apiUri}/project/${projectId}/timer/${timer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(timer)
            })
                .then(res => res.json());
        },
        deleteTimer: async function(projectId, timerId) {
            return fetch(`${global.apiUri}/project/${projectId}/timer/${timerId}`, {
                method: 'DELETE'
            })
                .then(res => res.json());
        },
        addGoal: async function(projectId, description) {
            return fetch(`${global.apiUri}/project/${projectId}/goal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: description })
            })
                .then(res => res.json());
        }
    };
}