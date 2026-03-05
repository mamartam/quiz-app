// CONNECTION WITH DOM

// welcome page section
const startBtn = document.querySelector(".start-btn");
const welcomePageSection = document.querySelector(".welcome-page-section");
const chooseTopicSection = document.querySelector(".choose-topic-section");
// choose topic section
const topics = document.querySelector(".topics-container");
const goToTheComplexitySectionBtn = document.querySelector(
  ".go-to-the-complexity-section-btn",
);
const topicBtns = document.querySelectorAll(".topic-btn");
// choose complexity level section
const backToTheTopicsBtn = document.querySelector(".back-to-the-topics-btn");
const startQuiz = document.querySelector(".start-quiz");
const complexityBtnsContainer = document.querySelector(
  ".complexity-btns-container",
);
const complexitySection = document.querySelector(".complexity-section");
const complexityButtons = document.querySelectorAll(".complexity-btn");

// quiz section
const quizSection = document.querySelector(".quiz-section");
const quizInfoTopic = document.querySelector(".quiz-info-topic");
const quizInfoLevel = document.querySelector(".quiz-info-level");

const numberOfQuestion = document.querySelector(".number-of-question");
const questionHeader = document.querySelector(".question-header");
const answersOptionsArray = document.querySelectorAll(".option");
const answersOptionContainer = document.querySelector(
  ".answers-option-container",
);
// const nextQuestionBtn = document.querySelector(".next-question-btn");
// const finishBtn = document.querySelector(".finish-btn");
const userPoints = document.querySelector(".user-points");

// Result section
const resultsSection = document.querySelector(".results-section");
const playAgainBtn = document.querySelector(".play-again");

// GENERAL VARIABLES AND STARTING VALUES

const USER_CHOICE = {
  topic: null,
  complexity: null,
  easyTimeLimit: 10,
  mediumTimeLimit: 7,
  hardTimeLimit: 2,
};
const quizTopicsArray = ["front-end", "pop-culture", "random"];
const quizComplexityArray = ["easy", "medium", "hard"];

let usersAnswersForquestions = [];
let questionNumber = 0;

// START FUNCTIONS SECTION----------------------------------
function hideAndRemoveClassNames(addClassName, removeClassName) {
  addClassName.classList.add("hide");
  removeClassName.classList.remove("hide");
}
function userIsChoosingTopicAndComplexity(event, array, key, btn) {
  let usersClick = event.target;
  let hidebtn = false;

  for (let i = 0; i < array.length; i++) {
    if (usersClick.classList.contains(array[i])) {
      USER_CHOICE[`${key}`] = array[i];

      hidebtn = true;

      break;
    } else {
      hidebtn = false;
    }
  }
  if (hidebtn === true) {
    btn.classList.remove("hide");
  } else {
    btn.classList.add("hide");
  }
}

