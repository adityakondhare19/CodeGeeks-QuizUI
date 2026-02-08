const questions = [
    {
        q: "Which company developed JavaScript?",
        a: [
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Google", correct: false },
            { text: "Oracle", correct: false }
        ]
    },
    {
        q: "What does CSS 'z-index' property do?",
        a: [
            { text: "Sets font size", correct: false },
            { text: "Sets stack order", correct: true },
            { text: "Sets zoom level", correct: false },
            { text: "Sets background", correct: false }
        ]
    },
    {
        q: "Which tag is used to create a hyperlink?",
        a: [
            { text: "<a>", correct: true },
            { text: "<link>", correct: false },
            { text: "<href>", correct: false },
            { text: "<nav>", correct: false }
        ]
    },
    {
        q: "How do you write an IF statement in JS?",
        a: [
            { text: "if i = 5 then", correct: false },
            { text: "if i == 5 then", correct: false },
            { text: "if (i == 5)", correct: true },
            { text: "if i = 5", correct: false }
        ]
    },
    {
        q: "What is the correct way to add a background color in CSS?",
        a: [
            { text: "color: yellow", correct: false },
            { text: "bg-color: yellow", correct: false },
            { text: "background-color: yellow", correct: true },
            { text: "background:yellow", correct: true } // Multiple can be true if handled
        ]
    },
    {
        q: "Which operator is used to assign a value?",
        a: [
            { text: "*", correct: false },
            { text: "-", correct: false },
            { text: "=", correct: true },
            { text: "x", correct: false }
        ]
    },
    {
        q: "What does DOM stand for?",
        a: [
            { text: "Data Object Model", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Digital Object Management", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        q: "Which array method adds an element to the end?",
        a: [
            { text: "push()", correct: true },
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "join()", correct: false }
        ]
    },
    {
        q: "How do you call a function named 'myFunc'?",
        a: [
            { text: "call myFunc()", correct: false },
            { text: "myFunc()", correct: true },
            { text: "call function myFunc", correct: false },
            { text: "myFunc", correct: false }
        ]
    },
    {
        q: "Which HTML attribute is used to define inline styles?",
        a: [
            { text: "font", correct: false },
            { text: "styles", correct: false },
            { text: "class", correct: false },
            { text: "style", correct: true }
        ]
    }
];

const qElement = document.getElementById("question");
const btnContainer = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress-bar");
const qNumber = document.getElementById("question-number");

let currentIdx = 0;
let score = 0;

function start() {
    currentIdx = 0;
    score = 0;
    nextBtn.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQ = questions[currentIdx];
    qNumber.innerText = `Question ${currentIdx + 1} of ${questions.length}`;
    qElement.innerText = currentQ.q;
    progress.style.width = `${((currentIdx + 1) / questions.length) * 100}%`;

    currentQ.a.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        if (answer.correct) button.dataset.correct = "true";
        button.addEventListener("click", select);
        btnContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add("hidden");
    btnContainer.innerHTML = "";
}

function select(e) {
    const selected = e.target;
    const isCorrect = selected.dataset.correct === "true";
    if (isCorrect) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("wrong");
    }

    Array.from(btnContainer.children).forEach(btn => {
        if (btn.dataset.correct === "true") btn.classList.add("correct");
        btn.disabled = true;
    });
    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentIdx++;
    if (currentIdx < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById("game-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("score").innerText = score;
    document.getElementById("total").innerText = questions.length;
}

start();