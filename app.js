let quizPage = document.querySelector("#quiz-page");
let mainButton = document.querySelector("#start-button");
let newHeader = document.querySelector("#title");
let questionArea = document.querySelector("#descrip-area");
let mainTimer = document.querySelector("#timer");


let changedPageLayout = [
    {
      head: "1",
      question: "How can you make a bulleted list?",
      choices: ["<ul>", "<li>", "<ol>"],
      answer: "<ul>",
      button: "Next"
    },
    {
      head: "2",
      question: "what is a semantic element?",
      choices: ["elements that provide meaning to the content they enclose", " elements that are used to structure and display text content", "elements that are used to create ordered or unordered lists"],
      answer: "elements that provide meaning to the content they enclose",
      button: "Next"
    },
    {
      head: "3",
      question: "what is flexbox?",
      choices: ["model used to help design complex layouts", "used to make page layouts more responsive to screen sizes", "gives more choices for styling fonts and texts", "define the visual styles of the selected elements"],
      answer: "model used to help design complex layouts",
      button: "Next"
    },
    {
      head: "4",
      question: "Which CSS property is used to change the text color of an element?",
      choices: ["color", "text-color", "font-color"],
      answer: "color",
      button: "Finish"
    }
  ];

let currentTime = 0;
let currentIndex = 0;
let intervalId;

mainButton.addEventListener("click", () => {
    switchPage();
    startTimer();
});

function updateTimer() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    currentTime++;
    mainTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    console.log(mainTimer);
}
function startTimer() {
    if (!intervalId && changedPageLayout.length > 0) {
      updateTimer(); // Call the updateTimer function immediately
      intervalId = setInterval(updateTimer, 1000); // Start the timer to update every second
    }
  }

function switchPage() {
   
    if (currentIndex >= changedPageLayout.length) {
        clearInterval(intervalId);
        seeAnswer();
        return;
    }

    quizPage.innerHTML = "";
    newHeader.textContent = changedPageLayout[currentIndex].head; // changes the header 

    let quizQuestion = document.createElement("p");
    quizQuestion.textContent = changedPageLayout[currentIndex].question; // changes the question

    let choices = document.createElement("ul");  

    changedPageLayout[currentIndex].choices.forEach((choice) => {
         let choiceElement = document.createElement("button");
        choiceElement.textContent = choice;
        choiceElement.addEventListener("click", () => checkAnswer(choice)); // button should check answer//effect score 
        choices.appendChild(choiceElement);
    });


    quizPage.appendChild(quizQuestion);
    quizQuestion.style.display = "flex";
    quizQuestion.style.justifyContent = "center";

    quizPage.appendChild(choices);

    mainButton.textContent = changedPageLayout[currentIndex].button;
    if (changedPageLayout[currentIndex].button.textContent === "Finish") { //change it to where the innerhtml disappers after the user clicks 
        mainButton.addEventListener("click", seeAnswer);
       
    }
    currentIndex++
}

let score = 0;
function seeAnswer(){
let finalScore = document.querySelector("#final-score");
finalScore.textContent = score.toString();

finalScore.style.visibility = "visible";
console.log(score);


}
function checkAnswer(choice){
    if(changedPageLayout[currentIndex - 1].answer === choice){
        score++
    } else if(changedPageLayout[currentIndex].answer === choice && changedPageLayout[currentIndex].button === "Finish" ){
        score++
    }
    
    
}