import { useEffect, useState } from "react";
import { BackendApi } from "../services/BackendApi";

export function AddNewGoalComponent({ project, show, setShow, setGoals }) {
    const [goal, setGoal] = useState('');

    const addGoal = () => {
        console.log("Adding goal", goal);
        BackendApi().addGoal(project.id, goal)
            .then((updatedGoalList) => {
                console.log("Updated goal list", updatedGoalList);
                setGoals(updatedGoalList.goals);
            });
        setShow(false);
    }


    return (<div className="card-content" style={{display: show ? 'block' : 'none'}}>
        <div className="field">
            <label className="label">Goal</label>
            <div className="control">
                <input className="input" type="text"
                       placeholder="Goal"
                       value={goal}
                       onChange={e => setGoal(e.target.value)}
                />
                <button className="button is-primary" onClick={addGoal}>Add Goal</button>
            </div>
        </div>
    </div>)
}