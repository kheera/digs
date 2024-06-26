import { useEffect, useState } from "react";
import { BackendApi } from "../services/BackendApi";

export function AddNewGoal({ project, updater }) {

    const [show, setShow] = useState(false);
    const [goal, setGoal] = useState('');

    const addGoal = () => {
        BackendApi().addGoal(project.id, goal)
            .then((res) => {
                updater('goals', res.goals);
                setGoal('');
            });
        setShow(false);
    }


    return (
        // if show is false show button
        (show === false) ?
            <button className="button is-primary" onClick={() => setShow(true)}>Add Goal</button>
        :
            <form style={{ display: 'inline-flex'}} onSubmit="{addGoal}">
                <input className="input" type="text"
                       placeholder="Goal"
                        value={goal}
                        onChange={e => setGoal(e.target.value)}
                />
                <button className="button is-primary" onClick={addGoal}>Add Goal</button>
            </form>
    );
}