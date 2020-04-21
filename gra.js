const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which of the following type of variable is visible everywhere in your JavaScript code?",
    choice1: "global variable",
    choice2: "local variable",
    choice3: "Both of the above",
    choice4: "None of the above",
    answer: 1
  },
  {
    question:
      "Which built-in method calls a function for each element in the array?",
    choice1: "while()",
    choice2: "loop()",
    choice3: "forEach()",
    choice4: "None of the above",
    answer: 3
  },
  {
    question: "Which built-in method returns the calling string value converted to lower case?",
    choice1: "toLowerCase()",
    choice2: "toLower()",
    choice3: "changeCase(case)",
    choice4: "None of the above",
    answer: 1
  },
  {
    question: "Which of the following function of Boolean object returns a string of either 'true' or 'false' depending upon the value of the object?",
    choice1: "toSource()",
    choice2: "valueOf()",
    choice3: "toString()",
    choice4: "None of the above",
    answer: 3
  },
  {
    question: "Which of the following function of String object returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order?",
    choice1: "localeCompare()",
    choice2: "search()",
    choice3: "substr()",
    choice4: "concat()",
    answer: 1
  },
  {
    question: "Which of the following function of String object returns the calling string value converted to upper case?",
    choice1: "toLocaleUpperCase()",
    choice2: "toUpperCase()",
    choice3: "toString()",
    choice4: "substring()",
    answer: 2
  },
  {
    question: "Which of the following function of String object causes a string to be displayed in fixed-pitch font as if it were in a <tt> tag?",
    choice1: "fixed()",
    choice2: "big()",
    choice3: "blink()",
    choice4: "bold()",
    answer: 1
  },
  {
    question: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
    choice1: "pop()",
    choice2: "push()",
    choice3: "join()",
    choice4: "map()",
    answer: 2
  },
  {
    question: "Which of the following function of Array object sorts the elements of an array?",
    choice1: "toSource()",
    choice2: "sort()",
    choice3: "toString()",
    choice4: "unshift()",
    answer: 2
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<js>",
    choice2: "<javascript>",
    choice3: "<scripting>",
    choice4: "<script>",
    answer: 4
  },
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("koniec.html");
  }
  questionCounter++;
  progressText.innerText = `Pytanie ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();