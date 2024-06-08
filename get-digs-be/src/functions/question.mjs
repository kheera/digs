import readline from "readline";

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
export function question(query) {
    return new Promise(resolve => userInput.question(query, answer => resolve(answer)));
}