const quizBox_div = document.querySelector('.quiz-box') as HTMLElement;
const questionNumber_span = document.querySelector('.question-number') as HTMLElement;
const question_div = document.querySelector('.question') as HTMLElement;
const answers_inputs = document.querySelectorAll('.answers > input') as NodeListOf<HTMLInputElement>;
const answers_labels = document.querySelectorAll('.answers > label') as NodeListOf<HTMLElement>;
const btnPrev = document.querySelector('.buttons button:nth-child(1)') as HTMLButtonElement;
const btnNext = document.querySelector('.buttons button:nth-child(2)') as HTMLButtonElement;
const end_Div = document.querySelector('.quiz-end-box') as HTMLElement;
const score_span = document.querySelector('.quiz-end-box > h1') as HTMLElement;
const btnTryAgain = document.querySelector('.quiz-end-box > button') as HTMLButtonElement;

let questionNumber: number = 0;
let answersPicked: number[] | undefined[] = Array.from(Array(10));

type QuestionType = {
    question: string,
    answers: {ans: string, correct: boolean}[]
}

const quiz:QuestionType[] = [{
    question: "What is a prime number?",
    answers: [{ans: "A number made up by Amazon", correct: false},
        {ans: "A number at the peak of its life", correct: false},
        {ans: "A number that is only divisible by itself or 1", correct: true},
        {ans: "A number that starts and ends with a 1", correct: false}]
    },
    {
        question: "What is an irrational number?",
        answers: [{ans: "A number that can’t be reasoned with", correct: false},
            {ans: "A magic number", correct: false},
            {ans: "A number that can’t be written as a simple fraction", correct: true},
            {ans: "Another way to call odd numbers", correct: false}]
    },{
        question: "According to The Hitchhiker’s Guide to the Galaxy, what is the answer to the “Ultimate Question of Life, the Universe, and Everything “?",
        answers: [{ans: "1", correct: false},
            {ans: "23", correct: false},
            {ans: "42", correct: true},
            {ans: "Pi", correct: false}]
    },{
        question: "What number do you get when you add together the deadly sins and the wonders of the ancient world?",
        answers: [{ans: "12", correct: false},
            {ans: "14", correct: true},
            {ans: "16", correct: false},
            {ans: "18", correct: false}]
    },{
        question: "How may degrees make up a right angle?",
        answers: [{ans: "45", correct: false},
            {ans: "60", correct: false},
            {ans: "90", correct: true},
            {ans: "120", correct: false}]
    },{
        question: "Which one of these philosophers isn’t a famous Greek mathematician?",
        answers: [{ans: "Archimedes", correct: false},
            {ans: "Homer", correct: true},
            {ans: "Euclid", correct: false},
            {ans: "Pythagoras", correct: false}]
    },{
        question: "Complete this sequence of numbers: 1, 3, 7, 15…",
        answers: [{ans: "29", correct: false},
            {ans: "30", correct: false},
            {ans: "31", correct: true},
            {ans: "32", correct: false}]
    },{
        question: "Which ancient scientist famously discovered the principle of buoyancy whilst lazing in his bath? Clue: he is said to have exclaimed ‘Eureka!’ when he figured it out.",
        answers: [{ans: "Newton", correct: false},
            {ans: "Galen", correct: false},
            {ans: "Aristotle", correct: false},
            {ans: "Archimedes", correct: true}]
    },{
        question: "What is the name of the first maths book ever written? Clue: it was written by Euclid and is about 2300 years old.",
        answers: [{ans: "The Aliums", correct: false},
            {ans: "The Aliments", correct: false},
            {ans: "The Elements", correct: true},
            {ans: "The Ailments", correct: false}]
    },{
        question: "In a right-angled triangle, what is the name given to the longest side?",
        answers: [{ans: "Hypotenuse", correct: true},
            {ans: "Tangent", correct: false},
            {ans: "Parabola", correct: false},
            {ans: "Hyperbola", correct: false}]
    }
]
const generateQuestion = (index: number) => {
    if (answersPicked[index] !== undefined) {
        answers_inputs[index].checked = true;
    } else {
        answers_inputs.forEach(input => input.checked = false)
    }
    questionNumber_span.textContent = (questionNumber+1).toString() + "/" + quiz.length;
    question_div.textContent = quiz[index].question;
    for (let i = 0; i < 4; i++) {
        answers_inputs[i].value = i.toString();
        answers_labels[i].textContent = quiz[index].answers[i].ans;
    }
}
generateQuestion(0);

const countScore = () : number => {
    let score : number = 0;
    answersPicked.map((answerIndex, questionIndex) => {
        if (answerIndex !== undefined) {
            if (quiz[questionIndex].answers[answerIndex].correct) score++;
        }
    })
    return score;
}

answers_inputs.forEach(input => {
    input.onclick = (e) => {
        answersPicked[questionNumber] = Number(input.value);
        // console.log(answersPicked)
    }
})
btnPrev.onclick = () => {
    if (questionNumber -1 < 0 ) return;
    if (questionNumber === quiz.length - 1) btnNext.textContent = "Next"
    questionNumber--;
    generateQuestion(questionNumber);
}
btnNext.onclick = () => {
    //if submit:
    if (questionNumber + 1 > quiz.length - 1) {
        console.log(countScore());
        quizBox_div.style.display = "none";
        end_Div.style.display = "flex"
        score_span.textContent = String(countScore() + "/" + quiz.length);
        return;
    }
    //if last question:
    if (questionNumber + 1 === quiz.length - 1) btnNext.textContent = "Submit"
    //other questions
    questionNumber++;
    generateQuestion(questionNumber);
}
btnTryAgain.onclick = () => {
    btnNext.textContent = "Next"
    end_Div.style.display = "none"
    quizBox_div.style.display = "block";
    questionNumber = 0;
    answersPicked = Array.from(Array(10));
    generateQuestion(0);
}