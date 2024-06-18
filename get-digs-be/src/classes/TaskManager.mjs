import fs from "fs";
import { Task } from "./Task.mjs";
import { chooseTask } from "../functions/chooseTask.mjs";
import { question } from "../functions/question.mjs";
import { randomlyCreatedAlphaNumericTimeSortableId } from "../functions/randomlyCreatedAlphaNumericTimeSortableId.mjs";

function tasksDbFilename() {
    console.log("Loading path: ", process.env.STORAGE);
    let path = process.env.STORAGE;
    if (!path.endsWith('/')) {
        path += '/';
    }
    return `${path}data/tasksDB.json`
}

export async function manageTask(taskManager) {

    let task = await chooseTask(taskManager, "Choose a task to manage:");

    // offer to add a goal, start a timer, stop a timer, delete a timer, or delete a goal
    let choices = {
        'Add Goal': addGoal,
        'Start Timer': task.startTimer,
        'Stop Timer': task.stopTimer,
        'Delete Timer': deleteTimer,
    };

    // choose task
    let choice;
    while (true) {
        showTaskInfo(task);
        Object.keys(choices).forEach((choice, index) => {
            console.log(`   ${index + 1}. ${choice}`);
        });
        choice = await question('Choose an action by number, to quit enter 0: ');
        if (choice === '0' || choice > Object.keys(choices).length) {
            console.log("Exiting task management");
            break;
        }
        // you have choosen
        console.log("You have chosen: ", Object.keys(choices)[choice - 1]);
        // run the function
        await choices[Object.keys(choices)[choice - 1]].call(task);
        // save
        await taskManager.saveToFile();
    }

    function showTaskInfo(task) {
        console.log("Task: ", task.title);
        console.log("-----------------");
        // show recent goals
        task.showRecentGoals(5);
        task.showTimers(5);
    }

    async function addGoal() {
        const goal = await question('What is your goal for this task? ');
        task.addGoal(goal);
    }

    async function deleteTimer() {
        const timerIndex = await question('Which timer to delete? ');
        task.deleteTimer(timerIndex - 1);
    }

}

export class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        // make sure all the required properties are here
        if (!task.title) {
            throw new Error("Task must have a title");
        }

        // check titlebars, hours log, add an id
        task.titleBars = task.titleBars ? task.titleBars : [];
        task.hoursLog = task.hoursLog ? task.hoursLog : [];
        task.id = task.id ? task.id : randomlyCreatedAlphaNumericTimeSortableId();
        task.timers = task.timers ? task.timers : [];
        task.goals = task.goals ? task.goals : [];
        this.tasks.push(task);
    }

    getTaskByTitle(title) {
        return this.tasks.find(task => task.title === title);
    }

    getTaskByIndex(index) {
        return this.tasks[index];
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    getTaskByHoursLog(hoursLog) {
        return this.tasks.find(task => task.hoursLog.includes(hoursLog));
    }

    getTaskByTitleBar(titleBar) {
        return this.tasks.find(task => task.titleBars.includes(titleBar));
    }

    getTaskTitles() {
        return this.tasks.map(task => task.title);
    }

    getTasks() {
        return this.tasks;
    }

    async saveToFile() {
        try {
            fs.writeFileSync(tasksDbFilename(), JSON.stringify(this.tasks), 'utf8');
        } catch (err) {
            console.error("Error saving to file: ", err);
        }
    }

    async loadFromFile() {
        let loadedTasks = [];
        try {
            const data = fs.readFileSync(tasksDbFilename(), 'utf8');
            loadedTasks = JSON.parse(data);
        } catch (err) {
            console.error("Error loading from file: ", err);
        }

        // loop through tasks and create Task objects
        for (let task of loadedTasks) {
            // is task a string? If so make the string the title
            if (typeof task === 'string') {
                task = { title: task };
            }

            console.log("Loading task: ", task.title);
            let newTask = new Task(task.title, task.isWorkRelated);

            // make sure titleBars is iterable
            if (!Array.isArray(task.titleBars)) {
                task.titleBars = [];
            }

            // make sure hoursLog is iterable
            if (!Array.isArray(task.hoursLog)) {
                task.hoursLog = [];
            }

            // if it's not an array let's wipe it out and make it an array
            if (!Array.isArray(task.goals)) {
                task.goals = [];
            }
            newTask.goals = task.goals;

            // check if timers is iterable
            if (!Array.isArray(task.timers)) {
                task.timers = [];
            }

            // loop through timers to make sure they each have an id
            for (let timer of task.timers) {
                if (!timer.id) {
                    timer.id = 'tsk-' + randomlyCreatedAlphaNumericTimeSortableId();
                }
            }

            newTask.timers = task.timers;
            newTask.id = task.id ? task.id : randomlyCreatedAlphaNumericTimeSortableId();
            newTask.titleBars = task.titleBars;
            newTask.hoursLog = task.hoursLog;

            this.tasks.push(newTask);
        }

        // save tasks to file
        await this.saveToFile();

    }
}
