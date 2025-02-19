function showGame(game) {
    document.getElementById('memory-game').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'none';
    
    if (game === 'memory') {
        document.getElementById('memory-game').style.display = 'block';
        startGame();
    } else if (game === 'quiz') {
        document.getElementById('quiz-game').style.display = 'block';
        startQuizGame();
    }
}

const icons = [
    '🐶', '🐱', '🐭', '🐹',
    '🐰', '🦊', '🐻', '🐼',
    '🐶', '🐱', '🐭', '🐹',
    '🐰', '🦊', '🐻', '🐼'
];


let firstCard = null;
let secondCard = null;
let moves = 0;
let matchCount = 0;
let timerInterval = null;
let timeElapsed = 0;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function startGame() {
    matchCount = 0;
    moves = 0;
    timeElapsed = 0;
    movesDisplay.textContent = `Moves: ${moves}`;
    timerDisplay.textContent = `Time: ${timeElapsed}s`;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Time: ${timeElapsed}s`;
    }, 1000);

    gameBoard.innerHTML = '';
    shuffle(icons);

    icons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.textContent = icon;
        card.style.color = 'transparent';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    this.style.color = '';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchCount += 2;

        if (matchCount === icons.length) {
            clearInterval(timerInterval);
            setTimeout(() => {
                alert(`You've won the game in ${moves} moves and ${timeElapsed} seconds!`);
            }, 500);
        }

        resetSelection();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.style.color = 'transparent';
            secondCard.style.color = 'transparent';
            resetSelection();
        }, 1000);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
}

resetButton.addEventListener('click', startGame);

const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: "Pacific Ocean"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Leo Tolstoy", "Charles Dickens", "Mark Twain"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for water?",
        choices: ["H2O", "CO2", "O2", "NaCl"],
        correct: "H2O"
    },
    {
        question: "In which year did World War II end?",
        choices: ["1942", "1945", "1948", "1950"],
        correct: "1945"
    },
    {
        question: "Who is known as the father of computers?",
        choices: ["Charles Babbage", "Alan Turing", "Thomas Edison", "Albert Einstein"],
        correct: "Charles Babbage"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';

    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => selectAnswer(choice, currentQuestion.correct));
        choicesElement.appendChild(button);
    });
}

function selectAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        setTimeout(() => {
            nextQuestion();
        }, 1000);
    }

    document.querySelectorAll('#choices button').forEach(button => {
        button.disabled = true;
        if (button.textContent === correct) {
            button.style.backgroundColor = '#8bc34a';
        } else if (button.textContent === selected) {
            button.style.backgroundColor = '#e57373'; 
        }
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayScore();
    }
}

nextButton.addEventListener('click', nextQuestion);

function displayScore() {
    questionElement.textContent = "Quiz Completed!";
    choicesElement.innerHTML = '';
    scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
    nextButton.style.display = 'none';
}
function startQuizGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = '';
    nextButton.style.display = 'block';
    loadQuestion();
}