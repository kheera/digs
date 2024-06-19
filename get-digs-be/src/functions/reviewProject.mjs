import {chooseProject} from "./chooseProject.mjs";
import {question} from "./question.mjs";

export async function reviewProject(projectManager) {
    console.log("Okay, let's review the projects.");
    let reviewAnother;
    while (true) {
        // show project titles
        const project = await chooseProject(projectManager, "Choose which project to review:");
        const projectTitle = project.title;
        let projectTitleBars = project.titleBars;
        // sort titlebars
        projectTitleBars.sort();
        console.log("Project: ", project.title);
        console.log("-----------------");
        // loop through titlebars and show 50 at a time
        let counter = 0;
        for (let projectTitleBar of projectTitleBars) {
            console.log('  ', counter, projectTitleBar);
            counter++;
            if (counter % 25 === 0) {
                const response = await question('Press enter to continue or q to quit: ');
                if (response === 'q') {
                    return;
                }
            }
        }

        // show recent goals for project
        project.showRecentGoals(10);

        reviewAnother = await question('Review another project? (y/n): ');
        if (reviewAnother !== 'y') {
            break;
        }
    }
}
