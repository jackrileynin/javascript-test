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
 var timerInterval;
 var questionHovered = false;
    var timeLeft = 60;



 



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
     showQuestion();
     let searchInput = document.getElementById('search-input');
    let scoreListings = document.getElementById('score-listings');
    let setScoreButton = document.getElementById('set-score-button');

    if (searchInput) {
        endPage.removeChild(searchInput);
    }
    if (scoreListings) {
        endPage.removeChild(scoreListings);
    }
    if (setScoreButton) {
        endPage.removeChild(setScoreButton);
    }
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


 
let finalScore 

 // End the quiz 
 function endQuiz() {   

     finalScore = finalScoreElement.textContent = "Your final score: " + score;
     wrongAnswersList.innerHTML = "";
     for (var i = 0; i < wrongAnswers.length; i++) {
         var li = document.createElement('li');
         li.textContent = wrongAnswers[i].answers[wrongAnswers[i].correctAnswer] + " is the correct answer to: " + wrongAnswers[i].question;

         wrongAnswersList.appendChild(li);
     }      
     //show the right answers to the li elements
        startPage.hidden = true;


     pages[0].hidden = true;
     endPage.style.display = "block";
     //if the style of the endPage is block, then show button to trigger prompt to enter initials
     searchScores();

        const setScoreButton = document.createElement("button");
        setScoreButton.textContent = "Save Score";
        setScoreButton.setAttribute("id", "set-score-button");
        endPage.appendChild(setScoreButton);
        setScoreButton.addEventListener("click", function() {
            saveInitials();
            console.log(saveInitials)
        });
    }   
    


    //function that saves the initials and score to local storage
    function saveInitials() {
        let initials = prompt("Enter your initials");
      
        localStorage.setItem(initials, finalScore);
        console.log(localStorage);
            /*if(localStorage.length >= 1){
             // functions that will create input element to find local storage item and "scroll listings" of past scores
             searchScores()
               
            } */
            
        }


    
    //function that will create input element to find scores in off of intials entered, and will display the scores accordingly
    function searchScores(){
        let searchInput = document.createElement("input");
        searchInput.setAttribute("id", "search-input");
        searchInput.setAttribute("type", "text");
        searchInput.setAttribute("placeholder", "Search Scores");
        endPage.appendChild(searchInput);
        //change it to be based off enter key
         searchInput.addEventListener("keyup" , function(event){
            if(event.key === "Enter"){
                event.preventDefault();
                let searchValue = searchInput.value;
                let scoreListings = document.createElement("ul");
                scoreListings.setAttribute("id", "score-listings");
                endPage.appendChild(scoreListings);
                for(let i = 0; i < localStorage.length; i++){
                    if(localStorage.key(i).includes(searchValue)){
                        let scoreListing = document.createElement("li");
                        scoreListing.textContent = localStorage.getItem(localStorage.key(i));
                        scoreListings.appendChild(scoreListing);
                    }
                }

            }



           
        

           /* let searchValue = searchInput.value;
            let scoreListings = document.createElement("ul");
            scoreListings.setAttribute("id", "score-listings");
            endPage.appendChild(scoreListings);
            for(let i = 0; i < localStorage.length; i++){
                if(localStorage.key(i).includes(searchValue)){
                    let scoreListing = document.createElement("li");
                    scoreListing.textContent = localStorage.getItem(localStorage.key(i));
                    scoreListings.appendChild(scoreListing);
                }
            }
        });
          */
    });


    }

    /*function loadScores(){
        //use array methods to go through the localstorage items and set them as the context of sematic elements
        for(let i = 0; 10 < localStorage.length; i++){   
            let scoreListing = document.createElement("li");
            scoreListing.textContent = localStorage.getItem(localStorage.key(i));
            endPage.appendChild(scoreListing);

        }
        console.log(scoreListing.textContent)
    }
    */
            
    


 

    // Timer
    function startTimer() {
    
        timerInterval = setInterval(function() {
           timeLeft--;
            timerElement.textContent = "Time: " + timeLeft;
            if (timeLeft <= 0) {
                
                endQuiz();
                
            }
            if (endPage.style.display === "block") {
                stopTimer();
            }

        }, 1000);

    }

    function stopTimer() {  
        return clearInterval(timerInterval);

    }   

        


 // Hover over question area to show question
 hoverArea.addEventListener('mouseover', function() {
     questionElement.hidden = false;
     questionHovered = true;
 });


