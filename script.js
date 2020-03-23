const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Word list for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving"
];

let randomWord; // initialize word
let score = 0; // init score
let time = 10; // init time

// init difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

text.focus(); // Focus on input text on page load

// Start time count down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDoM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Score update
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time func
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver(); // End game
  }
}

// Game over, show end Screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Opss time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Play again</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDoM();

// Event listeners

// Typing
text.addEventListener("input", e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDoM();
    updateScore();

    e.target.value = ""; // clear input field

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
