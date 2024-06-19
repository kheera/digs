import {timestampToIsoDateTime} from "./timestampToIsoDateTime.mjs";
//
// const dateTimeString = line.split(',')[0];
// const project = line.split(',')[1];
// const currentDateTime = timestampToIsoDateTime(dateTimeString);

export function splitLogLine(logLine) {
    const dateTimeString = logLine.split(',')[0];
    const project = logLine.split(',')[1];
    if (!dateTimeString || !project) {
        return {};
    }
    const titleBar = project.trim();
    const logLineDateTime = timestampToIsoDateTime(dateTimeString.trim());
    return { logLineDateTime, titleBar };
}