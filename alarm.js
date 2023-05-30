
console.log('welcome alarm')
const hourE = document.getElementById('hours');
const minuteE = document.getElementById('minutes');
const secondE = document.getElementById('second');
const ampmE = document.getElementById('ampm');
const monthEl = document.getElementById('month');
const weekdayEl = document.getElementById('weekday');
const dayEl = document.getElementById('day');
const now = new Date();
const options = { weekday: 'long' };
const options1 = { month: 'long' };
const options2 = { day: 'numeric' };
const weekday = now.toLocaleString('en-US', options);
const month = now.toLocaleString('en-US', options1);
const day = now.toLocaleString('en-US', options2);
var Alarm = [];

const AlarmLS=JSON.parse( localStorage.getItem('Alarm'));
Alarm=AlarmLS;






function updateClock() {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

//working to ring the alarm
    weekdayEl.innerText = weekday;
    monthEl.innerText = month;
    dayEl.innerText = day;
    let ampm = 'am';
    if(h>=12){
ampm='pm';
    }
    if (h > 12) {
        h = h - 12;     
    }
  Alarm.forEach(element=>{
        if(h==Number(element.hours)&&m==Number(element.minutes)&&s==Number(element.seconds-3)&&ampm===element.zone){   
            const alertSound = document.getElementById("alert-sound");
            alertSound.play();

                function delayedExecution() {
                    console.log("This code will be executed after a 5-second delay.");
                   
                    alert(`your time ${element.hours}:${element.minutes}:${element.seconds} ${element.zone}`);
                    alertSound.pause();
                    alertSound.currentTime=0;
                  }
            setTimeout(delayedExecution,3000);   
        }
    })
    hourE.innerText =`${h}:` ;
    minuteE.innerText =`${m}:`;
    secondE.innerText = s;
    ampmE.innerText = ampm;
}
setInterval(updateClock, 1000);

const updateList=()=>{
    const alarmList=document.getElementById('alarm-list-container');
    alarmList.innerHTML='';

    Alarm.forEach(element=>{
        const newEl=document.createElement('div');
        newEl.className='alarm'
        newEl.innerHTML=`<div class="alarm-dec">
        <i class="fa-solid fa-bell"></i>
    </div>
    <div class="alarm-time"><span>${element.hours}:</span><span>${element.minutes}:</span><span>${element.seconds}</span><span>${element.zone}</span></div>
    <div class="alarm-delete" onclick="deleteAlarm(event)"><i class="fa-solid fa-trash" id="${element.id}" ></i></div>`
    alarmList.appendChild(newEl);
    })

}


const handleSubmit = (event) => {
    console.log('handle submmit is called');
    console.log(event);
    event.preventDefault()
    const secondsA = document.getElementById('secondsA');
    const minutesA = document.getElementById('minutesA');
    const hoursA = document.getElementById('hoursA');
    const zoneA = document.getElementById('zoneA');
    if(Number(secondsA.value)>60||Number(hoursA.value)>12||Number(minutesA.value)>60){
        alert('invalid time input')
        return;
    }
    let newalarm = {
        id:Date.now(),
        hours: hoursA.value,
        minutes: minutesA.value,
        seconds: secondsA.value,
        zone:zoneA.value
    }
    
    console.log(newalarm);
    Alarm.push(newalarm);

    let newArray=JSON.stringify(Alarm);
    localStorage.setItem('Alarm',newArray);
    toggle();
    hoursA.value='';
  minutesA.value='';
   secondsA.value='';
       updateList();
}

// working on add alarm function to show the pop 

const toggle = () => {
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


function deleteAlarm(event){
    event.preventDefault();
console.log(event.target.id);
let deleted=Alarm.filter(function(element){
    return element.id!=event.target.id;
})
console.log('your delete list is',deleted);
Alarm=deleted;
let newArray=JSON.stringify(Alarm);
localStorage.setItem('Alarm',newArray);

updateList();
}

updateList();