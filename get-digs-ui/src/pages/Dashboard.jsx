import {ListContainerTasks} from "../components/ListContainerTasks";

export function Dashboard() {
    return (
        <section className="section my-2">
            <div className="content">
                <h1>Tasks</h1>
                <ListContainerTasks/>
            </div>
        </section>
    )
}
