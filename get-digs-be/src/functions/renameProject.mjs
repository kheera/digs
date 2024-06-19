import {chooseProject} from "./chooseProject.mjs";
import {question} from "./question.mjs";

export async function renameProject(projectManager) {
    console.log("Okay, let's rename a project.");
    const project = await chooseProject(projectManager, "Choose which project to rename:");
    console.log("Project: ", project.title);
    const newTitle = await question('Enter the new title: ');
    project.title = newTitle;
    projectManager.saveToFile();
}