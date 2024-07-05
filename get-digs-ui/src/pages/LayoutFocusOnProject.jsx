import { Outlet } from 'react-router-dom';
import {ShowHeroSection} from "../components/ShowHeroSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function LayoutFocusOnProject() {
    return (
        <div>
            <header className="navbar is-light" style={{ padding: '0.5rem 1.25rem' }}>
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1 className="title hover ">
                            <FontAwesomeIcon icon={faArrowLeft} /> BACK TO DIGS
                        </h1>
                    </a>
                </div>
            </header>
            <Outlet />
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>© 2024 DIGS</p>
                </div>
            </footer>
        </div>
    );
}