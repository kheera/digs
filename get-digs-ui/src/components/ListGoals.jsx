import { useEffect, useState } from 'react';

export function ListGoals({ task }) {
    const [goals, setGoals] = useState(['asdf', 'fasdf']);
    const [goalShowCount, setGoalShowCount] = useState(5);

    useEffect(() => {
        // if goals is an array
        if (Array.isArray(task.goals)) {
            setGoals(task.goals);
            console.log("setting goals for task ", task.title);
            console.log("The new goals are: ", task.goals);
        } else if (typeof task.goals === 'object') {
            // turn into an array
            setGoals(Object.values(task.goals));
        }
    }, [task]);

    const showMoreGoals = (count) => {
        setGoalShowCount(goalShowCount + count);
    };

    return (<div className="card">
        <div className="card-header">
            <p className="card-header-title">Goals</p>
        </div>
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