"use strict";

function selectAnswer(index, shouldScore) {
    if (answered) return;
    answered = true;

    let q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((btn) => {
        btn.disabled = true;
        btn.style.pointerEvents = "none";
    });

    if (index === q.correct) {
        buttons[index].classList.add("correct");
        if (shouldScore) score++;
    } else {
        if (buttons[index]) buttons[index].classList.add("wrong");
        buttons[q.correct].classList.add("correct");
    }

    if (shouldScore) {
        if (currentQuestion === questions.length - 1) {
            const resultBtn = document.createElement("button");
            resultBtn.textContent = "Show Result";
            resultBtn.classList.add("result-btn");
            nextBtn.parentElement.appendChild(resultBtn);
            resultBtn.addEventListener("click", showResult);
        } else {
            nextBtn.style.display = "inline-block";
        }
    }
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) loadQuestion();
    else showResult();
});

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const totalScore = score * 2;

    resultElement.innerHTML = `
    <h2>🎉 Quiz completed!</h2>
    <p>You answered ${score} out of ${questions.length} correctly</p>
    <p>Total Score: <strong>${totalScore}</strong></p>
    <button id="restart-btn">RESTART QUIZ</button>
  `;

    document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}