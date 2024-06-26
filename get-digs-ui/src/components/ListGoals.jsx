import { useEffect, useState } from 'react';
import { AddNewGoal} from "./AddNewGoal";
import { ShowGoal } from "./ShowGoal";

export function ListGoals({ project }) {
    const [goals, setGoals] = useState([]);
    const [goalShowCount, setGoalShowCount] = useState(5);

    useEffect(() => {
        let goals = [];
        // if goals is an array
        if (Array.isArray(project.goals)) {
            goals = project.goals;
        } else {
            goals = Object.values(project.goals);
        }
        sortGoals(goals);
        setGoals(goals);

    }, [project]);

    const sortGoals = (goals) => {
        goals.sort((a, b) => a.id < b.id ? 1 : -1);
    }

    const updateGoals = (newGoals) => {
        sortGoals(newGoals);
        setGoals(newGoals);
    }

    const showMoreGoals = (count) => {
        setGoalShowCount(goalShowCount + count);
    };

    return (<div className="card">
        <div className="card-header">
            <p className="card-header-title">Goals</p>
        </div>
        <div className="card-content">


            {goals.slice(0, goalShowCount).map(goal => (
                <ShowGoal key={goal.id} goal={goal} />
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