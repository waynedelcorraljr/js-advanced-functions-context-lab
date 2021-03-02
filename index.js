function createEmployeeRecord(employee) {
    let emp = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return emp;
}

function createEmployeeRecords(empArrArr) {
    return empArrArr.map(e => createEmployeeRecord(e));
}

function createTimeInEvent(dateStamp) {
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(dateStamp) {
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    this.timeOutEvents.push(timeOut);
    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date).hour;
    let timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(empArr, firstName) {
    return empArr.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeArray) {
    let allWagesArray = employeeArray.map(e => allWagesFor.call(e));
    let reducer = (currentValue, newValue) => currentValue += newValue;
    return allWagesArray.reduce(reducer);
}