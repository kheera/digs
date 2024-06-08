// need cli-tables3
import Table from 'cli-table3';

export class Task {
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

    addGoal(goal) {
        // need to include a date and timestamp
        const dateTime = new Date();
        const isoDateTimeString = dateTime.toISOString();
        if (!this.goals[isoDateTimeString]) {
            this.goals[isoDateTimeString] = [];
        }
        this.goals[isoDateTimeString].push(goal);
        console.log("Added goal to task goals: ", this.goals);
    }

    // start timer
    startTimer() {
        const startTime = new Date();
        // save s iso date time string
        // if there are no timers, create an array
        if (!this.timers) {
            this.timers = [];
        }
        this.timers.push({startTime: startTime.toISOString()});
        console.log("Started timer: ", this.timers);
    }

    // stop timer
    stopTimer() {
        console.log("Trying to stop a timer: ", this.timers);
        const stopTime = new Date();
        this.timers[this.timers.length - 1].stopTime = stopTime.toISOString();
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

    deleteTimer(index) {
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