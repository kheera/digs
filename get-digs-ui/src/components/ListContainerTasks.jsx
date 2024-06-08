import { useState, useEffect } from 'react';
import { TaskComponent } from './TaskComponent';

const global = {
    apiUri: process.env.REACT_APP_GET_DIGS_API_URI
};

export function ListContainerTasks() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch(global.apiUri + '/tasks')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(data => setTasks(data))
    }, []);
    return (
        <div>
            <div className="task-list">
                {tasks.map(task => (
                    <TaskComponent key={task.id} task={task}/>
                ))}
            </div>
        </div>
    );
}