import {question} from "./question.mjs";

export async function chooseProject(projectManager, message) {
    // show project titles
    console.log(message);
    projectManager.getProjectTitles().forEach((project, index) => {
        console.log(`${index + 1}. ${project}`);
    });
    const choice = await question('Choose a project (number): ');
    return projectManager.getProjectByIndex(choice - 1);
}