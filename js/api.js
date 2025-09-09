"use strict";

// document elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer-text");
const startBtn = document.getElementById("start-btn");

const quizScreen = document.querySelector(".quiz-screen");
const welcomeScreen = document.querySelector(".welcome-screen");
const resultScreen = document.getElementById("result");

let questions = [];
let currentQuestion = 0;

// fetch questions from API
async function fetchQuestions() {
    try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple");
        const data = await res.json();

        // format API data
        questions = data.results.map((q) => {
            const options = [...q.incorrect_answers];
            const correctIndex = Math.floor(Math.random() * (options.length + 1));
            options.splice(correctIndex, 0, q.correct_answer);

            return {
                question: q.question,
                options,
                correct: correctIndex
            };
        });

        startQuiz();
    } catch (err) {
        console.error("Failed to fetch questions:", err);
        questionElement.textContent = " Could not load questions. Try again later.";
    }
}

function startQuiz() {
    welcomeScreen.classList.remove("active");
    quizScreen.classList.add("active");
    currentQuestion = 0;
    score = 0;
}

// start button
startBtn.addEventListener("pointerup", fetchQuestions);

