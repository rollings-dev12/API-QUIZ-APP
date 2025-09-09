"use strict";

function loadQuestion() {
    answered = false;
    clearInterval(timer);
    timeLeft = 15;
    updateTimer();
    timer = setInterval(countdown, 1000);

    let q = questions[currentQuestion];
    if (!q) {
        questionElement.textContent = "No question found!";
        return;
    }
    questionElement.innerHTML = `Q${currentQuestion + 1}. ${q.question}`;

    optionsElement.innerHTML = "";
    nextBtn.style.display = "none";
    const oldResultBtn = document.querySelector(".result-btn");
    if (oldResultBtn) oldResultBtn.remove();

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerHTML = option;
        btn.addEventListener("click", () => selectAnswer(index, true));
        optionsElement.appendChild(btn);
    });

    updateProgress();
}

function countdown() {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
        clearInterval(timer);
        const buttons = document.querySelectorAll(".option-btn");
        buttons.forEach((btn) => (btn.disabled = true));
        selectAnswer(questions[currentQuestion]?.correct, false);

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) loadQuestion();
            else showResult();
        }, 1000);
    }
}

function updateTimer() {
    timerElement.textContent = `⏰ ${timeLeft} seconds`;
}

function updateProgress() {
    document.getElementById("question-number").textContent = `${currentQuestion + 1} / ${questions.length}`;
    // Optionally update progress bar here
}