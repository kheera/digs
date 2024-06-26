import {formatLocalDateTime} from "./formatLocalDateTime";

export function formatEndTime(startTime, duration) {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(startDateTime.getTime() + duration * 1000);
    return formatLocalDateTime(endDateTime);
}