function getRandomNumber(max) {
  let min = 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function insertingDataIntoHTMLTag(array, arrayElementIndex) {
  numberOfQuestion.textContent = questionNumber + 1;
  questionHeader.textContent = array[arrayElementIndex].question;
  answersOptionsArray.forEach((element, index) => {
    element.textContent = array[arrayElementIndex].options[index];
  });
}
function getResults(array) {
  let countCorrectAnswers = 0;
  array.forEach((element) => {
    if (element === "correct") {
      countCorrectAnswers++;
    }
  });
  return countCorrectAnswers;
}
function applyActiveClassToClickedButton(event, elementClassName, buttons) {
  let clicked = event.target;
  if (clicked.classList.contains(elementClassName)) {
    buttons.forEach((element) => {
      element.classList.remove("active-btn");
    });
    clicked.classList.add("active-btn");
  } else {
    return;
  }
}
function nextQuestion() {
  questionNumber++;
  dataClone.splice(index, 1);
  console.log(dataClone.length);
  console.log(usersAnswersForquestions);
  randomNumber = getRandomNumber(dataClone.length);
  index = randomNumber - 1;
  console.log(randomNumber);
  answersOptionsArray.forEach((element) => {
    element.classList.remove("correct-answer");
    element.classList.remove("wrong-answer");
    element.disabled = false;
  });
  insertingDataIntoHTMLTag(dataClone, index);
}
function lastQuestion() {
  userPoints.textContent = getResults(usersAnswersForquestions);
  hideAndRemoveClassNames(quizSection, resultsSection);
  clearInterval(timer);
}

// END FUNCTIONS SECTION------------------------------------

// Welcome page section script
startBtn.addEventListener("click", () => {
  hideAndRemoveClassNames(welcomePageSection, chooseTopicSection);
  console.log(
    JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage")) || {},
  );
});

// Topic section script
topics.addEventListener("click", (event) => {
  userIsChoosingTopicAndComplexity(
    event,
    quizTopicsArray,
    "topic",
    goToTheComplexitySectionBtn,
  );
});

goToTheComplexitySectionBtn.addEventListener("click", () => {
  hideAndRemoveClassNames(chooseTopicSection, complexitySection);
});
topics.addEventListener("click", (event) => {
  applyActiveClassToClickedButton(event, "topic-btn", topicBtns);
});

// Complexity section script
backToTheTopicsBtn.addEventListener("click", () => {
  hideAndRemoveClassNames(complexitySection, chooseTopicSection);
});

complexityBtnsContainer.addEventListener("click", (event) => {
  userIsChoosingTopicAndComplexity(
    event,
    quizComplexityArray,
    "complexity",
    startQuiz,
  );
});
complexityBtnsContainer.addEventListener("click", (event) => {
  applyActiveClassToClickedButton(event, "complexity-btn", complexityButtons);
});

startQuiz.addEventListener("click", () => {
  quizSection.classList.remove("hide");
  complexitySection.classList.add("hide");
  console.log(USER_CHOICE);
  quizInfoTopic.textContent = USER_CHOICE.topic;
  quizInfoLevel.textContent = USER_CHOICE.complexity;
  getQuestion();
  if (USER_CHOICE.complexity === "easy") {
    timeLimitation = USER_CHOICE.easyTimeLimit - 1;
  } else if (USER_CHOICE.complexity === "medium") {
    timeLimitation = USER_CHOICE.mediumTimeLimit - 1;
  } else if (USER_CHOICE.complexity === "hard") {
    timeLimitation = USER_CHOICE.hardTimeLimit - 1;
  }

  startTimer(timeLimitation);
});

// Quiz section script

let time = null;
const countDownClock = document.querySelector(".count-down-clock");

let timer = null;
let minutes = 0;
let seconds = 59;

function startTimer(selectedMinutes) {
  if (timer) {
    clearInterval(timer);
  }

  minutes = selectedMinutes;
  seconds = 59;

  updateCountDown();
  timer = setInterval(updateCountDown, 1000);
}
function updateCountDown() {
  countDownClock.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  if (minutes === 0 && seconds === 0) {
    userPoints.textContent = getResults(usersAnswersForquestions);
    let historyOfResultsFromLocalStorage =
      JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage")) ||
      historyOfResults;
    for (i in historyOfResults) {
      console.log(i);
      if (historyOfResultsFromLocalStorage[`${i}`] !== null) {
        let topicLevel = document.querySelector(`.${i}`);
        let userScore = topicLevel.querySelector(".user-score");
        topicLevel.querySelector(".user-result").classList.remove("hide");
        topicLevel.querySelector(".empty-result").classList.add("hide");
        userScore.textContent = historyOfResultsFromLocalStorage[i];
      }
    }
    let topicLevel = document.querySelector(
      `.${USER_CHOICE.topic}-${USER_CHOICE.complexity}`,
    );
    console.log(topicLevel);

    topicLevel.querySelector(".user-result").classList.remove("hide");
    topicLevel.querySelector(".empty-result").classList.add("hide");
    let userScore = topicLevel.querySelector(".user-score");
    console.log(userScore);

    let key = `${USER_CHOICE.topic}-${USER_CHOICE.complexity}`;
    console.log(historyOfResultsFromLocalStorage[key]);
    if (historyOfResultsFromLocalStorage[key] === null) {
      console.log("it's null");
      historyOfResultsFromLocalStorage[key] = getResults(
        usersAnswersForquestions,
      );
    } else {
      console.log("it's NOT null");

      if (
        historyOfResultsFromLocalStorage[key] >
        getResults(usersAnswersForquestions)
      ) {
        historyOfResultsFromLocalStorage[key] =
          historyOfResultsFromLocalStorage[key];
      } else if (
        historyOfResultsFromLocalStorage[key] ===
        getResults(usersAnswersForquestions)
      ) {
        historyOfResultsFromLocalStorage[key] = getResults(
          usersAnswersForquestions,
        );
      } else {
        historyOfResultsFromLocalStorage[key] = getResults(
          usersAnswersForquestions,
        );
      }
    }

    console.log(historyOfResults);
    localStorage.setItem(
      "arrayOfResultsInLocalStorage",
      JSON.stringify(historyOfResultsFromLocalStorage),
    );
    let array = JSON.parse(
      localStorage.getItem("arrayOfResultsInLocalStorage"),
    );
    console.log(array);
    userScore.textContent = array[key];

    countDownClock.textContent = "Time is up!";
    clearInterval(timer);
    hideAndRemoveClassNames(quizSection, resultsSection);
    return;
  }

  if (seconds === 0) {
    seconds = 59;
    minutes--;
  } else {
    seconds--;
  }
}

let dataClone = [];
let index = 0;
let randomNumber = 0;
let quantityOfQuestions = null;

async function getQuestion() {
  try {
    let link = `js/${USER_CHOICE.topic}/${USER_CHOICE.complexity}.json`;
    let response = await fetch(link);
    const data = await response.json();

    dataClone = JSON.parse(JSON.stringify(data));

    randomNumber = getRandomNumber(dataClone.length);
    index = randomNumber - 1;
    quantityOfQuestions = dataClone.length >= 10 ? 3 : dataClone.length;

    insertingDataIntoHTMLTag(dataClone, index);
    console.log("Success in loading data!");
  } catch (error) {
    console.log(error);
  }
}

answersOptionContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("option")) {
    let usersClick = Number(event.target.dataset.id);
    let correctAnswer = Number(dataClone[index].correct);

    if (usersClick === correctAnswer) {
      usersAnswersForquestions[questionNumber] = "correct";

      answersOptionsArray.forEach((element) => {
        element.classList.remove("correct-answer");
        element.classList.remove("wrong-answer");
        element.disabled = true;
      });

      event.target.classList.add("correct-answer");
      event.target.classList.remove("wrong-answer");
    } else {
      usersAnswersForquestions[questionNumber] = "not correct";
      answersOptionsArray.forEach((element) => {
        element.classList.remove("correct-answer");
        element.classList.remove("wrong-answer");
        element.disabled = true;
      });
      event.target.classList.add("wrong-answer");
      event.target.classList.remove("correct-answer");
    }
    if (questionNumber < quantityOfQuestions - 1) {
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else if (questionNumber === quantityOfQuestions - 1) {
      let historyOfResultsFromLocalStorage =
        JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage")) ||
        historyOfResults;
      for (i in historyOfResults) {
        console.log(i);
        if (historyOfResultsFromLocalStorage[`${i}`] !== null) {
          let topicLevel = document.querySelector(`.${i}`);
          let userScore = topicLevel.querySelector(".user-score");
          topicLevel.querySelector(".user-result").classList.remove("hide");
          topicLevel.querySelector(".empty-result").classList.add("hide");
          userScore.textContent = historyOfResultsFromLocalStorage[i];
        }
      }

      let topicLevel = document.querySelector(
        `.${USER_CHOICE.topic}-${USER_CHOICE.complexity}`,
      );
      console.log(topicLevel);

      topicLevel.querySelector(".user-result").classList.remove("hide");
      topicLevel.querySelector(".empty-result").classList.add("hide");
      let userScore = topicLevel.querySelector(".user-score");
      console.log(userScore);

      let key = `${USER_CHOICE.topic}-${USER_CHOICE.complexity}`;
      console.log(historyOfResultsFromLocalStorage[key]);
      if (historyOfResultsFromLocalStorage[key] === null) {
        console.log("it's null");
        historyOfResultsFromLocalStorage[key] = getResults(
          usersAnswersForquestions,
        );
      } else {
        console.log("it's NOT null");

        if (
          historyOfResultsFromLocalStorage[key] >
          getResults(usersAnswersForquestions)
        ) {
          historyOfResultsFromLocalStorage[key] =
            historyOfResultsFromLocalStorage[key];
        } else if (
          historyOfResultsFromLocalStorage[key] ===
          getResults(usersAnswersForquestions)
        ) {
          historyOfResultsFromLocalStorage[key] = getResults(
            usersAnswersForquestions,
          );
        } else {
          historyOfResultsFromLocalStorage[key] = getResults(
            usersAnswersForquestions,
          );
        }
      }

      console.log(historyOfResults);
      localStorage.setItem(
        "arrayOfResultsInLocalStorage",
        JSON.stringify(historyOfResultsFromLocalStorage),
      );
      let array = JSON.parse(
        localStorage.getItem("arrayOfResultsInLocalStorage"),
      );
      console.log(array);
      userScore.textContent = array[key];

      setTimeout(() => {
        lastQuestion();
      }, 1000);
    }
  } else {
    console.log("Incorrect");
    return;
  }
});

