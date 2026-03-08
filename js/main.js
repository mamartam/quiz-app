import { DOM_VAR } from "./dom-variables.js"; // CONNECTION WITH DOM
import { GEN_VAR } from "./general-variables.js"; // GENERAL VARIABLES AND STARTING VALUES
// START FUNCTIONS SECTION----------------------------------
import {
  hideAndRemoveClassNames,
  userIsChoosingTopicAndComplexity,
  getRandomNumber,
  insertingDataIntoHTMLTag,
  countCorrectAnswers,
  applyActiveClassToClickedButton,
  nextQuestion,
  lastQuestion,
  startTimer,
  updateCountDown,
  insertResultsIntoResultSection,
  creatingResultsCards,
  creatingProgressBar,
  capitalize,
  playCorrectSound,
  playWrongSound,
  playGameReveal,
} from "./functions.js";
// END FUNCTIONS SECTION------------------------------------
// Welcome page section script
creatingResultsCards();
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
  DOM_VAR.quizInfoTopic.textContent = capitalize(GEN_VAR.USER_CHOICE.topic);
  DOM_VAR.quizInfoLevel.textContent = capitalize(
    GEN_VAR.USER_CHOICE.complexity,
  );

  let timeLimitation = 0;
  if (GEN_VAR.USER_CHOICE.complexity === "easy") {
    timeLimitation = GEN_VAR.USER_CHOICE.easyTimeLimit - 1;
  } else if (GEN_VAR.USER_CHOICE.complexity === "medium") {
    timeLimitation = GEN_VAR.USER_CHOICE.mediumTimeLimit - 1;
  } else if (GEN_VAR.USER_CHOICE.complexity === "hard") {
    timeLimitation = GEN_VAR.USER_CHOICE.hardTimeLimit - 1;
  }
  getQuestion(timeLimitation);
});
// Quiz section script
async function getQuestion(timeLimitation) {
  try {
    let link = `js/${GEN_VAR.USER_CHOICE.topic}/${GEN_VAR.USER_CHOICE.complexity}.json`;
    let response = await fetch(link);
    const data = await response.json();

    GEN_VAR.dataClone = JSON.parse(JSON.stringify(data));

    GEN_VAR.randomNumber = getRandomNumber(GEN_VAR.dataClone.length);
    GEN_VAR.index = GEN_VAR.randomNumber - 1;
    GEN_VAR.quantityOfQuestions =
      GEN_VAR.dataClone.length >= 10 ? 10 : GEN_VAR.dataClone.length;

    insertingDataIntoHTMLTag(GEN_VAR.dataClone, GEN_VAR.index);
    creatingProgressBar();

    console.log("Success in loading data!");
    startTimer(timeLimitation);
  } catch (error) {
    console.log(error);
  }
}
DOM_VAR.answersOptionContainer.addEventListener("click", (event) => {
  let userClickedArea = event.target;

  if (userClickedArea.classList.contains("option")) {
    let usersClick = Number(userClickedArea.dataset.id);
    let correctAnswer = Number(GEN_VAR.dataClone[GEN_VAR.index].correct);

    if (usersClick === correctAnswer) {
      GEN_VAR.usersAnswersForquestions[GEN_VAR.questionNumber] = "correct";
      playCorrectSound();

      DOM_VAR.answersOptionsArray.forEach((element) => {
        element.classList.remove("correct-answer");
        element.classList.remove("wrong-answer");
        element.disabled = true;
      });

      userClickedArea.classList.add("correct-answer");
      userClickedArea.classList.remove("wrong-answer");
    } else {
      GEN_VAR.usersAnswersForquestions[GEN_VAR.questionNumber] = "not correct";
      playWrongSound();
      DOM_VAR.answersOptionsArray.forEach((element) => {
        element.classList.remove("correct-answer");
        element.classList.remove("wrong-answer");
        element.disabled = true;
      });
      userClickedArea.classList.add("wrong-answer");
      userClickedArea.classList.remove("correct-answer");
    }
    if (GEN_VAR.questionNumber < GEN_VAR.quantityOfQuestions - 1) {
      document
        .querySelector(`.question-${GEN_VAR.questionNumber}`)
        .querySelector(".bar-color")
        .classList.add("completed");
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else if (GEN_VAR.questionNumber === GEN_VAR.quantityOfQuestions - 1) {
      insertResultsIntoResultSection();
      document
        .querySelector(`.question-${GEN_VAR.questionNumber}`)
        .querySelector(".bar-color")
        .classList.add("completed");
      setTimeout(() => {
        lastQuestion();
      }, 1000);
    }
  } else {
    console.log("Incorrect");
    return;
  }
});
// PLAY AGAIN BUTTON
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
  const progressBarBoxes = document.querySelectorAll(".bar-color");
  Array.from(progressBarBoxes).forEach((element) => {
    element.classList.remove("completed");
  });
});

// RESLES POP-UP WINDOW
DOM_VAR.rulesBtn.addEventListener("click", () => {
  DOM_VAR.rulesDescription.classList.remove("hide");
});

DOM_VAR.closeRulesBtn.addEventListener("click", () => {
  DOM_VAR.rulesDescription.classList.add("hide");
});
