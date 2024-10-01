let minutes = 0, seconds = 0, milliseconds = 0, interval;
let isRunning = false;
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const resetModal = document.getElementById('resetModal');
const confirmReset = document.getElementById('confirmReset');
const cancelReset = document.getElementById('cancelReset');
const toggleThemeBtn = document.getElementById('toggleTheme');
let darkMode = false;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', openResetModal);
confirmReset.addEventListener('click', resetTimer);
cancelReset.addEventListener('click', closeResetModal);
lapBtn.addEventListener('click', recordLap);
toggleThemeBtn.addEventListener('click', toggleTheme);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
        interval = setInterval(updateTime, 10);
    }
}

function stopTimer() {
    clearInterval(interval);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
    closeResetModal();
}

function updateTime() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

function recordLap() {
    const lapItem = document.createElement('li');
    lapItem.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    lapsList.appendChild(lapItem);
}

function openResetModal() {
    resetModal.style.display = 'flex';
}

function closeResetModal() {
    resetModal.style.display = 'none';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    darkMode = !darkMode;
    toggleThemeBtn.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
}
