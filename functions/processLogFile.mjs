// import fs from "fs";
// import readline from "readline";
// import {splitLogLine} from "./splitLogLine.mjs";
//
// export
// async function processLogFile() {
//     console.log("Processing log file: ", defaultInputLogFile);
//     const fileStream = fs.createReadStream(defaultInputLogFile);
//
//     const rl = readline.createInterface({
//         input: fileStream,
//         crlfDelay: Infinity
//     });
//
//     let previousTask;
//     let previousDateTime;
//     let totalMilliseconds = 0;
//
//     // throw away the first line
//     let firstLine = true;
//     for await (const line of rl) {
//         // skip the first line cuz it's headers
//         if (firstLine) {
//             firstLine = false;
//             continue;
//         }
//
//         // date string is data before first comma
//         const { logLineDateTime, titleBar } = splitLogLine(line);
//
//         if (previousDateTime) {
//             const diffMilliseconds = (logLineDateTime - previousDateTime);
//             console.log("Previous Task: ", previousTask, " Current Task: ", titleBar);
//             console.log("    Previous: ", previousDateTime.toLocaleDateString() + ' ' + previousDateTime.toLocaleTimeString() + " Current: ", logLineDateTime.toLocaleDateString() + ' ' + logLineDateTime.toLocaleTimeString());
//             console.log("    Diff minutes: ", Math.round(diffMilliseconds / 1000 / 60));
//             totalMilliseconds += diffMilliseconds;
//             previousDateTime = logLineDateTime;
//         } else {
//             previousDateTime = logLineDateTime;
//             previousTask = titleBar;
//         }
//     }
//
//
//     const totalHours = totalMilliseconds / 1000 / 60 / 60;
//     return totalHours;
//
// }