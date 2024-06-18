export function randomlyCreatedAlphaNumericTimeSortableId() {
    let timestamp = new Date().getTime();
    let randomChars = Math.random().toString(36).substring(2, 15);
    return timestamp + '-' + randomChars;
}