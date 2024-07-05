import { useState } from 'react';

export function ShowGearMenu({ menuItems }) {
    const [isActive, setIsActive] = useState(false);

    console.log('menuItems', menuItems);
    function confirm(item) {
        if (window.confirm('Are you sure?')) {
            item.action();
        }
        setIsActive(false);
    }
    return (
        <div
            className="card-header-title is-flex is-justify-content-flex-end is-inline-flex no-margin-block-end dropdown"
            style={{position: 'relative'}}
        >
            <span className="icon flex" onClick={() => setIsActive(!isActive)}>
                <i className="fas fa-cog"></i>
            </span>
            {isActive && (
                <div className="menu" style={{position: 'absolute', top: '50px', right: '0', backgroundColor: 'lightgrey'}}>
                    {menuItems.map((item, index) => (
                        <div key={index} className="menu-item" style={{padding: '5px', width: '100px'}} onClick={() => confirm(item)}>
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}