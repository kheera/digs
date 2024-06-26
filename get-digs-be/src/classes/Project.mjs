// need cli-tables3
import Table from 'cli-table3';
import { randomlyCreatedAlphaNumericTimeSortableId } from "../functions/randomlyCreatedAlphaNumericTimeSortableId.mjs";

export class Project {
    constructor(title, isWorkRelated) {
        this.title = title;
        this.isWorkRelated = isWorkRelated;
        this.titleBars = [];
        this.hoursLog = [];
        this.goals = {};
        this.timers = [];
    }

    addTitleBar(titleBar) {
        this.titleBars.push(titleBar);
    }

    addHoursLog(log) {
        this.hoursLog.push(log);
    }

    addGoal(description) {
        if (!Array.isArray(this.goals)) {
            this.goals = [];
        }
        const dateTime = new Date();
        const isoDateTimeString = dateTime.toISOString();
        this.goals.push(
            {
                id: 'g-' + randomlyCreatedAlphaNumericTimeSortableId(),
                dateTime: isoDateTimeString,
                description: description
            }
        )
        console.log("Added goal to project goals: ", this.goals);
    }

    // start timer
    startTimer(startTime) {
        // save s iso date time string
        // if there are no timers, create an array
        if (!this.timers) {
            this.timers = [];
        }

        this.timers.push({
            id: 'tmr-' + randomlyCreatedAlphaNumericTimeSortableId(),
            startTime: startTime
        });
        // return the timers
        console.log("Started timer: ", this.timers);

    }

    // stop timer
    updateTimer(id, timer) {
        console.log("Update timer: ", id, timer);
        // use the id to search replace the timer
        // find the timer
        let oldTimer = this.timers.find(t => t.id === id);
        let index = this.timers.indexOf(oldTimer);
        this.timers[index] = timer;
        console.log("Updated timer: ", this.timers[index]);
    }

    // delete timer
    deleteTimer(id) {
        console.log("Delete timer: ", id);
        // find the timer
        let timer = this.timers.find(t => t.id === id);
        let index = this.timers.indexOf(timer);
        this.timers.splice(index, 1);
        console.log("Deleted timer: ", this.timers);
    }

    openTimers() {
        return this.timers.filter(timer => !timer.stopTime);
    }

    showTimers(howMany = 10) {
        // showing all times
        console.log("Showing all timers: ");
        let table = new Table({
            head: ['','Start Time', 'Stop Time'],
            colWidths: [5, 30, 30],
            wordWrap: true
        });
        // put index in front so we can choose which one to stop or delete

        for (let i = 0; i < this.timers.length; i++) {
            let timer = this.timers[i];
            let localStartTime = new Date(timer.startTime).toLocaleString()
            let localStopTime = timer.stopTime ? new Date(timer.stopTime).toLocaleTimeString() : '';
            table.push([i+1, localStartTime, localStopTime]);
        }
        console.log(table.toString());
    }

    deleteTimerByIndex(index) {
        this.timers.splice(index, 1);
    }

    showRecentGoals(howMany = 10) {
        // get the 10 most recent goals
        const dates = Object.keys(this.goals);
        dates.sort();
        dates.reverse();
        let counter = 0;
        let dateGoals = [];
        for (let date of dates) {
            if (counter >= howMany) {
                break;
            }
            let curentDateTime = new Date(date);
            let dateStr = curentDateTime.toDateString();
            if (!dateGoals[dateStr]) {
                dateGoals[dateStr] = [];
            }
            dateGoals[dateStr].push({date: date, goals: this.goals[date]});
        }

        // sort from oldest to newest
        // get properties so we can sort them
        let dateGoalsArray = Object.keys(dateGoals);
        dateGoalsArray.sort();
        // reverse to get newest first
        dateGoalsArray.reverse();

        // loop through the date goals and show date as a header and time and goal as a list
        for (let date of dateGoalsArray) {
            console.log('');
            console.log(date);
            let table = new Table({
                head: ['Time', 'Goal'],
                colWidths: [20, 70],
                wordWrap: true
            });
            let goals = dateGoals[date];
            goals.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            // sort by oldest to newest
            for (let goal of goals) {
                let localTime = new Date(goal.date).toLocaleTimeString();
                table.push([localTime, goal.goals.join('\n')]);
            }
            console.log(table.toString());
            //
            // // show open timers if any
            // let openTimers = this.openTimers();
            // if (openTimers.length > 0) {
            //     console.log("Open timers: ");
            //     let table = new Table({
            //         head: ['Start Time'],
            //         colWidths: [30],
            //         wordWrap: true
            //     });
            //     openTimers.forEach(timer => {
            //         table.push([new Date(timer.startTime).toLocaleString()]);
            //     });
            //     console.log(table.toString());
            // }
        }
    }
}