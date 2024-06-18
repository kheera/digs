import { useState, useEffect } from 'react';

export function ListTitleBars({task}) {
    const [titleBars, setTitleBars] = useState(task ? task.titleBars : []);
    // how many title bars to show
    const [titleBarShowCount, setTitleBarShowCount] = useState(5);

    // if task changes, update title bars
    useEffect(() => {
        console.log("Updating title bars", task);
        setTitleBars(task.titleBars || []);
    }, [task]);



    const showMoreTitleBars = (count) => {
        setTitleBarShowCount(titleBarShowCount + count);
    };

    return (<div className="card">
        <div className="card-header">
            <p className="card-header-title">Title Bars</p>
        </div>
        <div className="card-content">
            {titleBars.slice(0, titleBarShowCount).map(titleBar => (
                <div key={titleBar} className="tags has-addons">
                    <span className="tag">{titleBar}</span>
                    <span><i className="fas fa-circle-nodes"></i></span>
                </div>
            ))}
        </div>
        {titleBars.length > titleBarShowCount && (
            <footer className="card-footer has-text-link"  onClick={() => showMoreTitleBars(20)}>
                <p className="card-footer-item">
                    <span>
                        <span className="icon">
                            <i className="fas fa-plus"></i>
                        </span>
                        Show More: ({titleBars.length - titleBarShowCount} are hidden)
                    </span>
                </p>
            </footer>
        )}
    </div>);
}

