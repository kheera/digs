import {chooseTask} from "./chooseTask.mjs";
import {question} from "./question.mjs";

export async function renameTask(taskManager) {
    console.log("Okay, let's rename a task.");
    const task = await chooseTask(taskManager, "Choose which task to rename:");
    console.log("Task: ", task.title);
    const newTitle = await question('Enter the new title: ');
    task.title = newTitle;
    taskManager.saveToFile();
}