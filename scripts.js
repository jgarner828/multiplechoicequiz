// adding constants from the DOM
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

const questionContainer = document.getElementById('questionContainer');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answerBtn');

const scoreboardContainer = document.getElementById('scoreboard');
let scoreName = document.getElementById('nameInput');
let prevScore = document.getElementById('previousScore');



scoreName.textContent = localStorage.getItem('name');
prevScore.textContent = localStorage.getItem('prevScore');


let timer = document.getElementById('timer');
let timerStop = false;

let startTime = 20;
let gameScore = 0;


//array of all questions. each array item is an object with a question bank and answer array
const questionBank = [

    {
        question: 'Javascript is also currently known as...',
        answers:  [ 
            { text: 'Python'},
            { text: 'ES6'},
            { text: 'ES7'},
            { text: 'Answer 4'}
        ],
        correct: 'ES6'
    },

    {
        question: 'Which one is not a variable type in Javascript?',
        answers:  [ 
            { text: 'Boolean'},
            { text: 'Number'},
            { text: 'Function'},
            { text: 'String'}
        ],
        correct: 'Function'
    },

    {
        question: 'Which type of variable cannot be redefined after being declared?',
        answers:  [ 
            { text: 'var'},
            { text: 'const'},
            { text: 'let'},
            { text: 'standard'}
        ],
        correct: 'const'
    },

    {
        question: 'What is OOP?',
        answers:  [ 
            { text: 'Object-oriented Programming'},
            { text: 'Oriented-object Programming'},
            { text: 'Outside-object Printing'},
            { text: 'Ordered-object Parsing'}
        ],
        correct: 'Object-oriented Programming'
    }
];

// letting questions get shuffled.
let shuffledQuestions;
let currentQuestionIndex;



// listen for a click event on Start button to start game with startGame function
startBtn.addEventListener('click', startGame);


// hides the start button. shuffles question index, displays the question container and loads next question function

function startGame() {


    //sets your name
    let name = window.prompt('Enter your name!');
    if (name != null) {
    localStorage.setItem('name', name);

    
    } else { let name = window.prompt('Enter your name!');}

    //hides the start button and scoreboard, shows the timer
    startBtn.classList.add('hide');
    scoreboardContainer.classList.add('hide');
    // scoreboardContainer.classList.add('hide');
    timer.classList.remove('hide');

    shuffledQuestions = questionBank.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    countdownTimer();
    setNextQuestion();



// need to start a countdown from X seconds to endgame after time runs out
function countdownTimer() {

    // if the endgame function runs exit out of timer.
    if (timerStop) {
        return;
    }

    startTime--;
    timer.innerText = String(startTime);


    if (startTime > 0) {
        setTimeout(countdownTimer, 1000);
    } else { 
        endGame();
    }

}


//  loads the shuffled question function with random array
function setNextQuestion() {
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


//this inserts the question into the quiz
function showQuestion(currentQuestion) {

    questionEl.classList.remove('hide');
    questionEl.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        var button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', pickAnswer);
        answerBtnEl.appendChild(button);
    })

}


// after you picked an answer..... 
function pickAnswer(e) {

    let selectedBtn = e.target;
    const correct = shuffledQuestions[currentQuestionIndex].correct

 // if at the end of the array restart the game and post the score
    if (shuffledQuestions.length === currentQuestionIndex + 1) {
        if(selectedBtn.textContent === correct) {
            gameScore++;
        }
        endGame();
    }
    if(selectedBtn.textContent === correct) {
        gameScore++;
        currentQuestionIndex++;  
    } else { 
        currentQuestionIndex++; 
    }

    setNextQuestion();

}
}

//function that displays your score.
function endGame() {
    localStorage.setItem('prevScore', gameScore);
    questionEl.textContent = "game score is: " + gameScore;
    timerStop = true;
    timer.classList.add('hide');
    restartBtn.classList.remove('hide');

    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

