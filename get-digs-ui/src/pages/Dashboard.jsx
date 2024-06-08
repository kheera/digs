import {HeroSection} from "../components/HeroSection";
import {ListContainerTasks} from "../components/ListContainerTasks";

export function Dashboard() {
    return (
        <div className="App">
            <HeroSection/>
            <section className="section my-2">
                <div className="content">
                    <h1>Tasks</h1>
                    <ListContainerTasks/>
                </div>
            </section>
            <footer className="footer my-2">
                <div className="content has-text-centered">
                    <p>© 2024 DIGS</p>
                </div>
            </footer>
        </div>
    )
}
