'use strict';

let toDoList = document.getElementById('to-do-list');
let calendar = document.getElementById('calendar');
const year = 23;


function Month(nameOfMonth, numberOfDays, keyValue, index) {
  this.nameOfMonth = nameOfMonth;
  this.numberOfDays = numberOfDays;
  this.keyValue = keyValue;
  this.index = index;
  this.startDay = (1 + this.keyValue + 5 + year + Math.floor(year / 4)) % 7;
  this.numberOfWeeks = getNumWeeks(this.index, this.startDay);
}

function getNumWeeks(month, firstDay) {
  let dayThreshold = [5, 1, 5, 6, 5, 6, 5, 5, 6, 5, 6, 5];
//   let firstDay = new Date(year, month, 1).getDay();
  let baseWeeks = (month == 1 ? 4 : 5); // only February can fit in 4 weeks
  // TODO: account for leap years
  return baseWeeks + (firstDay >= dayThreshold[month] ? 1 : 0); // add an extra week if the month starts beyond the threshold day.
}




