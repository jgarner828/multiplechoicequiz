
// adding constants from the DOM
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answerBtn');


//array of all questions. each array item is an object with a question bank and answer array
const questionBank = [

    {
        question: 'test question 1',
        answers:  [ 
            { text: 'test answer 1', correct: true },
            { text: 'test answer 2', correct: false },
            { text: 'test answer 3', correct: false },
            { text: 'test answer 4', correct: false }
        ]
    },

    {
        question: 'test question 2',
        answers:  [ 
            { text: 'test answer 1', correct: true },
            { text: 'test answer 2', correct: false },
            { text: 'test answer 3', correct: false },
            { text: 'test answer 4', correct: false }
        ]
    },

    {
        question: 'test question 3',
        answers:  [ 
            { text: 'test answer 1', correct: true },
            { text: 'test answer 2', correct: false },
            { text: 'test answer 3', correct: false },
            { text: 'test answer 4', correct: false }
        ]
    },

    {
        question: 'test question 4',
        answers:  [ 
            { text: 'test answer 1', correct: true },
            { text: 'test answer 2', correct: false },
            { text: 'test answer 3', correct: false },
            { text: 'test answer 4', correct: false }
        ]
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
    nextQuestion();
})



// hides the start button. shuffles question index, displays the question container and loads next question function
function startGame() {
    startBtn.classList.add('hide');
    shuffledQuestions = questionBank.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    nextQuestion();

}



// 
function nextQuestion() {
    reset();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

    questions.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerText = answers.text;
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
    })
    button.addEventListener('click', pickAnswer);
    answerBtnEl.appendChild(button);

}



//this inserts the question into the quiz
function showQuestion(questions) {
    questionEl.innerText = questions.question;
    questions.answers.forEach(answers => {
        var button = document.getElementById('btn');
        button.innerText = answers.text;
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', pickAnswer);
        answerBtnEl.appendChild(btn);
    })

}

function reset() {
    nextBtn.classList.add('hide');
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}




function pickAnswer(e) {
    var selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtnEl.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');

}
