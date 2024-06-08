export function BackendApi() {
    const global = {
        apiUri: process.env.REACT_APP_GET_DIGS_API_URI
    };

    return {
        getTasks: async function() {
            return fetch(global.apiUri + '/tasks')
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
        }
    };
}