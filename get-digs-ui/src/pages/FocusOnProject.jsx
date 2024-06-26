import {ShowProject} from "../components/ShowProject";
import {useParams} from "react-router-dom";
import {BackendApi} from "../services/BackendApi";
import {useState, useEffect} from "react";

export function FocusOnProject() {
    // get project id from the URL
    const {id} = useParams();

    const [project, setProject] = useState(null);
    // get project from the project manager
    useEffect(() => {
        BackendApi().getProject(id)
            .then(project => setProject(project));
    }, [id]);

    if (!project) {
        return <div>Project not found!</div>;
    }

    return (
        <section className="section my-2">
            <div className="content">
                <ShowProject project={project}/>
            </div>
        </section>
    )
}