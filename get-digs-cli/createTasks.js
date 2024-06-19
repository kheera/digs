// Requires the Node.js filesystem module to read and write files
const fs = require('fs');
// Requires the readline module to interact with the user via the command line
const readline = require('readline');


// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to read the projects database
function readProjectsDB() {
    return new Promise((resolve, reject) => {
        // create file if doesn't exist
        // fs.readFile('projectsDB.json', (err, data) => {
        //     if (err) reject(err);
        //     else resolve(JSON.parse(data));
        // });
        fs.readFile('projectsDB.json', (err, data) => {
            if (err) {
                fs.writeFileSync('projectsDB.json', '{}');
                resolve({});
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Function to ask the user to classify a log entry
async function classifyLogEntry(logEntry, projects) {
    console.log(`Log Entry: ${logEntry}`);
    // List existing projects
    projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project}`);
    });
    console.log(`${projects.length + 1}. Add a new project`);

    return new Promise((resolve) => {
        rl.question('Choose a project for this log entry (number): ', (answer) => {
            const choice = parseInt(answer);
            if (choice === projects.length + 1) {
                // Handle adding a new project
                rl.question('Enter the name of the new project: ', (newProject) => {
                    // if new project then add it to the projectsDB
                    projects.unshift(newProject);
                    fs.writeFileSync('projectsDB.json', JSON.stringify(projects), 'utf8');
                    resolve(newProject);
                    // rl.close();
                });
            } else if (choice > 0 && choice <= projects.length) {
                // Use an existing project
                resolve(projects[choice - 1]);
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
    const projectsDB = await readProjectsDB();
    const projects = Object.keys(projectsDB);
    // Simulate a log entry for demonstration
    // const logEntry = '2024-01-12_10-08-28, Terminal - astro-loyalty-shopify';
    // open active-window.log
    const logEntries = fs.readFileSync(logFile, 'utf8');
    const logEntriesArray = logEntries.split('\n');
    for (let i = 0; i < logEntriesArray.length; i++) {
        const logEntry = logEntriesArray[i];
        const chosenProject = await classifyLogEntry(logEntry, projects);
        console.log(`You chose/added: ${chosenProject}`);
    }
    rl.close();

}

processLog().catch(console.error);
