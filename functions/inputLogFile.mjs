import {TaskManager} from "../classes/TaskManager.mjs";
import {question} from "./question.mjs";
import fs from "fs";
import readline from "readline";
import {splitLogLine} from "./splitLogLine.mjs";
import {Task} from "../classes/Task.mjs";

export async function inputLogFile(taskManager) {
    const defaultInputLogFile = process.env.ACTIVE_WINDOW_LOG;
    const fileStream = fs.createReadStream(defaultInputLogFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let count = 0;

    for await (const line of rl) {
        count++;
        // let dateTimeString = line.split(',')[0];
        // let taskTitleBar = line.split(',')[1];
        let { logLineDateTime, titleBar } = splitLogLine(line);
        // if not title bar then skip
        if (!logLineDateTime || !titleBar) {
            continue;
        }

        // if line already exists as an hours log then skip
        if (taskManager.getTaskByHoursLog(line)) {
            // get the task and show the title
            let task = taskManager.getTaskByHoursLog(line);
            console.log(task.title, "has log ", line);
            continue;
        }

        let task;
        if (taskManager.getTaskByTitleBar(titleBar)) {
            task = taskManager.getTaskByTitleBar(titleBar);
            console.log(task.title, "adding log", line);
            task.addHoursLog(line);
        } else {
            console.log("");
            console.log("");
            console.log('NEW', titleBar);
            console.log("-----------------");
            // pick a title
            console.log("Tasks:");
            taskManager.getTaskTitles().forEach((task, index) => {
                console.log(`   ${index + 1}. ${task}`);
            });
            const choice = await question('Assign by number or enter new task name: ');
            console.log("");
            let task;
            if (choice > 0 && choice <= taskManager.getTaskTitles().length) {
                let taskTitle = taskManager.getTaskTitles()[choice - 1];
                task = taskManager.getTaskByTitle(taskTitle);
                task.addHoursLog(line);
                task.addTitleBar(titleBar);
            } else {
                // if new task then add it to the tasksDB
                task = new Task(choice, true);
                task.addTitleBar(titleBar);
                task.addHoursLog(line);
                taskManager.addTask(task);
            }
        }
        taskManager.saveToFile();
    }
    console.log("Loaded ", count, " lines.");
}
