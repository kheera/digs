import { useState, useEffect } from 'react';
import { TaskComponent } from './TaskComponent';
import { AddNewTaskComponent } from './AddNewTaskComponent';

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

    const [showAddNewTask, setShowAddNewTask] = useState(false);

    return (
        <div>
            <button
                style={{display: showAddNewTask ? 'none' : 'block'}}
                className="button is-primary" onClick={() => setShowAddNewTask(true)}>
                New Task</button>
            <AddNewTaskComponent show={showAddNewTask} setShow={setShowAddNewTask} setTasks={setTasks}/>
            <div className="task-list">
                {tasks.map(task => (
                    <TaskComponent key={task.id} task={task}/>
                ))}
            </div>
        </div>
    );
}