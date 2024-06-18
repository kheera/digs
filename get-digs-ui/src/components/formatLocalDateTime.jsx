export function formatLocalDateTime(dateTime) {
    const date = new Date(dateTime);
    // return date.toLocaleString();
    // only show date and hours and minutes portin of time
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}