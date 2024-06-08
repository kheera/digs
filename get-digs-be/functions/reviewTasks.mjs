import {chooseTask} from "./chooseTask.mjs";
import {question} from "./question.mjs";

export async function reviewTasks(taskManager) {
    console.log("Okay, let's review the tasks.");
    let reviewAnother;
    while (true) {
        // show task titles
        const task = await chooseTask(taskManager, "Choose which task to review:");
        const taskTitle = task.title;
        let taskTitleBars = task.titleBars;
        // sort titlebars
        taskTitleBars.sort();
        console.log("Task: ", task.title);
        console.log("-----------------");
        // loop through titlebars and show 50 at a time
        let counter = 0;
        for (let taskTitleBar of taskTitleBars) {
            console.log('  ', counter, taskTitleBar);
            counter++;
            if (counter % 25 === 0) {
                const response = await question('Press enter to continue or q to quit: ');
                if (response === 'q') {
                    return;
                }
            }
        }

        // show recent goals for task
        task.showRecentGoals(10);

        reviewAnother = await question('Review another task? (y/n): ');
        if (reviewAnother !== 'y') {
            break;
        }
    }
}
