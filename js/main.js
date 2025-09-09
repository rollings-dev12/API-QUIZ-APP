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

// Fetch questions from API and start quiz
async function fetchQuestions() {
    try {
        const res = await fetch(
            "https://opentdb.com/api.php?amount=5&category=18&type=multiple"
        );
        const data = await res.json();

        questions = data.results.map((q) => {
            const options = [...q.incorrect_answers];
            const correctIndex = Math.floor(Math.random() * (options.length + 1));
            options.splice(correctIndex, 0, q.correct_answer);

            return { question: q.question, options, correct: correctIndex };
        });

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
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    updateProgress();
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    welcomeScreen.classList.add("active");
}

function saveQuizState() {
    // Optional: implement saving logic if needed
}

startBtn.addEventListener("click", fetchQuestions);

