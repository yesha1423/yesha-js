const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

const start = document.getElementById('start');
const reset = document.getElementById('reset');

const disp = document.getElementById('disp');

var interval = null;
var total = 0;

TotalValue = () => {
    total = Number(hour.value)*3600 + Number(minute.value)*60 + Number(second.value);
}

const Timer =() => {
    
    TotalValue();
    total--;

    
    if (total >= 0) {
        var hr = Math.floor(total / 3600);
        var min = Math.floor(total / 60) - (hr * 60);
        var sec = Math.floor(total % 60);

        hour.value = hr;
        minute.value = min;
        second.value = sec;
    }
    else {
        disp.innerText = "Time's up!";
    }
}

    
start.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(Timer, 1000);

    disp.innerText = "Timer Started";
});

reset.addEventListener('click', () => {
    clearInterval(interval);

    hour.value = 0;
    minute.value = 0;
    second.value = 0;
});

let arr = [
    "Your self-worth is determined by you. You don't have to depend on someone telling you who you are. — Beyoncé",
    "Nothing is impossible. The word itself says 'I'm possible!' — Audrey Hepburn",
    "Keep your face always toward the sunshine, and shadows will fall behind you. — Walt Whitman",
    "I am lucky that whatever fear I have inside me, my desire to win is always stronger. — Serena Williams",
    "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
    "Attitude is a little thing that makes a big difference. — Winston Churchill",
    "You just gotta keep going and fighting for everything, and one day you’ll get to where you want. — Naomi Osaka",
    "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come. — Dwayne Johnson",
    "Failure doesn’t mean you are a failure it just means you haven’t succeeded yet. ― Robert H. Schuller",
    "There is no secret to success. It is the result of preparation, hard work, and learning from failure. – General Colin Powell",
    "Ninety-nine percent of the failures come from people who have the habit of making excuses. – George Washington Carver"
];

let currentIndex = 0;
setInterval(() => {
    currentIndex = (currentIndex + 1) % arr.length;
    document.querySelector("#qts").innerText = arr[currentIndex];
}, 1000);