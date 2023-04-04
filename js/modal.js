'use strict';

let hours = ['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];

// Adds all the hours to the dropdown in the modal
function populateTimes() {
  const selectElement = document.getElementById('times');
  for (let i = 0; i < hours.length; i++) {
    let option = document.createElement('option');
    option.value = hours[i];
    option.textContent = hours[i];
    selectElement.appendChild(option);
  }
}

function handleAddEvent(event) {
  event.preventDefault();
  let submittedTime = document.getElementById('times').value;
  let eventTitle = event.target.eventTitle.value;
  console.log(eventTitle);
  console.log(submittedTime);

  let day;
  if (localStorage.getItem(selectedDay.id)) {
    day = new Day(JSON.parse(localStorage.getItem(selectedDay.id)));
  } else {
    day = new Day([]);
  }

  day.addEvent(submittedTime, eventTitle);
  day.saveToLocalStorage(selectedDay.id);
  displayEventsToCalendar(selectedDay);
  console.log('day', day);

  handleCloseClick();
}

function displayEventsToModal(td) {
  // If the td (day) has an event added to it, append event to the calendar
  let day;
  if (localStorage.getItem(td.id)) {
    day = new Day(JSON.parse(localStorage.getItem(td.id)));
  } else {
    day = new Day([]);
  }
  // clear all events in the td (day) first so that events don't show doubles on the calendar
  // when displaying.
  // let allEventsInDay = document.querySelectorAll(`#${td.id} .added-events`);
  // for (let i = 0; i < allEventsInDay.length; i++) {
  //   allEventsInDay[i].remove();
  // }
  let allEventsInDay = document.getElementById('events-container');
  allEventsInDay.innerHTML = '';

  // let day = new Day(JSON.parse(localStorage.getItem(td.id)));
  for (let i = 0; i < day.eventsOfDay.length; i++) {
    let newEventDiv = document.createElement('div');
    newEventDiv.classList.add('added-events');
    
    let eventTimeDisplay = document.createElement('p');
    let eventTitleDisplay = document.createElement('p');
    eventTimeDisplay.textContent = day.eventsOfDay[i].time;
    eventTitleDisplay.textContent = day.eventsOfDay[i].title;
    
    newEventDiv.id = i;
    
    
    let removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = '❌';
    newEventDiv.appendChild(removeButton);

    removeButton.addEventListener('click', function(){handleRemoveEvent(newEventDiv.id, td, day);});

    newEventDiv.appendChild(eventTimeDisplay);
    newEventDiv.appendChild(eventTitleDisplay);
    // td.appendChild(newEventDiv);
    allEventsInDay.appendChild(newEventDiv);
  }
  // }
}

function handleRemoveEvent(eventID, date, day){

  day.removeEvent(eventID, date.id);
  console.log('day', day);
  
  displayEventsToModal(date.id);

}

populateTimes();
addEventForm.addEventListener('submit', handleAddEvent);