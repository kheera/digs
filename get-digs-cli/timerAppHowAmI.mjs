import dotenv from 'dotenv';
import { ProjectManager } from '../get-digs-be/classes/ProjectManager.mjs';
import { dailyGoals } from "../get-digs-be/functions/dailyGoals.mjs";
import { inputLogFile } from '../get-digs-be/functions/inputLogFile.mjs';
import { logActiveWindow } from "../get-digs-be/functions/logActiveWindow.mjs";
import { question } from '../get-digs-be/functions/question.mjs';
import { renameProject } from "../get-digs-be/functions/renameProject.mjs";
import { reviewProjectLog } from "../get-digs-be/functions/reviewProjectLog.mjs";
import { reviewProjects } from "../get-digs-be/functions/reviewProjects.mjs";
import { showHoursForProject } from "../get-digs-be/functions/showHoursForProject.mjs";
import { takeScreenshot } from "../get-digs-be/functions/takeScreenshot.mjs";
import { reviewGoalsForProject } from "../get-digs-be/functions/reviewGoalsForProject.mjs";
import { chooseProject } from "../get-digs-be/functions/chooseProject.mjs";
import { manageProject } from "../get-digs-be/classes/ProjectManager.mjs";
import path from "path";

const activeWindowLog = 'active-window.log';
const options = [
    { name: 'Manage Projects', action: manageProject, labels: ['manage'] },
    { name: 'Start activity log', action: logTimeLoop, labels: ['timer'] },
    { name: 'Stop activity log ', action: cancelLogTimeLoop, labels: ['timer'] },
    { name: 'Start project timer', action: startProjectTimer, labels: ['timer'] },
    { name: 'Stop project timer', action: stopProjectTimer, labels: ['timer'] },
    { name: 'Show Timer', action: showProjectTimer, labels: ['timer']},
    { name: 'Delete Timer', action: deleteProjectTimer, labels: ['timer']},

    { name: 'Set daily goals', action: dailyGoals, labels: ['goals'] },
    { name: 'Review Goals for Project', action: reviewGoalsForProject, labels: ['goals'] },
    { name: 'Load projects from logfile into Projects DB', action: inputLogFile, labels: ['projects'] },
    { name: 'Review Projects', action: reviewProjects, labels: ['projects'] },
    { name: 'Rename Project', action: renameProject, labels: ['projects'] },
    { name: 'Review Project Log', action: reviewProjectLog, labels: ['projects'] },
    { name: 'Show Hours for Project', action: showHoursForProject, labels: ['projects'] },
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

async function startProjectTimer(projectManager) {
    console.log("Starting project timer");
    const project = await chooseProject(projectManager, "Choose which project to start timer for:");
    project.startTimer();
    // started time for project
    await projectManager.saveToFile();
    console.log("Project timer started for ", project.title);
    // show timers
    project.showTimers();
}

async function stopProjectTimer(projectManager) {
    console.log("Stopping project timer");
    const project = await chooseProject(projectManager, "Choose which project to stop timer for:");
    project.stopTimer();
    await projectManager.saveToFile();
    console.log("Project timer stopped for ", project.title);
    // show timers
    project.showTimers();
}

async function showProjectTimer(projectManager) {
    console.log("Showing project timer");
    const project = await chooseProject(projectManager, "Choose which project to show timer for:");
    project.showTimers();
}

// delete timer
async function deleteProjectTimer(projectManager) {
    console.log("Deleting project timer");
    const project = await chooseProject(projectManager, "Choose which project to delete timer for:");
    // show timers
    project.showTimers();
    // ask which one to delete
    const timerToDelete = await question("Which timer to delete? ");
    project.deleteTimerByIndex(timerToDelete-1);
    await projectManager.saveToFile();
    console.log("Project timer deleted for ", project.title);
    // show timers
    project.showTimers();

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

        const projectManager = new ProjectManager();
        await projectManager.loadFromFile();
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
            await selectedOption.action(projectManager);
        }

        // continue or exit?
        const continueOrExit = await question('Press q to quit or any other key to continue: ');
        if (continueOrExit === 'q') {
            break;
        }
    }
};

main();
