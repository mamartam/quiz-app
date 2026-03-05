// CONNECTION WITH DOM
import { DOM_VAR } from "./dom-variables.js";
// GENERAL VARIABLES AND STARTING VALUES
import { GEN_VAR } from "./general-variables.js";
// START FUNCTIONS SECTION----------------------------------
import {
  hideAndRemoveClassNames,
  userIsChoosingTopicAndComplexity,
  getRandomNumber,
  insertingDataIntoHTMLTag,
  getResults,
  applyActiveClassToClickedButton,
  nextQuestion,
  lastQuestion,
} from "./functions.js";
// END FUNCTIONS SECTION------------------------------------

// Welcome page section script
DOM_VAR.startBtn.addEventListener("click", () => {
  hideAndRemoveClassNames(
    DOM_VAR.welcomePageSection,
    DOM_VAR.chooseTopicSection,
  );
  console.log(
    JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage")) || {},
  );
});

// Topic section script
DOM_VAR.topics.addEventListener("click", (event) => {
  userIsChoosingTopicAndComplexity(
    event,
    GEN_VAR.quizTopicsArray,
    "topic",
    DOM_VAR.goToTheComplexitySectionBtn,
  );
});

DOM_VAR.goToTheComplexitySectionBtn.addEventListener("click", () => {
  hideAndRemoveClassNames(
    DOM_VAR.chooseTopicSection,
    DOM_VAR.complexitySection,
  );
});
DOM_VAR.topics.addEventListener("click", (event) => {
  applyActiveClassToClickedButton(event, "topic-btn", DOM_VAR.topicBtns);
});

// Complexity section script
DOM_VAR.backToTheTopicsBtn.addEventListener("click", () => {
  hideAndRemoveClassNames(
    DOM_VAR.complexitySection,
    DOM_VAR.chooseTopicSection,
  );
});

DOM_VAR.complexityBtnsContainer.addEventListener("click", (event) => {
  userIsChoosingTopicAndComplexity(
    event,
    GEN_VAR.quizComplexityArray,
    "complexity",
    DOM_VAR.startQuiz,
  );
});
DOM_VAR.complexityBtnsContainer.addEventListener("click", (event) => {
  applyActiveClassToClickedButton(
    event,
    "complexity-btn",
    DOM_VAR.complexityButtons,
  );
});

DOM_VAR.startQuiz.addEventListener("click", () => {
  DOM_VAR.quizSection.classList.remove("hide");
  DOM_VAR.complexitySection.classList.add("hide");
  console.log(GEN_VAR.USER_CHOICE);
  DOM_VAR.quizInfoTopic.textContent = GEN_VAR.USER_CHOICE.topic;
  DOM_VAR.quizInfoLevel.textContent = GEN_VAR.USER_CHOICE.complexity;
  getQuestion();
  let timeLimitation = 0;
  if (GEN_VAR.USER_CHOICE.complexity === "easy") {
    timeLimitation = GEN_VAR.USER_CHOICE.easyTimeLimit - 1;
  } else if (GEN_VAR.USER_CHOICE.complexity === "medium") {
    timeLimitation = GEN_VAR.USER_CHOICE.mediumTimeLimit - 1;
  } else if (GEN_VAR.USER_CHOICE.complexity === "hard") {
    timeLimitation = GEN_VAR.USER_CHOICE.hardTimeLimit - 1;
  }

  startTimer(timeLimitation);
});

// Quiz section script

let time = null;
const countDownClock = document.querySelector(".count-down-clock");

