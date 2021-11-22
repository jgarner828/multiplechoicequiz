
// adding constants from the DOM
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answerBtn');


//array of all questions. each array item is an object with a question bank and answer array
const questionBank = [

    {
        question: 'test question 1 ( 1 is correct)',
        answers:  [ 
            { text: 'test answer 1' },
            { text: 'test 2' },
            { text: ' answer 3' },
            { text: 'tes 4' }
        ],
        correct: 'test answer 1'
    },

    {
        question: 'test question 2 (3 is correct)',
        answers:  [ 
            { text: 'tswer 1'},
            { text: 'test 2'},
            { text: '3'},
            { text: 'answer 4'}
        ],
        correct: '3'
    },

    {
        question: 'test question 3  (correct is 2)',
        answers:  [ 
            { text: 'test answer 1' },
            { text: 'test answer 2' },
            { text: 'test answer 3' },
            { text: 'test answer 4' }
        ],
        correct: 'test answer 2'
    },

    {
        question: 'test question 4 (4 is correct)',
        answers:  [ 
            { text: 'test answer 1' },
            { text: 'test answer 2' },
            { text: 'test answer 3' },
            { text: 'test answer 4' }
        ],
        correct: 'test answer 4'
    }
];

// letting questions get shuffled.
let shuffledQuestions;
let currentQuestionIndex;


var gameScore = 0;



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
    setNextQuestion();
}



//  loads the shuffled question function with random array
function setNextQuestion() {
    reset();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}



//this inserts the question into the quiz
function showQuestion(currentQuestion) {

    questionEl.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        var button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', pickAnswer);
        answerBtnEl.appendChild(button);
    })

}


function reset() {
    nextBtn.classList.add('hide');
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}



// after you picked an answer..... 
function pickAnswer(e) {
 // if at the end of the array restart the game and post the score
    if (shuffledQuestions.length === currentQuestionIndex + 1) {
        console.log('end of game score is ' + gameScore);
        questionEl.classList.add('hide')
        startBtn.innerText = 'Would you like to restart?';
        startBtn.classList.remove('hide');
    }


    var selectedBtn = e.target;
    const correct = shuffledQuestions[currentQuestionIndex].correct

    if(selectedBtn.textContent === correct) {
        gameScore++;
        currentQuestionIndex++;  

         
    } else { 
        currentQuestionIndex++; 
        
    }

    setNextQuestion();
}

  


//function that displays your score.
function postGameScore() {

    alert("You got  " + gameScore + " correct.");
}

