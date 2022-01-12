let clicked = null;
let events = sessionStorage.getItem('events') ? JSON.parse(sessionStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const eventContainer = document.getElementById('eventContainer');
const deleteEventContainer = document.getElementById('deleteEventContainer');
const eventTitleInput = document.getElementById('title');
const eventSTimeInput = document.getElementById('sTime');
const eventETimeInput = document.getElementById('eTime');
const eventTypeInput = document.getElementById('type');
const eventDescriptionInput = document.getElementById('description');
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//closes curent event's container
function closeDeletingEvent(){
    deleteEventContainer.style.display = 'none';
}
//deletes selected event
function deleteEvent(){
    events = events.filter(e => e.date !== clicked);
    sessionStorage.setItem('events', JSON.stringify(events));
    closeEventContainer();
}
//closes event container if close button is pressed
function closeEventContainer(){
    eventTitleInput.value = '';
    eventSTimeInput.value = '';
    eventETimeInput.value = '';
    eventTypeInput.value = '';
    eventDescriptionInput.value = '';
    clicked = null;
    eventContainer.style.display = 'none';
    deleteEventContainer.style.display = 'none';
    load();
}
//shows event container with event inputs
function showEventInformation(date){
    clicked = date; 
    eventContainer.style.display = 'flex';

    const eventForDay = events.find(e => e.date === clicked);
    if(eventForDay){
        document.getElementById('eventText').innerHTML = 'Event title: '+eventForDay.title;
        deleteEventContainer.style.display = 'block';
        eventContainer.style.display = 'none';
    }
}
//saves input information
function saveEvent(){
    if(eventTitleInput.value, eventSTimeInput.value, eventETimeInput.value, eventTypeInput.value){
        eventTypeInput.classList.remove('error');
        var eventDiv = document.querySelector('event');
        events.push({
            title: eventTitleInput.value,
            date: clicked,
            stime: eventSTimeInput.value,
            etime: eventETimeInput.value,
            type: eventTitleInput.value,
            description: eventDescriptionInput.value,
        });
        
        sessionStorage.setItem('events', JSON.stringify(events));
        closeEventContainer();
    }else{
        eventTypeInput.classList.add('error');
    }
}
//load function
function load() {
    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const firstDayOfmonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfmonth.toLocaleDateString('en-US',{
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const lastMonthDays = weekdays.indexOf(dateString.split(', ')[0]);
    document.getElementById('monthDisplay').innerHTML = `${dt.toLocaleDateString('en-US', {month: 'long'})} ${year}`;

    calendar.innerHTML = '';
    for(let i = 1; i <= lastMonthDays + daysInMonth; i++){
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        const dayString = `${i - lastMonthDays}/${month + 1}/${year}`;

        if(i > lastMonthDays){
            dayDiv.innerText = i - lastMonthDays;
            const eventForDay = events.find(e => e.date === dayString);
            if(eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerHTML = eventForDay.title;
                dayDiv.appendChild(eventDiv);
            }
            dayDiv.addEventListener('click', () => showEventInformation(dayString));
        }else{
            dayDiv.classList.add('lastMonthDays');
        }
        
        calendar.appendChild(dayDiv);
    }
}
//initialize function for diferent buttons
function initButtons(){
    document.getElementById('cancelCreateEvent').addEventListener('click',() =>{
        eventContainer.style.display = 'none';
        load();
    });
    document.getElementById('saveEvent').addEventListener('click', saveEvent);
    document.getElementById('closeButton').addEventListener('click', closeDeletingEvent);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
}

initButtons();
load();

//I didn't make a validation function. Also color code by event type.