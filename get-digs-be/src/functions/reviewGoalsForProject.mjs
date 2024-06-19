import {chooseProject} from "./chooseProject.mjs";
import {question} from "./question.mjs";

export async function reviewGoalsForProject(projectManager) {
    console.log("Okay, let's review the goals for a project.");
    let reviewAnother;
    while (true) {
        // show project titles
        const project = await chooseProject(projectManager, "Choose which project to review goals for:");
        const projectTitle = project.title;
        console.log("Project: ", project.title);
        console.log("-----------------");
        // loop through goals
        project.showRecentGoals(10);

        reviewAnother = await question('Review another project? (y/n): ');
        if (reviewAnother !== 'y') {
            break;
        }
    }
}