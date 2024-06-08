import React from 'react';
import { useState } from 'react';

export function ShowTitleBars({titleBars}) {
    // how many title bars to show
    const [titleBarShowCount, setTitleBarShowCount] = useState(5);
    const showMoreTitleBars = (count) => {
        setTitleBarShowCount(titleBarShowCount + count);
    };

    return (<>
        <div className="card-content">
            {titleBars.slice(0, titleBarShowCount).map(titleBar => (
                <div key={titleBar.id} className="tags has-addons">
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
    </>);
}

