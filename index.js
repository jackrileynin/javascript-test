 // Get DOM elements
 var startButton = document.getElementById('start-button');
 var restartButton = document.getElementById('restart-button');
 var finalScoreElement = document.getElementById('final-score');
 var wrongAnswersList = document.getElementById('wrong-answers-list');
 var mainQuizPage = document.getElementById('main-quiz-page');
 var pages = document.getElementsByClassName('pages');
 var timerElement = document.getElementById('timer');
 var questionElement = document.getElementById('question');
 var answerButtons = document.getElementsByClassName('answers');
 var answerArea = document.getElementById('answer-area');
 var hoverArea = document.getElementsByClassName('hover-area')[0];
 var titleElement = document.getElementById('title');
 var descripArea = document.getElementById('descrip-area');
 const answerButtonsArray = Array.from(answerButtons);
 const startPage = document.getElementsByClassName('start-page')[0];
 const endPage = document.getElementsByClassName('end-page')[0];
 const questions = {
     1: {
         question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
         answers: ["<script src='xxx.js'>", "<script name='xxx.js'>", "<script href='xxx.js'>", "<script file='xxx.js'>"],
         correctAnswer: 0
     },
     2: {
         question: "How do you write 'Hello World' in an alert box?",
         answers: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
         correctAnswer: 3
     },
     3: {
         question: "How do you create a function in JavaScript?",
         answers: ["function:myFunction()", "function = myFunction()", "function myFunction()", "function myFunction[]"],
         correctAnswer: 2
     },
     4: {
         question: "How do you call a function named 'myFunction'?",
         answers: ["call myFunction()", "myFunction()", "call function myFunction()", "function myFunction()"],
         correctAnswer: 1
     },
     5: {
         question: "How to write an IF statement in JavaScript?",
         answers: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"],
         correctAnswer: 2
     }
 };

     
 // Set up the quiz
 var currentQuestion = 1;
 var score = 0;
 var wrongAnswers = [];
 var timeLeft = 60;
 var timerInterval;
 var questionHovered = false;
 



 // Start the quiz
 startButton.addEventListener('click', function() {
     startPage.hidden = true;
     pages[0].hidden = false;
     startTimer();
     showQuestion();
 });

 // Restart the quiz
 // make the restart button hidden until the end of the quiz
 restartButton.addEventListener('click', function() {
     startPage.hidden = false;
     endPage.style.display = "none";
     currentQuestion = 1;
     score = 0;
     wrongAnswers = [];
     timeLeft = 60;
     showQuestion();
     startTimer();
 });
 




 // Show the question and answers
 function showQuestion() {
     questionElement.textContent = questions[currentQuestion].question;
     for (var i = 0; i < answerButtons.length; i++) {
         answerButtons[i].children[0].textContent = questions[currentQuestion].answers[i];
     }
 }


 // Check the answer
 for (var i = 0; i < answerButtons.length; i++) {
     answerButtons[i].addEventListener('click', function() {
         if (this.children[0].textContent === questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]) {
             score++;
         } else {
             wrongAnswers.push(questions[currentQuestion]);
         }
         currentQuestion++;
         if (currentQuestion > Object.keys(questions).length) {
             endQuiz();
         } else {
             showQuestion();
         }
     });
 }


 


 // End the quiz 
 function endQuiz() {
     clearInterval(timerInterval);
     finalScoreElement.textContent = "Your final score: " + score;
     wrongAnswersList.innerHTML = "";
     for (var i = 0; i < wrongAnswers.length; i++) {
         var li = document.createElement('li');
         li.textContent = wrongAnswers[i].question;
         wrongAnswersList.appendChild(li);
     }
     pages[0].hidden = true;
     endPage.style.display = "block";
 }
 

 // Timer
 function startTimer() {
     timerInterval = setInterval(function() {
         timeLeft--;
         timerElement.textContent = "Time: " + timeLeft;
         if (timeLeft <= 0) {
             endQuiz();
         }
     }, 1000);
 }



 // Hover over question area to show question
 hoverArea.addEventListener('mouseover', function() {
     questionElement.hidden = false;
     questionHovered = true;
 });
