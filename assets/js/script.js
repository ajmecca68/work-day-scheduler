// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  
  const timeBlocks = document.querySelectorAll('.time-block');

  timeBlocks.forEach(timeBlock => {
      const inputField = timeBlock.querySelector('input');
      const timeBlockId = timeBlock.id;

      // Load saved value from local storage on page load
      const savedValue = localStorage.getItem(timeBlockId);
      if (savedValue) {
          inputField.value = savedValue;
      }

      // Add input event listener to save input value to local storage
      inputField.addEventListener('input', (event) => {
          const inputValue = event.target.value;
          localStorage.setItem(timeBlockId, inputValue);
      });
  });

});

// TODO: Add code to display the current date in the header of the page.
function updateDateAndDay() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDateAndDay = now.toLocaleDateString(undefined, options);
  const dateTimeContainer = document.getElementById('datetime');
  dateTimeContainer.textContent = formattedDateAndDay;
}

// Call the function initially and then set it to update every day
updateDateAndDay();
// Update every 24 hours (86400000 milliseconds)
setInterval(updateDateAndDay, 86400000); 

// Get the current hour using Day.js
const currentHour = dayjs().hour();
        
// Display the current hour in the "current-hour" element
const currentHourElement = document.getElementById('currenthour');currentHourElement.textContent = `Current Hour: ${currentHour}`;

function generateHourlyRows() {
  const hourlyRowsContainer = document.getElementById('hourly-rows');
  const now = new Date();
  const currentHour = now.getHours();

    for (let hour = 9; hour <= 17; hour++) {
        const hourRow = document.createElement('div');
        hourRow.id = `hour-${hour}`;
        hourRow.classList.add('row', 'time-block');
                
        if (hour < currentHour) {
            hourRow.classList.add('past');
        } else if (hour === currentHour) {
            hourRow.classList.add('present');
        } else {
            hourRow.classList.add('future');
        }

  const hourCol = document.createElement('div');
        hourCol.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
        hourCol.textContent = `${hour % 12 || 12} ${hour >= 12 ? 'PM' : 'AM'}`;
        hourRow.appendChild(hourCol);

  const textarea = document.createElement('textarea');
        textarea.classList.add('col-8', 'col-md-10', 'description');
        textarea.rows = 3;
        hourRow.appendChild(textarea);

  const button = document.createElement('button');
        button.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
        button.setAttribute('aria-label', 'save');

  const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-save');
        button.appendChild(icon);
        hourRow.appendChild(button);

        hourlyRowsContainer.appendChild(hourRow);
    }
}

// Call the function to generate hourly rows
generateHourlyRows();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  
