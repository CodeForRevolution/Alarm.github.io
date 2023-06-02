
const hourE = document.getElementById('hours');  //acessing the hour element from frontend to dispaly the clock
const minuteE = document.getElementById('minutes');//acessing the minutes element from frontend to dispaly the clock
const secondE = document.getElementById('second');//acessing the seconds element from frontend to dispaly the clock
const ampmE = document.getElementById('ampm'); //acessing the ampm element from frontend to dispaly the clock
const monthEl = document.getElementById('month');//acessing the mont element from frontend to dispaly the clock
const weekdayEl = document.getElementById('weekday');//acessing the weekday element from frontend to dispaly the clock
const dayEl = document.getElementById('day');
const now = new Date();
const options = { weekday: 'long' };
const options1 = { month: 'long' };
const options2 = { day: 'numeric' };
const weekday = now.toLocaleString('en-US', options);
const month = now.toLocaleString('en-US', options1);
const day = now.toLocaleString('en-US', options2);
var Alarm = [];//making a empty array to hold the alarm list

const AlarmLS = JSON.parse(localStorage.getItem('Alarm'));//checing in local storage for previous alarms
Alarm = AlarmLS;//putting the alarms from local storage to a array Alarm
if (Alarm == null) {
    Alarm = [];
}









function updateClock() {
    let h = new Date().getHours();//fetching current hours
    let m = new Date().getMinutes();//fetching current min
    let s = new Date().getSeconds();//fetchin current seconds

    //working to ring the alarm
    weekdayEl.innerText = weekday;//diplaying the weeday 
    monthEl.innerText = month;// displaying the month 
    dayEl.innerText = day;//displaying the day 
    let ampm = 'am';
    if (h >= 12) {    //checking whether its am or pm
        ampm = 'pm';
    }
    if (h > 12) {
        h = h - 12;     //managing to display the hour in 12 hours format
    }


    if (Alarm != null) {

        Alarm.forEach(element => {
            if (h == Number(element.hours) && m == Number(element.minutes) && s == Number(element.seconds)-1 && ampm === element.zone) {//checking each alarm from alarm list for ring the alarm
                const alertSound = document.getElementById("alert-sound");
                alertSound.play();//playing the alarm sound when alarm initiate

                function delayedExecution() {
                    alert(`your time ${element.hours}:${element.minutes}:${element.seconds} ${element.zone}`);
                    alertSound.pause();
                    alertSound.currentTime = 0;
                }
                setTimeout(delayedExecution, 1000);   //making delay to get the time to buffer the song to audio element
            }
        })

    }

    hourE.innerText = `${h}:`;
    minuteE.innerText = `${m}:`;
    secondE.innerText = s;
    ampmE.innerText = ampm;
}





setInterval(updateClock, 1000);//calling the updateClock for every second 






const updateList = () => {
    const alarmList = document.getElementById('alarm-list-container');
    alarmList.innerHTML = '';
    if (Alarm != null) {
    Alarm.forEach(element => { //iterating over the Alarm to display each alarm in the list
            const newEl = document.createElement('div');
            newEl.className = 'alarm'
            newEl.innerHTML = `<div class="alarm-dec">
        <i class="fa-solid fa-bell"></i>
    </div>
    <div class="alarm-time"><span>${element.hours}:</span><span>${element.minutes}:</span><span>${element.seconds}</span><span>${element.zone}</span></div>
    <div class="alarm-delete" onclick="deleteAlarm(event)"><i class="fa-solid fa-trash" id="${element.id}" ></i></div>`
            alarmList.appendChild(newEl);
        })

    }


}


const handleSubmit = (event) => {
    console.log('handle submmit is called');
    console.log(event);
    event.preventDefault()
    const secondsA = document.getElementById('secondsA');
    const minutesA = document.getElementById('minutesA');
    const hoursA = document.getElementById('hoursA');
    const zoneA = document.getElementById('zoneA');
    if (Number(secondsA.value) > 60 || !secondsA.value || Number(hoursA.value) > 12 || !hoursA.value || Number(minutesA.value) > 60 || !minutesA.value) {   //handling the invalid input while creating a Alarm
        alert('invalid time input')
        return;
    }
    let newalarm = {   //if alarm input valid then creating the alarm object in Alarm array
        id: Date.now(),
        hours: hoursA.value,
        minutes: minutesA.value,
        seconds: secondsA.value,
        zone: zoneA.value
    }

    console.log(newalarm);
    Alarm.push(newalarm);

    let newArray = JSON.stringify(Alarm);
    localStorage.setItem('Alarm', newArray);//setting the new list to local storage 
    toggle();
    hoursA.value = '';
    minutesA.value = '';   //when the pop appear the input should be blanked
    secondsA.value = '';
    updateList();
}

// working on add alarm function to show the pop 

const toggle = () => {   //toggle the create alarm form
    toggelEl.classList.toggle('active');

    console.log('you have click the add buttion');
}
const toggelEl = document.getElementById('alarm-container');
const addAlarmEl = document.getElementById('add-alarm');
console.log(addAlarmEl);
addAlarmEl.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    toggle();
});


function deleteAlarm(event) {
    event.preventDefault();
    console.log(event.target.id);
    let deleted = Alarm.filter(function (element) {  //filtering all the alarm expect delete alarm 
        return element.id != event.target.id;
    })
    console.log('your delete list is', deleted);
    Alarm = deleted;
    let newArray = JSON.stringify(Alarm);
    localStorage.setItem('Alarm', newArray);//again storing the all alarm to local storage for persistance

    updateList();
}

updateList();