function startTimer(selectedMinutes) {
  if (GEN_VAR.timer) {
    clearInterval(GEN_VAR.timer);
  }

  GEN_VAR.minutes = selectedMinutes;
  GEN_VAR.seconds = 59;

  updateCountDown();
  GEN_VAR.timer = setInterval(updateCountDown, 1000);
}
function updateCountDown() {
  countDownClock.textContent = `${GEN_VAR.minutes < 10 ? "0" + GEN_VAR.minutes : GEN_VAR.minutes}:${GEN_VAR.seconds < 10 ? "0" + GEN_VAR.seconds : GEN_VAR.seconds}`;

  if (GEN_VAR.minutes === 0 && GEN_VAR.seconds === 0) {
    DOM_VAR.userPoints.textContent = getResults(
      GEN_VAR.usersAnswersForquestions,
    );
    let historyOfResultsFromLocalStorage =
      JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage")) ||
      historyOfResults;
    for (let i in historyOfResults) {
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
      `.${GEN_VAR.USER_CHOICE.topic}-${GEN_VAR.USER_CHOICE.complexity}`,
    );
    console.log(topicLevel);

    topicLevel.querySelector(".user-result").classList.remove("hide");
    topicLevel.querySelector(".empty-result").classList.add("hide");
    let userScore = topicLevel.querySelector(".user-score");
    console.log(userScore);

    let key = `${GEN_VAR.USER_CHOICE.topic}-${GEN_VAR.USER_CHOICE.complexity}`;
    console.log(historyOfResultsFromLocalStorage[key]);
    if (historyOfResultsFromLocalStorage[key] === null) {
      console.log("it's null");
      historyOfResultsFromLocalStorage[key] = getResults(
        GEN_VAR.usersAnswersForquestions,
      );
    } else {
      console.log("it's NOT null");

      if (
        historyOfResultsFromLocalStorage[key] >
        getResults(GEN_VAR.usersAnswersForquestions)
      ) {
        historyOfResultsFromLocalStorage[key] =
          historyOfResultsFromLocalStorage[key];
      } else if (
        historyOfResultsFromLocalStorage[key] ===
        getResults(GEN_VAR.usersAnswersForquestions)
      ) {
        historyOfResultsFromLocalStorage[key] = getResults(
          GEN_VAR.usersAnswersForquestions,
        );
      } else {
        historyOfResultsFromLocalStorage[key] = getResults(
          GEN_VAR.usersAnswersForquestions,
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
    clearInterval(GEN_VAR.timer);
    hideAndRemoveClassNames(DOM_VAR.quizSection, DOM_VAR.resultsSection);
    return;
  }

  if (GEN_VAR.seconds === 0) {
    GEN_VAR.seconds = 59;
    GEN_VAR.minutes--;
  } else {
    GEN_VAR.seconds--;
  }
}

async function getQuestion() {
  try {
    let link = `js/${GEN_VAR.USER_CHOICE.topic}/${GEN_VAR.USER_CHOICE.complexity}.json`;
    let response = await fetch(link);
    const data = await response.json();

    GEN_VAR.dataClone = JSON.parse(JSON.stringify(data));

    GEN_VAR.randomNumber = getRandomNumber(GEN_VAR.dataClone.length);
    GEN_VAR.index = GEN_VAR.randomNumber - 1;
    GEN_VAR.quantityOfQuestions =
      GEN_VAR.dataClone.length >= 10 ? 3 : GEN_VAR.dataClone.length;

    insertingDataIntoHTMLTag(GEN_VAR.dataClone, GEN_VAR.index);
    console.log("Success in loading data!");
  } catch (error) {
    console.log(error);
  }
}

DOM_VAR.answersOptionContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("option")) {
    let usersClick = Number(event.target.dataset.id);
    let correctAnswer = Number(GEN_VAR.dataClone[GEN_VAR.index].correct);

    if (usersClick === correctAnswer) {
      GEN_VAR.usersAnswersForquestions[GEN_VAR.questionNumber] = "correct";

      DOM_VAR.answersOptionsArray.forEach((element) => {
        element.classList.remove("correct-answer");
        element.classList.remove("wrong-answer");
        element.disabled = true;
      });

      event.target.classList.add("correct-answer");
      event.target.classList.remove("wrong-answer");
    } else {
      GEN_VAR.usersAnswersForquestions[GEN_VAR.questionNumber] = "not correct";
      DOM_VAR.answersOptionsArray.forEach((element) => {
        element.classList.remove("correct-answer");
        element.classList.remove("wrong-answer");
        element.disabled = true;
      });
      event.target.classList.add("wrong-answer");
      event.target.classList.remove("correct-answer");
    }
    if (GEN_VAR.questionNumber < GEN_VAR.quantityOfQuestions - 1) {
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else if (GEN_VAR.questionNumber === GEN_VAR.quantityOfQuestions - 1) {
      let historyOfResultsFromLocalStorage =
        JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage")) ||
        historyOfResults;
      for (let i in historyOfResults) {
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
        `.${GEN_VAR.USER_CHOICE.topic}-${GEN_VAR.USER_CHOICE.complexity}`,
      );
      console.log(topicLevel);

      topicLevel.querySelector(".user-result").classList.remove("hide");
      topicLevel.querySelector(".empty-result").classList.add("hide");
      let userScore = topicLevel.querySelector(".user-score");
      console.log(userScore);

      let key = `${GEN_VAR.USER_CHOICE.topic}-${GEN_VAR.USER_CHOICE.complexity}`;
      console.log(historyOfResultsFromLocalStorage[key]);
      if (historyOfResultsFromLocalStorage[key] === null) {
        console.log("it's null");
        historyOfResultsFromLocalStorage[key] = getResults(
          GEN_VAR.usersAnswersForquestions,
        );
      } else {
        console.log("it's NOT null");

        if (
          historyOfResultsFromLocalStorage[key] >
          getResults(GEN_VAR.usersAnswersForquestions)
        ) {
          historyOfResultsFromLocalStorage[key] =
            historyOfResultsFromLocalStorage[key];
        } else if (
          historyOfResultsFromLocalStorage[key] ===
          getResults(GEN_VAR.usersAnswersForquestions)
        ) {
          historyOfResultsFromLocalStorage[key] = getResults(
            GEN_VAR.usersAnswersForquestions,
          );
        } else {
          historyOfResultsFromLocalStorage[key] = getResults(
            GEN_VAR.usersAnswersForquestions,
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

DOM_VAR.playAgainBtn.addEventListener("click", () => {
  DOM_VAR.resultsSection.classList.add("hide");
  DOM_VAR.chooseTopicSection.classList.remove("hide");

  GEN_VAR.usersAnswersForquestions.splice(0);
  GEN_VAR.USER_CHOICE.topic = null;
  GEN_VAR.USER_CHOICE.complexity = null;

  DOM_VAR.topicBtns.forEach((element) => {
    element.classList.remove("active-btn");
  });
  DOM_VAR.complexityButtons.forEach((element) => {
    element.classList.remove("active-btn");
  });
  DOM_VAR.goToTheComplexitySectionBtn.classList.add("hide");
  DOM_VAR.startQuiz.classList.add("hide");

  DOM_VAR.answersOptionsArray.forEach((element) => {
    element.classList.remove("correct-answer");
    element.classList.remove("wrong-answer");
    element.disabled = false;
  });
  GEN_VAR.questionNumber = 0;
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
