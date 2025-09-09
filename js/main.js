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

// global state
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;
let answered = false;

// restart quiz
function restartQuiz() {
    welcomeScreen.classList.add("active");
    resultScreen.classList.remove("active");

    // clean buttons
    nextBtn.style.display = "none";
    const oldResultBtn = document.querySelector(".result-btn");
    if (oldResultBtn) oldResultBtn.remove();

    questions = [];
    currentQuestion = 0;
    score = 0;

    localStorage.removeItem("quizState"); // clear save
}

// update progress
function updateProgress() {
    if (questions.length > 0) {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = progress + "%";
        questionNumber.textContent = `${currentQuestion + 1} / ${questions.length}`;
    } else {
        progressBar.style.width = "0%";
        questionNumber.textContent = "0 / 0";
    }
}

// start button
startBtn.addEventListener("pointerup", fetchQuestions);
startBtn.addEventListener("click", fetchQuestions); // desktop fallback

// save quiz state
function saveQuizState() {
    const state = {
        currentQuestion,
        score,
        timeLeft,
        questions,
    };
    localStorage.setItem("quizState", JSON.stringify(state));
}

// restore state if available
window.addEventListener("load", () => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
        const state = JSON.parse(savedState);
        questions = state.questions;
        currentQuestion = state.currentQuestion;
        score = state.score;
        timeLeft = state.timeLeft;

        welcomeScreen.classList.remove("active");
        quizScreen.classList.add("active");

        loadQuestion();
    }
});