// Result section script

playAgainBtn.addEventListener("click", () => {
  resultsSection.classList.add("hide");
  chooseTopicSection.classList.remove("hide");

  usersAnswersForquestions.splice(0);
  USER_CHOICE.topic = null;
  USER_CHOICE.complexity = null;

  topicBtns.forEach((element) => {
    element.classList.remove("active-btn");
  });
  complexityButtons.forEach((element) => {
    element.classList.remove("active-btn");
  });
  goToTheComplexitySectionBtn.classList.add("hide");
  startQuiz.classList.add("hide");

  answersOptionsArray.forEach((element) => {
    element.classList.remove("correct-answer");
    element.classList.remove("wrong-answer");
    element.disabled = false;
  });
  questionNumber = 0;
});

const reluseBtn = document.querySelector(".reluse-btn");
const ruelsDescription = document.querySelector(".ruels-description");
reluseBtn.addEventListener("click", () => {
  ruelsDescription.classList.remove("hide");
});
const closeRulesBtn = document.querySelector(".close-rules-btn");
closeRulesBtn.addEventListener("click", () => {
  ruelsDescription.classList.add("hide");
});

const historyOfResults = {
  "front-end-easy": null,
  "front-end-medium": null,
  "front-end-hard": null,
  "pop-culture-easy": null,
  "pop-culture-medium": null,
  "pop-culture-hard": null,
  "random-easy": null,
  "random-medium": null,
  "random-hard": null,
};
