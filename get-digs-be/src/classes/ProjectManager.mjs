import fs from "fs";
import { Project } from "./Project.mjs";
import { chooseProject } from "../functions/chooseProject.mjs";
import { question } from "../functions/question.mjs";
import { randomlyCreatedAlphaNumericTimeSortableId } from "../functions/randomlyCreatedAlphaNumericTimeSortableId.mjs";

function projectsDbFilename() {
    console.log("Loading path: ", process.env.STORAGE);
    let path = process.env.STORAGE;
    if (!path.endsWith('/')) {
        path += '/';
    }
    return `${path}data/projectsDB.json`
}

export async function manageProject(projectManager) {

    let project = await chooseProject(projectManager, "Choose a project to manage:");

    // offer to add a goal, start a timer, stop a timer, delete a timer, or delete a goal
    let choices = {
        'Add Goal': addGoal,
        'Start Timer': project.startTimer,
        'Stop Timer': project.stopTimer,
        'Delete Timer': deleteTimer,
    };

    // choose project
    let choice;
    while (true) {
        showProjectInfo(project);
        Object.keys(choices).forEach((choice, index) => {
            console.log(`   ${index + 1}. ${choice}`);
        });
        choice = await question('Choose an action by number, to quit enter 0: ');
        if (choice === '0' || choice > Object.keys(choices).length) {
            console.log("Exiting project management");
            break;
        }
        // you have choosen
        console.log("You have chosen: ", Object.keys(choices)[choice - 1]);
        // run the function
        await choices[Object.keys(choices)[choice - 1]].call(project);
        // save
        await projectManager.saveToFile();
    }

    function showProjectInfo(project) {
        console.log("Project: ", project.title);
        console.log("-----------------");
        // show recent goals
        project.showRecentGoals(5);
        project.showTimers(5);
    }

    async function addGoal() {
        const goal = await question('What is your goal for this project? ');
        project.addGoal(goal);
    }

    async function deleteTimer() {
        const timerIndex = await question('Which timer to delete? ');
        project.deleteTimer(timerIndex - 1);
    }

}

export class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        // make sure all the required properties are here
        if (!project.title) {
            throw new Error("Project must have a title");
        }

        // check titlebars, hours log, add an id
        project.titleBars = project.titleBars ? project.titleBars : [];
        project.hoursLog = project.hoursLog ? project.hoursLog : [];
        project.id = project.id ? project.id : randomlyCreatedAlphaNumericTimeSortableId();
        project.timers = project.timers ? project.timers : [];
        project.goals = project.goals ? project.goals : [];
        this.projects.push(project);
    }

    deleteProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
    }

    getProjectByTitle(title) {
        return this.projects.find(project => project.title === title);
    }

    getProjectByIndex(index) {
        return this.projects[index];
    }

    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }

    getProjectByHoursLog(hoursLog) {
        return this.projects.find(project => project.hoursLog.includes(hoursLog));
    }

    getProjectByTitleBar(titleBar) {
        return this.projects.find(project => project.titleBars.includes(titleBar));
    }

    getProjectTitles() {
        return this.projects.map(project => project.title);
    }

    getProjects() {
        return this.projects;
    }

    async saveToFile() {
        try {
            fs.writeFileSync(projectsDbFilename(), JSON.stringify(this.projects), 'utf8');
        } catch (err) {
            console.error("Error saving to file: ", err);
        }
    }

    async loadFromFile() {
        let loadedProjects = [];
        try {
            const data = fs.readFileSync(projectsDbFilename(), 'utf8');
            loadedProjects = JSON.parse(data);
        } catch (err) {
            console.error("Error loading from file: ", err);
        }

        // loop through projects and create Project objects
        for (let project of loadedProjects) {
            // is project a string? If so make the string the title
            if (typeof project === 'string') {
                project = { title: project };
            }

            console.log("Loading project: ", project.title);
            let newProject = new Project(project.title, project.isWorkRelated);

            // make sure titleBars is iterable
            if (!Array.isArray(project.titleBars)) {
                project.titleBars = [];
            }

            // make sure hoursLog is iterable
            if (!Array.isArray(project.hoursLog)) {
                project.hoursLog = [];
            }

            // if it's not an array let's wipe it out and make it an array
            if (!Array.isArray(project.goals)) {
                project.goals = [];
            }
            newProject.goals = project.goals;

            // check if timers is iterable
            if (!Array.isArray(project.timers)) {
                project.timers = [];
            }

            // loop through timers to make sure they each have an id
            for (let timer of project.timers) {
                if (!timer.id) {
                    timer.id = 'tmr-' + randomlyCreatedAlphaNumericTimeSortableId();
                }
            }

            // if any timers have an id that starts with tsk then we need to change it to tmr
            for (let timer of project.timers) {
                if (timer.id.startsWith('tsk')) {
                    timer.id = 'tmr' + timer.id.slice(3);
                }
            }

            newProject.timers = project.timers;
            newProject.id = project.id ? project.id : randomlyCreatedAlphaNumericTimeSortableId();
            newProject.titleBars = project.titleBars;
            newProject.hoursLog = project.hoursLog;

            this.projects.push(newProject);
        }

        // save projects to file
        await this.saveToFile();

    }
}
