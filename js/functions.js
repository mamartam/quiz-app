// CONNECTION WITH DOM

import { DOM_VAR } from "./dom-variables.js";
// GENERAL VARIABLES AND STARTING VALUES
import { GEN_VAR } from "./general-variables.js";

export function hideAndRemoveClassNames(addClassName, removeClassName) {
  addClassName.classList.add("hide");
  removeClassName.classList.remove("hide");
}

export function userIsChoosingTopicAndComplexity(event, array, key, btn) {
  let usersClick = event.target;
  let hidebtn = false;

  for (let i = 0; i < array.length; i++) {
    if (usersClick.classList.contains(array[i])) {
      GEN_VAR.USER_CHOICE[`${key}`] = array[i];

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

export function getRandomNumber(max) {
  let min = 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function insertingDataIntoHTMLTag(array, arrayElementIndex) {
  DOM_VAR.numberOfQuestion.textContent = GEN_VAR.questionNumber + 1;
  DOM_VAR.questionHeader.textContent = array[arrayElementIndex].question;
  DOM_VAR.answersOptionsArray.forEach((element, index) => {
    element.textContent = array[arrayElementIndex].options[GEN_VAR.index];
  });
}
export function getResults(array) {
  let countCorrectAnswers = 0;
  array.forEach((element) => {
    if (element === "correct") {
      countCorrectAnswers++;
    }
  });
  return countCorrectAnswers;
}
export function applyActiveClassToClickedButton(
  event,
  elementClassName,
  buttons,
) {
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
export function nextQuestion() {
  GEN_VAR.questionNumber++;
  GEN_VAR.dataClone.splice(GEN_VAR.index, 1);
  console.log(GEN_VAR.dataClone.length);
  console.log(GEN_VAR.usersAnswersForquestions);
  GEN_VAR.randomNumber = getRandomNumber(GEN_VAR.dataClone.length);
  GEN_VAR.index = GEN_VAR.randomNumber - 1;
  console.log(GEN_VAR.randomNumber);
  DOM_VAR.answersOptionsArray.forEach((element) => {
    element.classList.remove("correct-answer");
    element.classList.remove("wrong-answer");
    element.disabled = false;
  });
  insertingDataIntoHTMLTag(GEN_VAR.dataClone, GEN_VAR.index);
}
export function lastQuestion() {
  DOM_VAR.userPoints.textContent = getResults(GEN_VAR.usersAnswersForquestions);
  hideAndRemoveClassNames(DOM_VAR.quizSection, DOM_VAR.resultsSection);
  clearInterval(GEN_VAR.timer);
}
