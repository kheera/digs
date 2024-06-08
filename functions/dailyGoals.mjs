// this file will be used to ask the user to select a task and ask the question: "What are you doing for this task today?"
import {chooseTask} from "./chooseTask.mjs";
import {question} from "./question.mjs";

export async function dailyGoals(taskManager) {
    console.log("Okay, let's set some daily goals.");
    let setAnother;
    while (true) {
        // show task titles
        const task = await chooseTask(taskManager, "Choose which task to set a goal for:");
        console.log("Task: ", task.title);
        console.log("-----------------");
        // ask the user what they are doing for this task today
        const goal = await question('What are you doing for this task today? ');
        console.log("Goal set for", task.title, ":", goal);
        task.addGoal(goal);
        taskManager.saveToFile();

        setAnother = await question('Set another goal? (y/n): ');
        if (setAnother !== 'y') {
            break;
        }
    }
}