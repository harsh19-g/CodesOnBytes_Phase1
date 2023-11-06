const questions = [
    {
        question: "what is the first Programming Language?",
        answers:[
            {text:"C++", correct: "false"},
            {text:"C", correct: "true"},
            {text:"Java", correct: "false"},
            {text:"JavaScript", correct: "false"},
        ]
    },
    {
        question: "what is the size of int data type in 32-bit compile?",
        answers:[
            {text:"1 byte", correct: "false"},
            {text:"2 byte", correct: "false"},
            {text:"4 byte", correct: "true"},
            {text:"3 byte", correct: "false"},
        ]
    },
    {
        question: "Most popular programming language in the World?",
        answers:[
            {text:"JavaScript", correct: "true"},
            {text:"Ruby", correct: "false"},
            {text:"Python", correct: "false"},
            {text:"C++", correct: "false"},
        ]
    },
    {
        question: "ReactJS is used for?",
        answers:[
            {text:"Backened", correct: "false"},
            {text:"Data Science", correct: "false"},
            {text:"Analysis", correct: "false"},
            {text:"Frontend", correct: "true"},
        ]
    },
    {
        question: "props in ReactJS stands for?",
        answers:[
            {text:"properties", correct: "true"},
            {text:"proposal", correct: "false"},
            {text:"proper", correct: "false"},
            {text:"premature", correct: "false"},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score  = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button  = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();