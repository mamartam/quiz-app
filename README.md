# Quiz App 📱
Quiz App - is an interactive application for testing knowledge with the ability to select categories and track results.

## Video 🍿
https://github.com/user-attachments/assets/8fae9659-2eb7-40ff-8078-833f5bd61cf8
## About Project
<details>
<summary><b>index.html</b></summary>

The project was implemented as a SPA (Single Page Application) in pure `HTML/JS`. 
The entire interface is loaded once, and screens are changed by manipulating the `.hide` class.
- Head Section
  - Favicon: Added a custom tab icon (tab-favicon.svg) to increase the brand recognition of the application.
  - Modular JS: Connecting a script with the type="module" attribute allows you to use modern syntax (import/export) and ensures that the DOM is loaded before the code is executed.
- Main Content - Each section is a separate state of the application.
   - welcome-page-section: Entry point. Uses a semantic `<h1>` heading for the main project title.
   - choose-topic-section: Modal window for rules (rules-description) and category selection. Interesting detail: Here, I use aria-hidden=“true” for colored complexity markers so as not to overload screen readers with unnecessary decorative information.
   - complexity-section: Implemented multi-level complexity selection logic (Easy, Medium, Hard), which affects the subsequent state of the timer.
   - quiz-section: The core of the application.
   - Dynamics: <span> tags with classes .quiz-info-topic and .number-of-question serve as “hooks” for JS, where data is dynamically inserted.
   - Intuitive: The .progress-bar-container container is reserved for the visual progress bar.
   - Data-driven UI: Answer buttons use data-id, which allows JS to identify the user's selection without binding to the text content of the button.
   - results-section: Final screen. The .history-section block is provided for displaying “achievements” or the history of previous games.
- Audio Assets
   - Three audio nodes are added at the bottom of the document:
   - CorrectBtnAudio / WrongBtnAudio: For instant audio feedback on user actions.
   - gameReveal: To create a sense of celebration when the quiz is completed.

* HTML is solely responsible for the structure. All states are already specified in the markup, and JS only “turns on” the necessary ones.
** Clear rules, sound effects, and a progress bar make the app feel “alive” and easy to use.
*** Using meaningful class names (e.g., .go-to-the-complexity-section-btn) makes the code understandable even without comments.
</details>

<details>
<summary><b>main.css</b></summary>

- Variables & Reset
  - CSS Variables (:root):  the main color palette is moved to variables. 
This approach allows you to change the theme of the entire application (for example, from purple to dark) very quickly.
  - Global Reset: 
Using box-sizing: border-box is the gold standard that prevents problems with calculating element sizes due to padding.

- Layout (Flexbox & Centering)
  - Centering: The entire application is centered using display: flex on main and body. This ensures that the quiz will look good on any monitor.
  - Viewport Units: Using min-height: 100vh provides a full-screen interface without unnecessary scrolling on mobile devices.

- Animation and feedback
  - Progress bar: @keyframes animationForBarBox. The animation of the scale filling adds dynamism to the interface.
  - Visual feedback: The .correct-answer and .wrong-answer classes use box-shadow to instantly highlight the result. Using transition makes these effects smooth.
  - Button interactivity: The hover effect with shadow (5px 5px var(--white)) creates the feeling of a “physical” button

- History Section
  - Horizontal scroll: due to overflow-x: auto, the standard scrollbar is hidden (::-webkit-scrollbar { display: none; })
  - Complex selectors: Using div[class^=“card front-end”] (searching by the beginning of the class name) helped me reduce the
  number of classes for the element, because here I am only looking for those that match what I need.

- Responsive Design: 
  - Mobile First: the main code is written for mobile screens, and via @media (min-width: 600px) ' limit the width of the container (max-width: 500px) for desktops.
</details>

<details>
<summary><b>main.js</b></summary>

- Logic & Architecture (JavaScript Analysis)
The project is built on an event-driven architecture and a clear separation of responsibilities. 
The code in main.js coordinates the work of imported functions and variables.

- Modular JS
I divided the code into modules: dom-variables.js, general-variables.js, and functions.js — to make 
the code easier to read, test, and maintain.

- Async/Await & Fetch
The getQuestion function is a critically important part.
  - Dynamic paths: the path to the json file is generated based on the user's selection: js/${topic}/${complexity}.json. This allows you to scale the quiz (add new topics) by simply adding files to the folder without changing the JS code.
  - Deep Clone: JSON.parse(JSON.stringify(data)) is used to ensure that the original array is not distorted when working with data.

- Event Delegation
To avoid unnecessary load and not hang an event handler on each element, I use delegation. This significantly optimizes the browser's memory usage. I hang a listener on the parent container and then listen to which child element was clicked.

- UX
  - Feedback Loop: A setTimeout delay (1000 ms) after the answer has been implemented. This gives the user time to see if their answer was correct (color highlighting + sound) before the question changes.
  - Audio Engine: The integration of sound effects for correct/incorrect answers and the end of the game.
</details>
<details>
<summary><b>dom-variables.js</b></summary>
To ensure maintainability and scalability, I implemented a centralized DOM management system:
- DOM Mapping Object: All UI elements are stored in a single DOM_VAR constant. This pattern makes debugging much faster.
- Clean Export/Import: By exporting DOM nodes as a module, the core logic remains decoupled from the specific structure of the HTML, 
  following the principle of clean separation of concerns.
- Optimized Selection: Used querySelectorAll for button groups to facilitate batch updates and consistent styling resets.
</details>

<details>
<summary><b>general-variables.js</b></summary>
The application's state is managed through a centralized configuration object, ensuring a predictable data flow:
- Scalable Configuration: Difficulty levels and time limits are stored as configurable constants, allowing for easy balance adjustments.
- Session Tracking: Real-time tracking of user answers, current question index, and timer state within a single global object.
- Progress Persistence Structure: A predefined historyOfResults object allows for granular score tracking across different categories and difficulty levels, ready for LocalStorage integration.
- Data Isolation: Implemented data cloning patterns to ensure that the core question bank remains immutable during the quiz session.
</details>

<details>
<summary><b>functions.js</b></summary>
This module contains a set of pure functions and utilities for managing the game process, timer, and saving results.

- Persistence: Using JSON.parse and JSON.stringify to work with local storage allows user data to remain in the browser 
even after the page is reloaded.

DOM Manipulation
- creatingResultsCards: Instead of manually writing dozens of cards in HTML, I use nested loops to automatically generate cards for each combination of topic and difficulty.
- creatingProgressBar: Dynamically create a progress bar based on the number of questions in the array.

Timer Logic
- startTimer and updateCountDown: there is a countdown with automatic game completion.
- Visual feedback: Adding the .last-seconds class (when less than a minute remains) the 
numbers on the timer are highlighted in red.

Game mechanics and randomization
- nextQuestion: The .splice(index, 1) method is used here. This removes the question 
from the array after it has been asked so that it is not repeated during the same game.
- getRandomNumber: A utility for ensuring the unpredictability of the quiz.

Audio controller
The playCorrectSound, playWrongSound, and playGameReveal functions do not simply play the sound, 
but reset the playback time (currentTime = 0) and stop other sounds.
</details>

## Tech Stack 🛠
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

## 🔗[Live Demo Link](https://mamartam.github.io/quiz-app/)
