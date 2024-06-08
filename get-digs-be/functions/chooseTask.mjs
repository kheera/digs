import {question} from "./question.mjs";

export async function chooseTask(taskManager, message) {
    // show task titles
    console.log(message);
    taskManager.getTaskTitles().forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
    const choice = await question('Choose a task (number): ');
    return taskManager.getTaskByIndex(choice - 1);
}