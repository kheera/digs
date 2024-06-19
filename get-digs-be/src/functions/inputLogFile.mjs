import {ProjectManager} from "../classes/ProjectManager.mjs";
import {question} from "./question.mjs";
import fs from "fs";
import readline from "readline";
import {splitLogLine} from "./splitLogLine.mjs";
import {Project} from "../classes/Project.mjs";

export async function inputLogFile(projectManager) {
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
        // let projectTitleBar = line.split(',')[1];
        let { logLineDateTime, titleBar } = splitLogLine(line);
        // if not title bar then skip
        if (!logLineDateTime || !titleBar) {
            continue;
        }

        // if line already exists as an hours log then skip
        if (projectManager.getProjectByHoursLog(line)) {
            // get the project and show the title
            let project = projectManager.getProjectByHoursLog(line);
            console.log(project.title, "has log ", line);
            continue;
        }

        let project;
        if (projectManager.getProjectByTitleBar(titleBar)) {
            project = projectManager.getProjectByTitleBar(titleBar);
            console.log(project.title, "adding log", line);
            project.addHoursLog(line);
        } else {
            console.log("");
            console.log("");
            console.log('NEW', titleBar);
            console.log("-----------------");
            // pick a title
            console.log("Projects:");
            projectManager.getProjectTitles().forEach((project, index) => {
                console.log(`   ${index + 1}. ${project}`);
            });
            const choice = await question('Assign by number or enter new project name: ');
            console.log("");
            let project;
            if (choice > 0 && choice <= projectManager.getProjectTitles().length) {
                let projectTitle = projectManager.getProjectTitles()[choice - 1];
                project = projectManager.getProjectByTitle(projectTitle);
                project.addHoursLog(line);
                project.addTitleBar(titleBar);
            } else {
                // if new project then add it to the projectsDB
                project = new Project(choice, true);
                project.addTitleBar(titleBar);
                project.addHoursLog(line);
                projectManager.addProject(project);
            }
        }
        projectManager.saveToFile();
    }
    console.log("Loaded ", count, " lines.");
}
