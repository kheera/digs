import { Outlet } from 'react-router-dom';
import {HeroSection} from "../components/HeroSection";

export function LayoutMain() {
    return (
        <div>
            <HeroSection/>
            <header className="navbar is-light">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1 className="title">DIGS</h1>
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