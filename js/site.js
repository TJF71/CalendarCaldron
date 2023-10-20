const events = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

function buildDropDown() {

    // get all the events that we know about
    let currentEvents = getEvents();

    // get a list of unique city names
    let eventCities = currentEvents.map(event => event.city);
    let uniqueCities = new Set(eventCities);
    let dropdownChoices = ['All',...uniqueCities];

    const dropdownTemplate = document.getElementById('dropdown-item-template');
    const dropdownMenu = document.getElementById('city-dropdown');
    dropdownMenu.innerHTML = ''; //clear the old drop down menu

    // for each of the city names:
    for (let i = 0; i < dropdownChoices.length; i++) {
        
        let cityName = dropdownChoices[i];

        //  - make a dropdown item HTML element
        let dropdownItem = dropdownTemplate.content.cloneNode(true);
        // let dropdownItm = <li><a class="dropdown-item" href="#"></a></li>
        dropdownItem.querySelector('a').innerText = cityName;

        //  - add that element to the dropdown menu
        dropdownMenu.appendChild(dropdownItem);
    }

    displayEvents(currentEvents);
    displayStats(currentEvents);
    document.getElementById('stats-location').innerHTML = 'All';
}

function getEvents() {
    //TODO: get events from local storage
    let eventsJson = localStorage.getItem('tjf-events');

    let storedEvents = events;

    if (eventsJson == null){
        saveEvents(events);
    } else {
        storedEvents = JSON.parse(eventsJson);
    }

    return storedEvents;
}

function saveEvents(events) {

    let eventsJson = JSON.stringify(events);

    localStorage.setItem('tjf-events', eventsJson);

}

function displayEvents(events) {

    // get the table to put the events in 

    const eventTable = document.getElementById('events-table');

    // clear the table.

    eventTable.innerHTML = '';

    // loop through events

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        //  - fill the table with rows
        //  - make a <tr></tr>
        let eventRow = document.createElement('tr');

        //  - make a <td> for each property
                //  - put the data into each <td>
        let eventName = document.createElement('td');
        eventName.innerText = event.event;
        eventRow.appendChild(eventName);

        let eventCity = document.createElement('td');
        eventCity.innerText = event.city;
        eventRow.appendChild(eventCity);

        let eventState = document.createElement('td');
        eventState.innerText = event.state;
        eventRow.appendChild(eventState);

        let eventAttendance = document.createElement('td');
        eventAttendance.innerText = event.attendance.toLocaleString();
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        let date = new Date(event.date);  // variable for date styling
        eventDate.innerText - date.toLocaleDateString();  // change the HTML
        eventRow.appendChild(eventDate); // add the date
 
        eventDate.innerText = event.date;
        eventRow.appendChild(eventDate);

        //  - append the row to the <tbody>
        eventTable.appendChild(eventRow);  
    
    }
}

// ORIGINAL SEPERATE FUNCTIONS BELOW
// function sumAttendance(events){
//     let sum = 0;

//     for (let i = 0; i < events.length; i++){
//         let event = events[i];
        
//         sum += event.attendance;
//     }

//     return sum;
// }

// function avgAttendance (events){
//     let sum = 0;
//     let count = 0;
//     let avg = 0;

//     for (let i = 0; i < events.length; i++){
//         let event = events[i];
//         count ++
//         sum += event.attendance;
//     }

//     avg = sum / count;

//     return avg;

// }

// function minAttendance (events) {
//     let event = events[0];
//     let min = event.attendance;

//     for (let i = 0; i < events.length; i++){
//         event = events[i];
//         if (event.attendance < min) {
//             min = event.attendance
//         }
//     }

//     return min

// }

// function maxAttendance(events) {
//     // let event = events[0];
//     let max = events[0].attendance;

//     for(let i = 0; i < events.length; i++) {
//         let event = events[i];
//         if (event.attendance > max){
//             max = event.attendance;
//         }
    

//     }

//     return max;

// }


function calcluateStats(events){
    
    let sum = 0;
    let min = events[0].attendance;
    let max = events[0].attendance;

    for (let i = 0; i < events.length; i++){
        let event = events[i];
        
        sum += event.attendance;
        
        if (event.attendance < min)  {
            min = event.attendance
        }  
        
        if (event.attendance > max) {
            max = event.attendance;
        }
    }

    let average = sum / events.length;

    let stats = {
        sum: sum,
        average: average,
        min: min,
        max: max
    }

    return stats;

}


function displayStats(events) {
    let stats = calcluateStats(events);

    document.getElementById('total-attendance').innerHTML = stats.sum.toLocaleString();

    document.getElementById('avg-attendance').innerHTML = Math.round(stats.average).toLocaleString();

    document.getElementById('min-attended').innerHTML = stats.min.toLocaleString();

    document.getElementById('max-attended').innerHTML = stats.max.toLocaleString();

}

function filterByCity(element) {
    // figure out which city we want 
    let cityName = element.textContent;

    document.getElementById('stats-location').innerHTML = cityName;


    // get all the events
    let allEvents = getEvents();

    // filter to just one city
    let filteredEvents = [];

 
//     LOOP SOLUTION
//     for (let i = 0; i <allEvents.length; i++){
//         let event = allEvents[i];

//         if(event.city == cityName || cityName == 'All') {
//         filteredEvents.push(event);
//     }
// }

    //ALTERNATE TO FOR LOOP ABOVE
    if (cityName == 'All') {
        filteredEvents = allEvents;
    } else {
        filteredEvents = allEvents.filter(event => event.city == cityName); 
    }

    // ALTERNATE WITH ONE LINE OF CODE 
    // let filteredEvents = cityName == 'All' ? allEvents : allEvents.filter(e => e.city == cityName);

    // call display stats with the events for that city
    displayStats(filteredEvents);
    
    // call display events with the events for that city
    displayEvents(filteredEvents);


}

function saveNewEvent() {

    // get the HTML form element
    let newEventForm = document.getElementById('newEventForm');
    let formData = new FormData(newEventForm);
    let newEvent = Object.fromEntries(formData.entries());

    // create an object from the inputs
    newEvent.attendance = parseInt(newEvent.attendance);  // change string to numbers
    newEvent.date = new Date(newEvent.date).toLocaleDateString();  // change date to local date format

    // get all the current events
    let allEvents = getEvents();

    // add our new event
    allEvents.push(newEvent);

    // save all events witht eh new event
    saveEvents(allEvents);

    //rest the form inputs
    newEventForm.reset();

    // hide the bootsrap modal
    let modalElement = document.getElementById('exampleModal');
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();

    //dispaly all events
    buildDropDown();
}