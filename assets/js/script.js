$(document).ready(function() {
// Code to display the current date in the header of the page.
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
// const currentHour = dayjs().hour();
        
// Display the current hour in the "current-hour" element
// const currentHourElement = document.getElementById('currenthour');
// currentHourElement.textContent = `Current Hour: ${currentHour}`;


  function generateHourlyRows() {
      const hourlyRowsContainer = $('#hourly-rows');
      const now = new Date();
      const currentHour = now.getHours();

      for (let hour = 9; hour <= 17; hour++) {
          const hourRow = $('<div>');
          hourRow.attr('id', `hour-${hour}`);
          hourRow.addClass('row time-block');
          
          if (hour < currentHour) {
              hourRow.addClass('past');
          } else if (hour === currentHour) {
              hourRow.addClass('present');
          } else {
              hourRow.addClass('future');
          }

          const hourCol = $('<div>');
          hourCol.addClass('col-2 col-md-1 hour text-center py-3');
          hourCol.text(`${hour % 12 || 12} ${hour >= 12 ? 'PM' : 'AM'}`);
          hourRow.append(hourCol);

          const textarea = $('<textarea>');
          textarea.addClass('col-8 col-md-10 description');
          textarea.attr('rows', 3);
          hourRow.append(textarea);

          const button = $('<button>');
          button.addClass('btn saveBtn col-2 col-md-1');
          button.attr('aria-label', 'save');
          button.on('click', function() {
              const textareaContent = textarea.val();
              localStorage.setItem(hourRow.attr('id'), textareaContent);
          });

          const icon = $('<i>');
          icon.addClass('fas fa-save');
          button.append(icon);
          hourRow.append(button);

          // Load saved content from local storage
          const savedContent = localStorage.getItem(hourRow.attr('id'));
          if (savedContent) {
              textarea.val(savedContent);
          }

          hourlyRowsContainer.append(hourRow);
      }
  }

  // Call the function to generate hourly rows
  generateHourlyRows();
});

  
