import { useEffect, useState } from 'react';
import { AddNewGoalComponent} from "./AddNewGoalComponent";

export function ListGoals({ project }) {
    const [goals, setGoals] = useState(['asdf', 'fasdf']);
    const [goalShowCount, setGoalShowCount] = useState(5);
    const [showNewGoalComponent, setShowNewGoalComponent] = useState(false);

    useEffect(() => {
        // if goals is an array
        if (Array.isArray(project.goals)) {
            setGoals(project.goals);
            console.log("setting goals for project ", project.title);
            console.log("The new goals are: ", project.goals);
        } else if (typeof project.goals === 'object') {
            // turn into an array
            setGoals(Object.values(project.goals));
        }
    }, [project]);

    const showMoreGoals = (count) => {
        setGoalShowCount(goalShowCount + count);
    };

    return (<div className="card">
        <div className="card-header">
            <p className="card-header-title">Goals</p>
        </div>
        <button className="button is-primary" onClick={() => setShowNewGoalComponent(true)}>Add Goal</button>
        <AddNewGoalComponent
            show={showNewGoalComponent}
            setShow={setShowNewGoalComponent}
            setGoals={setGoals}
            project={project}
        />

        <div className="card-content">
            {goals.slice(0, goalShowCount).map(goal => (
                <div className="tags has-addons" key={goal.id}>
                    <span className="tag">{ goal.description }</span>
                    <span><i className="fas fa-circle-nodes"></i></span>
                </div>
            ))}
        </div>
        {goals.length > goalShowCount && (
            <footer className="card-footer has-text-link" onClick={() => showMoreGoals(5)}>
                <p className="card-footer-item">
                    <span>
                        <span className="icon">
                            <i className="fas fa-plus"></i>
                        </span>
                        Show More: ({goals.length - goalShowCount} are hidden)
                    </span>
                </p>
            </footer>
        )}
    </div>);
}