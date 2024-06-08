// Task Lookup Table
const taskLookup = {
    "Terminal - astro-loyalty-shopify": "Development Work",
    "Home / X - Google Chrome": "Research",
    "Facebook - Google Chrome": "Social Networking",
    "Home — Bluesky - Google Chrome": "Social Networking",
    "ops - IVIE - Slack": "Project Management"
};

// Sample Data
const data = [
    "2024-01-12_10-08-28, Terminal - astro-loyalty-shopify",
    "2024-01-12_10-29-25, Terminal - astro-loyalty-shopify",
    "2024-01-12_10-30-15, Terminal - astro-loyalty-shopify",
    "2024-01-12_10-32-20, Home / X - Google Chrome",
    "2024-01-12_10-34-24, Facebook - Google Chrome",
    "2024-01-12_10-36-28, Home — Bluesky - Google Chrome",
    "2024-01-12_10-38-33, ops - IVIE - Slack"
];

// Function to map each window to a task
function mapWindowsToTasks(data) {
    return data.map(entry => {
        const [timestamp, windowTitle] = entry.split(', ');
        const task = taskLookup[windowTitle] || "Unknown Task"; // Default to "Unknown Task" if not in lookup table
        return `${timestamp}: ${task}`;
    });
}

// Process the data
const tasks = mapWindowsToTasks(data);

// Display the tasks
console.log(tasks);
