export function BackendApi() {
    const global = {
        apiUri: process.env.REACT_APP_GET_DIGS_API_URI
    };

    return {
        getTasks: async function() {
            return fetch(global.apiUri + '/tasks')
                .then(res => res.json());
        },
        getTask: async function(id) {
            console.trace("Getting task");
            return fetch(`${global.apiUri}/task/${id}`)
                .then(res => res.json());
        },
        updateTaskTitle: async function(id, title) {
            console.log("Sending query to update task: ", id, title);
            return fetch(`${global.apiUri}/tasks/${id}/title`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title })
            })
                .then(res => res.json());
        }, // add new task
        addTask: async function(task) {
            return fetch(global.apiUri + '/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })
                .then(res => res.json());
        },
        startTimer: async function(taskId) {
            return fetch(`${global.apiUri}/task/${taskId}/timer`, {
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
        updateTimer: async function(taskId, timer) {
            return fetch(`${global.apiUri}/task/${taskId}/timer/${timer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(timer)
            })
                .then(res => res.json());
        },
        deleteTimer: async function(taskId, timerId) {
            return fetch(`${global.apiUri}/task/${taskId}/timer/${timerId}`, {
                method: 'DELETE'
            })
                .then(res => res.json());
        }
    };
}