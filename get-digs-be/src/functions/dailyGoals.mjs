// this file will be used to ask the user to select a project and ask the question: "What are you doing for this project today?"
import {chooseProject} from "./chooseProject.mjs";
import {question} from "./question.mjs";

export async function dailyGoals(projectManager) {
    console.log("Okay, let's set some daily goals.");
    let setAnother;
    while (true) {
        // show project titles
        const project = await chooseProject(projectManager, "Choose which project to set a goal for:");
        console.log("Project: ", project.title);
        console.log("-----------------");
        // ask the user what they are doing for this project today
        const goal = await question('What are you doing for this project today? ');
        console.log("Goal set for", project.title, ":", goal);
        project.addGoal(goal);
        projectManager.saveToFile();

        setAnother = await question('Set another goal? (y/n): ');
        if (setAnother !== 'y') {
            break;
        }
    }
}