import {chooseProject} from "./chooseProject.mjs";
import {question} from "./question.mjs";
// split line
import {splitLogLine} from "./splitLogLine.mjs";

export async function reviewProjectLog(projectManager) {
    console.log("Okay, let's review the project log.");
    // show project titles
    console.log("Which project would you like to show the log for?");
    const project = await chooseProject(projectManager, "Choose which project to show the log for:");
    console.log("Project: ", project.title);
    let hoursLog = project.hoursLog;
    // sort hours log
    hoursLog.sort();
    // use for of to show hours log 50 at a time
    let counter = 0;
    let lastEntryTime ;
    let timeDiffInMinutes = 0;
    for (let hoursLogEntry of hoursLog) {
        const { logLineDateTime, titleBar} = splitLogLine(hoursLogEntry);
        if (lastEntryTime) {
            timeDiffInMinutes = (logLineDateTime - lastEntryTime) / 1000 / 60;
            // rounded
            timeDiffInMinutes = Math.round(timeDiffInMinutes);
        }
        console.log('  ', counter, timeDiffInMinutes, hoursLogEntry);
        counter++;
        if (counter % 25 === 0) {
            const response = await question('Press enter to continue or q to quit: ');
            if (response === 'q') {
                return;
            }
        }
        lastEntryTime = logLineDateTime;
    }
}
