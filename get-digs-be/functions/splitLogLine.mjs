import {timestampToIsoDateTime} from "./timestampToIsoDateTime.mjs";
//
// const dateTimeString = line.split(',')[0];
// const task = line.split(',')[1];
// const currentDateTime = timestampToIsoDateTime(dateTimeString);

export function splitLogLine(logLine) {
    const dateTimeString = logLine.split(',')[0];
    const task = logLine.split(',')[1];
    if (!dateTimeString || !task) {
        return {};
    }
    const titleBar = task.trim();
    const logLineDateTime = timestampToIsoDateTime(dateTimeString.trim());
    return { logLineDateTime, titleBar };
}