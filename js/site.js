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

    // to be continued...?
    displayEvents(currentEvents);
    displayStats(currentEvents);

}

function getEvents() {
    //TODO: get events from local storage
    return events;
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
        eventAttendance.innerText = event.attendance;
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        eventDate.innerText = event.date;
        eventRow.appendChild(eventDate);

        //  - append the row to the <tbody>
        eventTable.appendChild(eventRow);  
    
    }
}

function sumAttendance(events){
    let sum = 0;

    for (let i = 0; i < events.length; i++){
        let event = events[i];
        
        sum += event.attendance;
    }

    return sum;
}

function avgAttendance (events){
    let sum = 0;
    let count = 0;
    let avg = 0;

    for (let i = 0; i < events.length; i++){
        let event = events[i];
        count ++
        sum += event.attendance;
    }

    avg = sum / count;

    return avg;

}

function minAttendance (events) {




    let event = events[0];
    let min = event.attendance;

    for (let i = 0; i < events.length; i++){
        event = events[i];
        if (event.attendance < min) {
            min = event.attendance
        }
    }

    return min

}

function maxAttendance(events) {
    // let event = events[0];
    let max = events[0].attendance;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];
        if (event.attendance > max){
            max = event.attendance;
        }
    

    }

    return max;

}




function displayStats(events) {
    // calculating the total attendence
    let total = sumAttendance(events);
    document.getElementById('total-attendance').innerHTML = total.toLocaleString();

    // calculatinag and displaying  the avg attendande
    let average = avgAttendance(events);
    document.getElementById('avg-attendance').innerHTML = Math.round(average).toLocaleString();

    // calcluate and display min attendance
    let min = minAttendance(events);
    document.getElementById('min-attended').innerHTML = min.toLocaleString();

    // calcluate and display max attendance
    let max = maxAttendance(events);
    document.getElementById('max-attended').innerHTML = max.toLocaleString();

}
