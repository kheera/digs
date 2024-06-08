import {chooseTask} from "./chooseTask.mjs";
import {splitLogLine} from "./splitLogLine.mjs";

// lets create a class so it's easier to track day and month totals. we'll have one class for each month.
class Month {
    constructor(month) {
        this.month = month;
        this.days = [];
    }
    addDay(day) {
        const date = day.getDate();
        // index by date
        this.days[date] = day;
    }
    getDay(date) {
        return this.days[date];
    }
    getDays() {
        return this.days;
    }
    getMonth() {
        return this.month;
    }
    getDayTotal(day) {
        return this.days[day].getTotal();
    }
    getMonthTotal() {
        let total = 0;
        this.days.forEach(day => {
            total += day.getTotal();
        });
        return total;
    }

    showMonthReport() {
        const month = this;
        const monthName = month.getMonth();
        const monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthTotal = month.getMonthTotal();
        console.log('');
        console.log("--------------------");
        console.log(monthStrings[monthName], " Total: ", hoursAndMinutesString(monthTotal), " (", hoursAndMinutesAsDecimal(monthTotal), " hours)");
        month.getDays().forEach(day => {
            let dayTotalMinutes = day.getTotal();
            let dayTotalHours = Math.round(dayTotalMinutes / 60 * 100) / 100;
            console.log("    ", monthStrings[monthName], " ", day.getDate(), ":", hoursAndMinutesString(dayTotalMinutes));
            // show entries
            day.entries.forEach(entry => {
                let timeStart = entry.startTime.toLocaleTimeString();
                let timeEnd = entry.endTime.toLocaleTimeString();
                let entryMinutes = day.entryMinutes(entry);
                console.log("        ", timeStart, " - ", timeEnd, " : ", hoursAndMinutesString(entryMinutes));
            });
            let titleBars = day.getTitleBars();
            // show them
            titleBars.forEach(titleBar => {
                console.log("                    ", titleBar);
            });
        });
    }

    showTitleBars() {
        // get titlebars for each day in the month
        let titleBars = [];
        this.getDays().forEach(day => {
            titleBars = titleBars.concat(day.getTitleBars());
        });
        // sort and unique
        titleBars = titleBars.sort();
        titleBars = titleBars.filter((item, index) => {
            return titleBars.indexOf(item) === index;
        });
        console.log("Title Bars: ");
        titleBars.forEach(titleBar => {
            console.log("    ", titleBar);
        });
    }
}

class Day {
    constructor(date) {
        this.date = date;
        this.total = 0;
        this.titleBars = [];
        this.entries = [];
    }

    addEntry(entry) {
        this.entries.push(entry);
        let inMinutes = this.entryMinutes(entry);
        this.addMinutes(inMinutes);
        this.addTitleBar(...entry.titleBars);
    }

    entryMinutes(entry) {
        let diff = entry.endTime - entry.startTime;
        let inMinutes = diff / 1000 / 60;
        // add two because we only check every 2 minutes and we're likely missing 60 seconds of work on either side of the start and end times
        inMinutes += 2;
        // round to nearest minute
        inMinutes = Math.round(inMinutes);
        return inMinutes;
    }

    addMinutes(minutes) {
        this.total += minutes;
    }
    addTitleBar(titleBar) {
        this.titleBars.push(titleBar);
    }

    getTotal() {
        return this.total;
    }
    getDate() {
        return this.date;
    }

    getTitleBars() {
        // sort, unique
        this.titleBars = this.titleBars.sort();
        return this.titleBars.filter((item, index) => {
            return this.titleBars.indexOf(item) === index;
        });
    }
}

export async function showHoursForTask(taskManager) {
    console.log("Okay, let's show the hours for a task.");
    let task = await chooseTask(taskManager, "Choose which task to show the hours for:");
    let monthlyMinutes = {};
    let hoursLog = task.hoursLog;
    hoursLog.sort();
    // show all of hours log
    let counter = 0;
    for (let hoursLogEntry of hoursLog) {
        const { logLineDateTime, titleBar } = splitLogLine(hoursLogEntry);
        counter++;
    }

    let previousTime = null;
    let timeDiffInMinutes = 0;
    let workJournal = [];
    let workJournalEntry = {
        startTime: null,
        endTime: null,
        titleBars: []
    }

    // build work journal
    hoursLog.forEach(log => {
        const { logLineDateTime, titleBar } = splitLogLine(log);
        // add the title bar to the work journal entry
        workJournalEntry.titleBars.push(titleBar);

        if (previousTime) {
            // is previous time reasonably close to this time? (Trying to detect a break in work)
            timeDiffInMinutes = (logLineDateTime - previousTime) / 1000 / 60;
            const isRecentPreviousTime = timeDiffInMinutes < 5;
            // if it's not recent then log the last entry
            if (!isRecentPreviousTime) {
                // copy it
                workJournalEntry.endTime = previousTime;
                // make a copy
                workJournal.push({ ...workJournalEntry });
                // reset
                workJournalEntry.startTime = logLineDateTime;
                workJournalEntry.endTime = null;
                workJournalEntry.titleBars = [];

                // set time diff to something reasonable
                timeDiffInMinutes = 2;
            }
        } else {
            timeDiffInMinutes = 2;
            workJournalEntry.startTime = logLineDateTime;
            workJournalEntry.endTime = null;
        }
        previousTime = logLineDateTime;
    });

    // build the day and month totals
    let months = [];
    for (let entry in workJournal) {
        let month = workJournal[entry].startTime.getMonth();
        if (!months[month]) {
            months[month] = new Month(month);
        }
        let date = workJournal[entry].startTime.getDate();
        if (!months[month].getDay(date)) {
            months[month].addDay(new Day(date));
        }
        months[month].getDay(date).addEntry(workJournal[entry]);
    }

    // show the day and month totals
    // also show start/end time entries for each date
    console.log("Day and month totals");
    months.forEach(month => {
        month.showMonthReport();
    });

}

function hoursAndMinutesString(minutes) {
    let theHours = Math.floor(minutes / 60);
    let theMinutes = minutes % 60;
    let roundedTheMinutes = Math.round(theMinutes);
    // rounded minutes needs leading zero
    if (roundedTheMinutes < 10) {
        roundedTheMinutes = "0" + roundedTheMinutes;
    }
    return theHours + ":" + roundedTheMinutes;
}

function hoursAndMinutesAsDecimal(minutes) {
    let theHours = minutes / 60;
    let roundedTheHours = Math.round(theHours * 100) / 100;
    return roundedTheHours;
}

