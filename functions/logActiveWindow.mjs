// const activeWindow = require('active-win');
// const fs = require('fs');
// // dotenv
// require('dotenv').config();
// switch above to es module format

// switch out to use get-windows https://github.com/sindresorhus/get-windows#readme
import activeWindow from 'active-win';
import fs from 'fs';
// require('dotenv').config();

export async function logActiveWindow() {
	const logFile = process.env.ACTIVE_WINDOW_LOG;
	if (!logFile) {
		console.error('No log file provided');
	}
	let window = await activeWindow();
	if (!window) {
		window = { title: 'No active window' };
	}
	var date = new Date();
	var timestamp = date.getFullYear() + "-" +
		("0" + (date.getMonth() + 1)).slice(-2) + "-" +
		("0" + date.getDate()).slice(-2) + "_" +
		("0" + date.getHours()).slice(-2) + "-" +
		("0" + date.getMinutes()).slice(-2) + "-" +
		("0" + date.getSeconds()).slice(-2);

	let logEntry = timestamp + ", " + window.title;
	fs.appendFile(logFile, logEntry + '\n', function (err) {
		if (err) throw err;
	});
	return { 'date': date.toLocaleString(), 'titleBar': window.title };
}

export async function readLastLinesOfLog(howMany) {
	const logFile = process.env.ACTIVE_WINDOW_LOG;
	if (!logFile) {
		console.error('No log file provided');
	}
	const data = fs.readFileSync(logFile, 'utf8');
	let lines = data.split('\n');
}
