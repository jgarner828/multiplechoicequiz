
// adding constants from the DOM
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answerBtn');

var timer = document.getElementById('timer');


var startTime = 60;
var gameScore = 0;


//array of all questions. each array item is an object with a question bank and answer array
const questionBank = [

    {
        question: 'test question 1 ( 1 is correct)',
        answers:  [ 
            { text: 'Answer 1'},
            { text: 'Answer 2'},
            { text: 'Answer 3'},
            { text: 'Answer 4'}
        ],
        correct: 'Answer 1'
    },

    {
        question: 'test question 2 (3 is correct)',
        answers:  [ 
            { text: 'Answer 1'},
            { text: 'Answer 2'},
            { text: 'Answer 3'},
            { text: 'Answer 4'}
        ],
        correct: 'Answer 3'
    },

    {
        question: 'test question 3  (correct is 2)',
        answers:  [ 
            { text: 'Answer 1'},
            { text: 'Answer 2'},
            { text: 'Answer 3'},
            { text: 'Answer 4'}
        ],
        correct: 'Answer 2'
    },

    {
        question: 'test question 4 (4 is correct)',
        answers:  [ 
            { text: 'Answer 1'},
            { text: 'Answer 2'},
            { text: 'Answer 3'},
            { text: 'Answer 4'}
        ],
        correct: 'Answer 4'
    }
];

// letting questions get shuffled.
let shuffledQuestions;
let currentQuestionIndex;






// listen for a click event on Start button to start game with startGame function
startBtn.addEventListener('click', startGame)

// listens for click on the next button and increases question index and runs next question function
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})



// hides the start button. shuffles question index, displays the question container and loads next question function
function startGame() {
    startBtn.classList.add('hide');
    shuffledQuestions = questionBank.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    countdownTimer();
    setNextQuestion();
}


// need to start a countdown from X seconds to endgame after time runs out
function countdownTimer() {
    startTime--;
    timer.innerText = String(startTime);
    if (startTime > 0) {
        setTimeout(countdownTimer, 1000);
    } else { alert("You've run out of time!")
    }

}



//  loads the shuffled question function with random array
function setNextQuestion() {
    reset();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}




function reset() {
    nextBtn.classList.add('hide');
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
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

    var selectedBtn = e.target;
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


//function that displays your score.
function endGame() {
    questionEl.textContent = "game score is: " + gameScore;
}
