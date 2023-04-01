'use strict';

// GLOBAL VARIABLES
let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = [];
const year = 23;

// DOM WINDOW
let toDoList = document.getElementById('to-do-list');
let calendar = document.getElementById('calendar');
let modal = document.getElementById('modal');
let closeButton = document.getElementById('close-button');
let form = document.getElementById('form');

// Month contructor
function Month(nameOfMonth, numberOfDays, keyValue, index) {
  this.nameOfMonth = nameOfMonth;
  this.numberOfDays = numberOfDays;
  this.keyValue = keyValue;
  this.index = index;
  this.startDay = (1 + this.keyValue + 5 + year + Math.floor(year / 4)) % 7;
  this.numberOfWeeks = getNumWeeks(this.index, this.startDay);

  months.push(this);
}

Month.prototype.render = function () {
  let monthDiv = document.createElement('div');
  monthDiv.id = this.nameOfMonth;

  let h2 = document.createElement('h2');
  h2.textContent = this.nameOfMonth;
  monthDiv.appendChild(h2);

  // create table for month
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let headRow = document.createElement('tr');

  // Make a th for each day of the week
  for (let i = 0; i < daysOfWeek.length; i++) {
    let th = document.createElement('th');
    th.textContent = daysOfWeek[i];
    headRow.appendChild(th);
  }

  let counter = 1;
  let tbody = document.createElement('tbody');

  // Loops through the number of weeks each month has and creates a row for each week
  for (let i = 0; i < this.numberOfWeeks; i++) {
    let tr = document.createElement('tr');
    // if this is the first week, then start the counter on whichever day of the week the month starts
    // if it's the not first week, then start the counter on Sunday because the other weeks is always a full week
    if (i === 0) {
      console.log('week 1');
      // Loops through the days of the week
      for (let i = 0; i < daysOfWeek.length; i++) {
        let td = document.createElement('td');
        td.addEventListener('click', handleDateClick);
        if (i >= this.startDay) {
          if (counter > this.numberOfDays) {
            td.textContent = ` `;
            console.log('week loop');
          } else {

            td.textContent = counter++;
          }
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);

    } else {
      for (let i = 0; i < daysOfWeek.length; i++) {
        let td = document.createElement('td');
        td.addEventListener('click', handleDateClick);
        tr.appendChild(td);
        if (counter > this.numberOfDays) {
          td.textContent = ` `;
        } else {
          td.textContent = counter++;
        }

      }
      tbody.appendChild(tr);
    }

  }
  thead.appendChild(headRow);
  table.appendChild(tbody);
  table.appendChild(thead);
  monthDiv.appendChild(table);
  calendar.appendChild(monthDiv);
};
// Month instances
let jan = new Month('January', 31, 1, 0);
let feb = new Month('February', 28, 4, 1);
let mar = new Month('March', 31, 4, 2);
let apr = new Month('April', 30, 0, 3);
let may = new Month('May', 31, 2, 4);

function getNumWeeks(month, firstDay) {
  let dayThreshold = [5, 1, 5, 6, 5, 6, 5, 5, 6, 5, 6, 5];
  //   let firstDay = new Date(year, month, 1).getDay();
  let baseWeeks = (month === 1 ? 4 : 5); // only February can fit in 4 weeks
  // TODO: account for leap years
  return baseWeeks + (firstDay >= dayThreshold[month] ? 1 : 0); // add an extra week if the month starts beyond the threshold day.
}

function handleDateClick(e){
  modal.style.display = 'block';
}

function handleCloseClick(e){
  modal.style.display = 'none';
}

for (let i = 0; i < months.length; i++) {
  months[i].render();
}

closeButton.addEventListener('click', handleCloseClick);



