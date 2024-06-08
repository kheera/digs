import {chooseTask} from "./chooseTask.mjs";
import {question} from "./question.mjs";

export async function reviewGoalsForTask(taskManager) {
    console.log("Okay, let's review the goals for a task.");
    let reviewAnother;
    while (true) {
        // show task titles
        const task = await chooseTask(taskManager, "Choose which task to review goals for:");
        const taskTitle = task.title;
        console.log("Task: ", task.title);
        console.log("-----------------");
        // loop through goals
        task.showRecentGoals(10);

        reviewAnother = await question('Review another task? (y/n): ');
        if (reviewAnother !== 'y') {
            break;
        }
    }
}