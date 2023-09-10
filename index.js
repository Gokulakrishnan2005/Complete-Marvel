const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.Continue-btn');
const quizsection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');
const resultbox = document.querySelector('.result-box');
const tryAgain = document.querySelector('.tryAgain-btn');
const goHOmebtn = document.querySelector('.goHome-btn');





startBtn.onclick = () =>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () =>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');

}

continueBtn.onclick = () => {
    quizsection.classList.add('active');
    quizbox.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');

    showQuestions(0);
    questionCounter(1);

    headerScore();

}

tryAgain.onclick = () => {
    quizbox.classList.add('active');
    resultbox.classList.remove('active');
    nextBtn.classList.remove('active');


     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();
}

goHOmebtn.onclick = () => {
    quizsection.classList.remove('active');
    resultbox.classList.remove('active');
    nextBtn.classList.remove('active');


     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () =>{
    if(questionCount < questions.length -1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');


//getting questiona dn options from array

function showQuestions(index) {
    const questionText = document.querySelector('.question');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag

    const option = document.querySelectorAll('.option');
    for(let i=0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let CorrectAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    console.log(CorrectAnswer);
    

    if ( userAnswer == CorrectAnswer)
    {
        
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        console.log("Your Are Wrong");
        answer.classList.add('incorrect');

        //if answer incorrect, auto selected correct answer
        for(let i=0; i< allOptions; i++) {
            if(optionList.children[i].textContent == CorrectAnswer) {
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    for(let i=0; i< allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active')



}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions}`
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizbox.classList.remove('active');
    resultbox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressvalue = document.querySelector('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        // console.log(progressStartValue);
        progressvalue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

}

