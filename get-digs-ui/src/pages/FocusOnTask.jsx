import {TaskDetailComponent} from "../components/TaskDetailComponent";
import {useParams} from "react-router-dom";
import {BackendApi} from "../services/BackendApi";
import {useState, useEffect} from "react";

export function FocusOnTask() {
    // get task id from the URL
    const {id} = useParams();

    const [task, setTask] = useState(null);
    // get task from the task manager
    useEffect(() => {
        BackendApi().getTask(id)
            .then(task => setTask(task));
    }, [id]);

    if (!task) {
        return <div>Task not found!</div>;
    }

    return (
        <section className="section my-2">
            <div className="content">
                <TaskDetailComponent task={task}/>
            </div>
        </section>
    )
}