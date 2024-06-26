import {ListProjects} from "../components/ListProjects";

export function Dashboard() {
    return (
        <section className="section my-2">
            <div className="content">
                <h1>Projects</h1>
                <ListProjects/>
            </div>
        </section>
    )
}
