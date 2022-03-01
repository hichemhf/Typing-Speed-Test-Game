"use strict";

/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

//* Array Of Words
const listOfAllWords = [
  "Hello",
  "Town",
  "Code",
  /* 
  "Programming",
  "Javascript",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing", */
];
const words = [...listOfAllWords];

//* Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
//* Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

let start = null;

//* Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let reset = document.querySelector(".reset");

//* Setting Level Name + Seconds + Score
lvlNameSpan.innerText = defaultLevelName;
secondsSpan.innerText = timeLeftSpan.innerText = defaultLevelSeconds;
scoreTotal.innerText = words.length;
// secondsSpan.innerText = defaultLevelSeconds;
// timeLeftSpan.innerText = defaultLevelSeconds;

//*Choose Level

const onLevelChange = (level) => {
  defaultLevelName = level;
  defaultLevelSeconds = lvls[level];
  lvlNameSpan.innerText = level;
  secondsSpan.innerText = timeLeftSpan.innerText = defaultLevelSeconds;
};

lvlNameSpan.addEventListener("click", (e) => {
  let i = 0;
  let lvlbcp = Object.keys(lvls)[0];

  for (const lvl in lvls) {
    if (Object.hasOwnProperty.call(lvls, lvl)) {
      if (lvl === defaultLevelName) {
        i++;
      } else if (i === 1) {
        lvlbcp = lvl;
        break;
      }
    }
  }
  onLevelChange(lvlbcp);
});

//* Disable Paste Event

// input.onpaste = e => {
//   e.preventDefault();
//   return false;
// };

input.addEventListener("paste", (e) => e.preventDefault());

//* Start Game
// startButton.addEventListener("click",console.log("hi"))
// startButton.addEventListener("click",console.log("hello"))

startButton.onclick = function () {
  this.hidden = true;
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerText = randomWord;
  // Empty Upcoming Words
  removeAllChildNodes(upcomingWords);
  upcomingWords.innerText = "";

  // Generate Words
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    fragment.append(div);
  }

  upcomingWords.append(fragment);

  // Call Start Play Function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerText = defaultLevelSeconds;
  start = setInterval(() => {
    timeLeftSpan.innerText--;
    if (timeLeftSpan.innerText === "0") {
      // Stop Timer
      clearInterval(start);
      if (theWord.innerText.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerText++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upcomingWords.hidden = true;
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

//* reset
reset.addEventListener("click", (e) => {
  clearInterval(start);

  // words.splice(0, words.length);
  words.splice(0);

  words.push(...listOfAllWords);
  //Array.prototype.push.apply(words, listOfAllWords);
  // words.push.apply(words, listOfAllWords);

  input.value = "";

  onLevelChange(defaultLevelName);

  scoreGot.innerText = 0;
  startButton.hidden = false;
  theWord.innerText = "";
  // finishMessage.innerText = "";
  removeAllChildNodes(finishMessage);
  removeAllChildNodes(upcomingWords);
  upcomingWords.innerText = "Words Will Show Here";
  upcomingWords.hidden = false;
});

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
