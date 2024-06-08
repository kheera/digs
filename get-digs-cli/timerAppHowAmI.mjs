import dotenv from 'dotenv';
import { TaskManager } from '../get-digs-be/classes/TaskManager.mjs';
import { dailyGoals } from "../get-digs-be/functions/dailyGoals.mjs";
import { inputLogFile } from '../get-digs-be/functions/inputLogFile.mjs';
import { logActiveWindow } from "../get-digs-be/functions/logActiveWindow.mjs";
import { question } from '../get-digs-be/functions/question.mjs';
import { renameTask } from "../get-digs-be/functions/renameTask.mjs";
import { reviewTaskLog } from "../get-digs-be/functions/reviewTaskLog.mjs";
import { reviewTasks } from "../get-digs-be/functions/reviewTasks.mjs";
import { showHoursForTask } from "../get-digs-be/functions/showHoursForTask.mjs";
import { takeScreenshot } from "../get-digs-be/functions/takeScreenshot.mjs";
import { reviewGoalsForTask } from "../get-digs-be/functions/reviewGoalsForTask.mjs";
import { chooseTask } from "../get-digs-be/functions/chooseTask.mjs";
import { manageTask } from "../get-digs-be/classes/TaskManager.mjs";
import path from "path";

const activeWindowLog = 'active-window.log';
const options = [
    { name: 'Manage Tasks', action: manageTask, labels: ['manage'] },
    { name: 'Start activity log', action: logTimeLoop, labels: ['timer'] },
    { name: 'Stop activity log ', action: cancelLogTimeLoop, labels: ['timer'] },
    { name: 'Start task timer', action: startTaskTimer, labels: ['timer'] },
    { name: 'Stop task timer', action: stopTaskTimer, labels: ['timer'] },
    { name: 'Show Timer', action: showTaskTimer, labels: ['timer']},
    { name: 'Delete Timer', action: deleteTaskTimer, labels: ['timer']},

    { name: 'Set daily goals', action: dailyGoals, labels: ['goals'] },
    { name: 'Review Goals for Task', action: reviewGoalsForTask, labels: ['goals'] },
    { name: 'Load tasks from logfile into Tasks DB', action: inputLogFile, labels: ['tasks'] },
    { name: 'Review Tasks', action: reviewTasks, labels: ['tasks'] },
    { name: 'Rename Task', action: renameTask, labels: ['tasks'] },
    { name: 'Review Task Log', action: reviewTaskLog, labels: ['tasks'] },
    { name: 'Show Hours for Task', action: showHoursForTask, labels: ['tasks'] },
]

let cancelTimeLoop = false;
let mostRecentLogEntry = false;

async function logTimeLoop() {
    let lockedWindowTitles = [];

    console.log("Logging time loop started");
    mostRecentLogEntry = await logActiveWindow();
    await takeScreenshot();
    // every 2 minutes take screenshots
    // log active window then take screenshots, do it every 2 minutes.
    cancelTimeLoop = setInterval(async () => {
        console.log("Logging time...");
        mostRecentLogEntry= await logActiveWindow();
        if (!lockedWindowTitles.includes(mostRecentLogEntry.titleBar)) {
            await takeScreenshot();
        }
    }, 1000 * 60 * 2);
}

function cancelLogTimeLoop() {
    clearInterval(cancelTimeLoop);
}

async function startTaskTimer(taskManager) {
    console.log("Starting task timer");
    const task = await chooseTask(taskManager, "Choose which task to start timer for:");
    task.startTimer();
    // started time for task
    await taskManager.saveToFile();
    console.log("Task timer started for ", task.title);
    // show timers
    task.showTimers();
}

async function stopTaskTimer(taskManager) {
    console.log("Stopping task timer");
    const task = await chooseTask(taskManager, "Choose which task to stop timer for:");
    task.stopTimer();
    await taskManager.saveToFile();
    console.log("Task timer stopped for ", task.title);
    // show timers
    task.showTimers();
}

async function showTaskTimer(taskManager) {
    console.log("Showing task timer");
    const task = await chooseTask(taskManager, "Choose which task to show timer for:");
    task.showTimers();
}

// delete timer
async function deleteTaskTimer(taskManager) {
    console.log("Deleting task timer");
    const task = await chooseTask(taskManager, "Choose which task to delete timer for:");
    // show timers
    task.showTimers();
    // ask which one to delete
    const timerToDelete = await question("Which timer to delete? ");
    task.deleteTimer(timerToDelete-1);
    await taskManager.saveToFile();
    console.log("Task timer deleted for ", task.title);
    // show timers
    task.showTimers();

}

async function main() {
    dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
    // sort options by label
    options.sort((a, b) => {
        if (a.labels && b.labels) {
            return a.labels[0].localeCompare(b.labels[0]);
        }
    });
    let logFile = process.env.ACTIVE_WINDOW_LOG;
    while (true) {
        // get date from most recent log file entry

        const taskManager = new TaskManager();
        await taskManager.loadFromFile();
        // clear a 5 lines
        console.log("\n\n\n\n\n");
        if (mostRecentLogEntry) {
            console.log("Logging to: ", logFile);
            console.log("Last log entry: ", mostRecentLogEntry.date, mostRecentLogEntry.titleBar);
            console.log("");
        }
        console.log("Choose an option: ");
        // show options with each labels as a sections
        let lastLabel = '';
        options.forEach((option, index) => {
            if (option.labels && option.labels[0] !== lastLabel) {
                lastLabel = option.labels[0];
                // uppercase and underlined
                console.log(`\n${lastLabel.toUpperCase()}\n${'-'.repeat(lastLabel.length)}`);
            }
            console.log(`   ${index + 1}. ${option.name}`);
        });
        const choice = await question('Enter your choice: ');
        const selectedOption = options[choice - 1];
        if (selectedOption) {
            await selectedOption.action(taskManager);
        }

        // continue or exit?
        const continueOrExit = await question('Press q to quit or any other key to continue: ');
        if (continueOrExit === 'q') {
            break;
        }
    }
};

main();
