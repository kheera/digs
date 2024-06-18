import { useState, useEffect } from "react";
import { BackendApi } from "../services/BackendApi";

export function AddNewTaskComponent({ show, setShow, setTasks }) {
    const [task, setTask] = useState({
        title: ''
    });

    // handle add task button
    const addTask = () => {
        console.log("Adding task", task);
        BackendApi().addTask(task)
            .then((updatedTaskList) => {
                console.log("Updated task list", updatedTaskList);
                setTasks(updatedTaskList);
            });
        setShow(false);
    };

    return (
        <div style={{display: show ? 'block' : 'none'}}>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input className="input" type="text"
                           placeholder="Task Title"
                           value={task.title}
                           onChange={e => setTask({title: e.target.value})}
                    />
                    <button className="button is-primary" onClick={addTask}>Add Task</button>
                </div>
            </div>
        </div>
    )

}