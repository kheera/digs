// Requires the Node.js filesystem module to read and write files
const fs = require('fs');
// Requires the readline module to interact with the user via the command line
const readline = require('readline');


// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to read the tasks database
function readTasksDB() {
    return new Promise((resolve, reject) => {
        // create file if doesn't exist
        // fs.readFile('tasksDB.json', (err, data) => {
        //     if (err) reject(err);
        //     else resolve(JSON.parse(data));
        // });
        fs.readFile('tasksDB.json', (err, data) => {
            if (err) {
                fs.writeFileSync('tasksDB.json', '{}');
                resolve({});
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Function to ask the user to classify a log entry
async function classifyLogEntry(logEntry, tasks) {
    console.log(`Log Entry: ${logEntry}`);
    // List existing tasks
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
    console.log(`${tasks.length + 1}. Add a new task`);

    return new Promise((resolve) => {
        rl.question('Choose a task for this log entry (number): ', (answer) => {
            const choice = parseInt(answer);
            if (choice === tasks.length + 1) {
                // Handle adding a new task
                rl.question('Enter the name of the new task: ', (newTask) => {
                    // if new task then add it to the tasksDB
                    tasks.unshift(newTask);
                    fs.writeFileSync('tasksDB.json', JSON.stringify(tasks), 'utf8');
                    resolve(newTask);
                    // rl.close();
                });
            } else if (choice > 0 && choice <= tasks.length) {
                // Use an existing task
                resolve(tasks[choice - 1]);
                // rl.close();
            } else if (isNaN(choice)) {
                console.log('Invalid input. Please enter a number.');
                resolve(null);
                // rl.close();
            } else {
                console.log('Invalid choice. Please try again.');
                resolve(null);
                // rl.close();
            }
        });
    });
}

// Main function to process the log
async function processLog() {
    const logFile = process.env.ACTIVE_WINDOW_LOG;
    const tasksDB = await readTasksDB();
    const tasks = Object.keys(tasksDB);
    // Simulate a log entry for demonstration
    // const logEntry = '2024-01-12_10-08-28, Terminal - astro-loyalty-shopify';
    // open active-window.log
    const logEntries = fs.readFileSync(logFile, 'utf8');
    const logEntriesArray = logEntries.split('\n');
    for (let i = 0; i < logEntriesArray.length; i++) {
        const logEntry = logEntriesArray[i];
        const chosenTask = await classifyLogEntry(logEntry, tasks);
        console.log(`You chose/added: ${chosenTask}`);
    }
    rl.close();

}

processLog().catch(console.error);
