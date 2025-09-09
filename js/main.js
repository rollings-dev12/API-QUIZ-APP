"use strict";

// DOM elements
const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.querySelector(".welcome-screen");
const quizScreen = document.querySelector(".quiz-screen");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerElement = document.getElementById("timer-text");
const resultScreen = document.getElementById("result");
const resultElement = document.getElementById("result");

// Quiz state
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;
let answered = false;

// Load questions from local storage if available
function loadQuestionsFromStorage() {
    const save = localStorage.getItem("quizQuestions");
    if (save) {
        questions = JSON.parse(save);
        return true;
    }
    return false;
}

// Save questions to local storage
function saveQuestionsToStorage() {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
}

// Load state from localStorage if available
function loadQuizState() {
    const savedIndex = localStorage.getItem("quizCurrentQuestion");
    const savedScore = localStorage.getItem("quizScore");

    //to avoid our currenQuestion and score being strings

    // if (savedIndex !== null) currentQuestion = Number(savedIndex);
    // if (savedScore !== null) score = Number(savedScore);
    currentQuestion = Number(localStorage.getItem("quizCurrentQuestion")) || 0;
    score = Number(localStorage.getItem("quizScore")) || 0;
}

// Save state to localStorage
function saveQuizState() {
    localStorage.setItem("quizCurrentQuestion", currentQuestion);
    localStorage.setItem("quizScore", score);
}

// Fetch questions from API and start quiz
async function fetchQuestions() {
    if (loadQuestionsFromStorage()) {
        startQuiz();
        return;
    }
    try {
        const res = await fetch(
            "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
        );
        const data = await res.json();

        questions = data.results.map((q) => {
            const options = [...q.incorrect_answers];
            const correctIndex = Math.floor(Math.random() * (options.length + 1));
            options.splice(correctIndex, 0, q.correct_answer);

            return { question: q.question, options, correct: correctIndex };
        });

        saveQuestionsToStorage();
        startQuiz();
    } catch (err) {
        console.error("Failed to fetch questions:", err);
        questionElement.textContent = "Could not load questions. Try again later.";
    }
}

function startQuiz() {
    welcomeScreen.classList.remove("active");
    quizScreen.classList.add("active");
    resultScreen.classList.remove("active");
    loadQuizState();
    loadQuestion();
    updateProgress();
}

nextBtn.addEventListener("click", () => {
    currentQuestion;
    saveQuizState();
    if (currentQuestion < questions.length) loadQuestion();
    else showResult();
});

function restartQuiz() {
    resultScreen.classList.remove("active");
    welcomeScreen.classList.add("active");

    // Remove leftover buttons
    nextBtn.style.display = "none";
    const oldResultBtn = document.querySelector(".result-btn");
    if (oldResultBtn) oldResultBtn.remove();

    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("quizCurrentQuestion");
    localStorage.removeItem("quizScore");
    questions = [];
    currentQuestion = 0;
    score = 0;
}

startBtn.addEventListener("click", fetchQuestions);

// resume quiz if questions and progress exist

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("quizQuestions")) {


        // Hide welcome, show quiz
        welcomeScreen.classList.remove("active");
        quizScreen.classList.add("active");
        resultScreen.classList.remove("active");
        loadQuizState();
        loadQuestionsFromStorage();
        loadQuestion();
        updateProgress();
    }
});

