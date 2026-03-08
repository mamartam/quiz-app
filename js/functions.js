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

export function insertingDataIntoHTMLTag(array, arrayElementIndex) {
  DOM_VAR.numberOfQuestion.textContent = GEN_VAR.questionNumber + 1;
  DOM_VAR.questionHeader.textContent = array[arrayElementIndex].question;
  DOM_VAR.answersOptionsArray.forEach((element, index) => {
    element.textContent = array[arrayElementIndex].options[index];
  });
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
  DOM_VAR.userPoints.textContent = countCorrectAnswers(
    GEN_VAR.usersAnswersForquestions,
  );
  hideAndRemoveClassNames(DOM_VAR.quizSection, DOM_VAR.resultsSection);
  clearInterval(GEN_VAR.timer);
  playGameReveal();
}

export function updateCountDown() {
  DOM_VAR.countDownClock.textContent = `${GEN_VAR.minutes < 10 ? "0" + GEN_VAR.minutes : GEN_VAR.minutes}:${GEN_VAR.seconds < 10 ? "0" + GEN_VAR.seconds : GEN_VAR.seconds}`;
  if (GEN_VAR.minutes === 0 && GEN_VAR.seconds === 59) {
    DOM_VAR.countDownClock.classList.add("last-seconds");
  }
  if (GEN_VAR.minutes === 0 && GEN_VAR.seconds === 0) {
    insertResultsIntoResultSection();
    DOM_VAR.userPoints.textContent = countCorrectAnswers(
      GEN_VAR.usersAnswersForquestions,
    );

    DOM_VAR.countDownClock.textContent = "Time is up!";
    clearInterval(GEN_VAR.timer);
    hideAndRemoveClassNames(DOM_VAR.quizSection, DOM_VAR.resultsSection);
    DOM_VAR.countDownClock.classList.remove("last-seconds");
    return;
  }

  if (GEN_VAR.seconds === 0) {
    GEN_VAR.seconds = 59;
    GEN_VAR.minutes--;
  } else {
    GEN_VAR.seconds--;
  }
}

export function insertResultsIntoResultSection() {
  let usersResult = countCorrectAnswers(GEN_VAR.usersAnswersForquestions);
  let historyOfResultsFromLocalStorage =
    JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage")) ||
    GEN_VAR.historyOfResults;
  for (let i in GEN_VAR.historyOfResults) {
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
    historyOfResultsFromLocalStorage[key] = usersResult;

  } else {

    if (historyOfResultsFromLocalStorage[key] > usersResult) {
      historyOfResultsFromLocalStorage[key] =
        historyOfResultsFromLocalStorage[key];
    } else if (

      historyOfResultsFromLocalStorage[key] === usersResult
    ) {
      historyOfResultsFromLocalStorage[key] = usersResult;
    } else {

      historyOfResultsFromLocalStorage[key] = usersResult;
    }
  }

  localStorage.setItem(
    "arrayOfResultsInLocalStorage",
    JSON.stringify(historyOfResultsFromLocalStorage),
  );
  let array = JSON.parse(localStorage.getItem("arrayOfResultsInLocalStorage"));
  console.log(array);
  userScore.textContent = array[key];

}
export function getRandomNumber(max) {
  let min = 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function countCorrectAnswers(arrayOfUserAnswers) {
  let counter = 0;
  arrayOfUserAnswers.forEach((element) => {
    if (element === "correct") {
      counter++;
    }
  });
  return counter;
}

export function creatingResultsCards() {
  const howManyLevels = GEN_VAR.quizComplexityArray.length;
  const howManyTopics = GEN_VAR.quizTopicsArray.length;
  let arrayOfResultsCard = [];
  DOM_VAR.historySection.innerHTML = "";

  for (let i = 0; i < howManyTopics; i++) {
    for (let j = 0; j < howManyLevels; j++) {
      arrayOfResultsCard.push(`<div class="card ${GEN_VAR.quizTopicsArray[i]}-${GEN_VAR.quizComplexityArray[j]}">
            <h4>${capitalize(GEN_VAR.quizTopicsArray[i])} <img src="./assets/images/${GEN_VAR.quizTopicsArray[i]}-icon.svg" alt="" /></h4>
            <p>${capitalize(GEN_VAR.quizComplexityArray[j])} Level</p>
            <p class="user-result hide"><span class="user-score"></span>/10</p>
            <div class="empty-result">
              <img
                src="./assets/images/detective-incognito-robber-spy-thief-svgrepo-com.svg"
                alt=""
              />
              <p>No achievements yet...</p>
            </div></div>`);
    }
  }

  DOM_VAR.historySection.innerHTML = arrayOfResultsCard.join("");
  console.log(arrayOfResultsCard);
}

export function creatingProgressBar() {
  DOM_VAR.progressBarContainer.innerHTML = "";
  let arrayOfBarBoxes = [];

  for (let i = 0; i < GEN_VAR.quantityOfQuestions; i++) {
    arrayOfBarBoxes.push(
      `<div class="bar-box question-${i}"><div class="bar-color"></div></div>`,
    );
  }

  DOM_VAR.progressBarContainer.innerHTML = arrayOfBarBoxes.join("");
}
export function startTimer(selectedMinutes) {
  if (GEN_VAR.timer) {
    clearInterval(GEN_VAR.timer);
  }
  GEN_VAR.minutes = selectedMinutes;
  GEN_VAR.seconds = 59;

  updateCountDown();
  GEN_VAR.timer = setInterval(updateCountDown, 1000);
}
export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function playCorrectSound() {
  DOM_VAR.WrongBtnAudio.pause();
  DOM_VAR.WrongBtnAudio.currentTime = 0;

  DOM_VAR.gameReveal.pause();
  DOM_VAR.gameReveal.currentTime = 0;

  DOM_VAR.CorrectBtnAudio.currentTime = 0;
  DOM_VAR.CorrectBtnAudio.play();
}

export function playWrongSound() {
  DOM_VAR.CorrectBtnAudio.pause();
  DOM_VAR.CorrectBtnAudio.currentTime = 0;

  DOM_VAR.gameReveal.pause();
  DOM_VAR.gameReveal.currentTime = 0;

  DOM_VAR.WrongBtnAudio.currentTime = 0;
  DOM_VAR.WrongBtnAudio.play();
}
export function playGameReveal() {
  DOM_VAR.CorrectBtnAudio.pause();
  DOM_VAR.CorrectBtnAudio.currentTime = 0;

  DOM_VAR.WrongBtnAudio.pause();
  DOM_VAR.WrongBtnAudio.currentTime = 0;

  DOM_VAR.gameReveal.currentTime = 0;
  DOM_VAR.gameReveal.play();
}
