var timeEl = document.querySelector(".iTime")
var questionsEl = document.querySelector(".questions-rendered");

var secondsRemaining = 75;
var penaltySeconds = 10;
var timerInterval;
var numCorrect = 0;

function setTime() 
{
    timerInterval = setInterval(function() 
    {
        secondsRemaining--;
        timeEl.textContent = "Time Remaining: " + secondsRemaining;
        if(secondsRemaining === 0) 
        {
            clearInterval(timerInterval);
        }

    }, 1000);
}

const startBtn = document.getElementById("start");
startBtn.addEventListener('click', function()
{
    setTime();
    startBtn.style.display = 'none';
    displayQuestions();
})

var questionIndex = 0;


function displayQuestions() 
{
    questionsEl.textContent = "";

    var question = questions[questionIndex];

    var questionDiv = document.createElement("div");

    var questionText = document.createElement("p");

    questionText.textContent = question.title; 

    questionDiv.appendChild(questionText)

    for (i = 0; i < question.choices.length; i++) 
    {
        var option = document.createElement("button");

        option.textContent = question.choices[i];

        option.setAttribute("class", "option");

        option.addEventListener("click", function(e) 
        {
                var optionClicked = (e.target.innerHTML); 
                if(optionClicked === questions[questionIndex].correctAnswer)
                {
                    numCorrect++;
                    document.getElementById("choice-response").innerHTML = "correct";
                    displayQuestions(questionIndex++);
                }
                else
                    {
                        secondsRemaining = secondsRemaining-penaltySeconds;
                        document.getElementById("choice-response").innerHTML = "wrong";
                        displayQuestions(questionIndex++);
                    }
        })
        questionDiv.appendChild(option);
    }

    questionsEl.appendChild(questionDiv);
}
