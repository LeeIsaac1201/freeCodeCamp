/* eslint-env browser */

// Initial values for break and session lengths
let breakLength = 5;
let sessionLength = 25;

// References to key Document Object Model (DOM) elements
const timerLabel = document.getElementById("timer-label");
const timeLeftDisplay = document.getElementById("time-left");
const breakLengthDisplay = document.getElementById("break-length");
const sessionLengthDisplay = document.getElementById("session-length");
const beep = document.getElementById("beep");

// Timer variables
let timerInterval = null;
let timerRunning = false;
let currentMode = "Session";
let timeLeft = sessionLength * 60;

// Format timeLeft (in seconds) into mm:ss and update the display
function updateTimeDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timeLeftDisplay.textContent = `${minutes}:${seconds}`;
}

// Update break and session displays; when timer is not running, also update time-left.
function updateDisplays() {
  breakLengthDisplay.textContent = breakLength;
  sessionLengthDisplay.textContent = sessionLength;
  if (!timerRunning) {
    timeLeft = currentMode === "Session" ? sessionLength * 60 : breakLength * 60;
    updateTimeDisplay();
  }
}

// Reset function to clear intervals and reset all settings and displays.
function resetClock() {
  clearInterval(timerInterval);
  timerRunning = false;
  breakLength = 5;
  sessionLength = 25;
  currentMode = "Session";
  timeLeft = sessionLength * 60;
  updateDisplays();
  timerLabel.textContent = "Session";
  beep.pause();
  beep.currentTime = 0;
}

// Start or pause the timer
function startStopTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  } else {
    timerRunning = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimeDisplay();

      // When countdown reaches below 0, switch modes.
      if (timeLeft < 0) {
        beep.play();
        if (currentMode === "Session") {
          currentMode = "Break";
          timerLabel.textContent = "Break";
          timeLeft = breakLength * 60;
        } else {
          currentMode = "Session";
          timerLabel.textContent = "Session";
          timeLeft = sessionLength * 60;
        }
        updateTimeDisplay();
      }
    }, 1000);
  }
}

// Update break length (ensuring limits between 1 and 60) when timer is not running.
function changeBreakLength(amount) {
  if (!timerRunning) {
    const newLength = breakLength + amount;
    if (newLength >= 1 && newLength <= 60) {
      breakLength = newLength;
      updateDisplays();
    }
  }
}

// Update session length (ensuring limits between 1 and 60) when timer is not running.
function changeSessionLength(amount) {
  if (!timerRunning) {
    const newLength = sessionLength + amount;
    if (newLength >= 1 && newLength <= 60) {
      sessionLength = newLength;
      updateDisplays();
    }
  }
}

// Event Listeners for all buttons
document.getElementById("reset").addEventListener("click", resetClock);
document.getElementById("start_stop").addEventListener("click", startStopTimer);
document.getElementById("break-decrement").addEventListener("click", () => changeBreakLength(-1));
document.getElementById("break-increment").addEventListener("click", () => changeBreakLength(1));
document.getElementById("session-decrement").addEventListener("click", () => changeSessionLength(-1));
document.getElementById("session-increment").addEventListener("click", () => changeSessionLength(1));

// Initialise displays on page load.
updateDisplays();
