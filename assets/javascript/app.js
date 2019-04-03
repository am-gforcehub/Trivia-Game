$(document).ready(function () {
    //define variables
    var gameActive = false;
    var correctAnswer = false;
    var timeUp = false;
    var rightAnsw = 0;
    var wrongAnsw = 0;
    var gameOver = false;
    var gameQues = [];

    $("#start-button").click(function () { //clicking the Start button should fade away the start section and fade in the questions section.
        qlist.gameOn(); // run gameOn function
    })

    getQuestions();
    // if user clicks an answer run gradeAnswer function
    $(".answer").click(function () {
        qlist.gradeAnswer($(this).data("answer")); //runs gradeAnswer function against the data value of the button the user clicked.
        timerClock.stop();
    });

    //progress to the next question when user clicks next-question button
    $("#next-question").click(qlist.gameOn);

    //clicking the reset button runs the reset function
    $("#reset").click(reset);
});

function reset() { //reset function resets the variable to their defaults.
    gameActive = false,
        correctAnswer = false,
        gameOver = false,
        qlist.qnum = 10,
        rightAnsw = 0,
        wrongAnsw = 0,
        gameQues = [];
    timerClock.reset();
    getQuestions(); //then runs getQuestions function to get a new set of 10 questions
    qlist.gameOn(); //then runs gameOn function starting a new round.
}

//questions stored as an array of objects [question, answer array, index number of correct answer, mp3, quote text, image of answer]

var options = [
    {
        question: "What is the resolution of the human eye?",
        choice: ["576 megapixels", "820 megapixels", "1024 megapixels", "600 megapixels"],
        answer: 0,
        photo: "assets/images/eye-2771174_1920.jpg"
    },
    {
        question: "What was the first planet to be discovered using the telescope, in 1781?",
        choice: ["Earth", "Mercury", "Jupitar", "Uranus"],
        answer: 3,
        photo: "assets/images/solar-system-439046_1920.jpg"
    },
    {
        question: "What is the resolution of the human eye?",
        choice: ["576 megapixels", "820 megapixels", "1024 megapixels", "600 megapixels"],
        answer: 0,
        photo: "assets/images/eye-2771174_1920.jpg"
    },
    {
        question: "What is the resolution of the human eye?",
        choice: ["576 megapixels", "820 megapixels", "1024 megapixels", "600 megapixels"],
        answer: 0,
        photo: "assets/images/eye-2771174_1920.jpg"
    },
    {
        question: "What is the resolution of the human eye?",
        choice: ["576 megapixels", "820 megapixels", "1024 megapixels", "600 megapixels"],
        answer: 0,
        photo: "assets/images/eye-2771174_1920.jpg"
    },
    {
        question: "What is the resolution of the human eye?",
        choice: ["576 megapixels", "820 megapixels", "1024 megapixels", "600 megapixels"],
        answer: 0,
        photo: "assets/images/eye-2771174_1920.jpg"
    },



    function getQuestions() { //create a copy of the questions array that can then be cut down to 10
        gameQues = questions.slice(0); //copy the questions into a new array
        for (var i = questions.length - 1; i > 0; i--) { //this algorithm (Fisher-Yates shuffle) should jumble up the order of the copied array

            var getIndex = Math.floor(Math.random() * (i + 1));
            var displayQues = gameQues[getIndex];

            gameQues[getIndex] = gameQues[i];

            gameQues[i] = displayQues;
        }

    }

var timerClock = {

    tick: new Audio("https://s3.amazonaws.com/job-ucf-code-bootcamp/civ-trivia-sounds/tick.wav"),

    clockInt: 105,

    reset: function () {
        timerClock.clockInt = 105;
        //$("#timer").text(timerClock.timeConverter(timerClock.time));
        $("#timer").text("01:45");
    },

    begin: function () {
        cycle = setInterval(timerClock.run, 1000);
    },

    stop: function () {
        clearInterval(cycle);
    },

    run: function () {
        if (timerClock.clockInt === 0) {
            timeUp = true;
            timerClock.stop();
            qlist.gameOver();
        } else {
            timerClock.tick.play();
            timerClock.clockInt--;
            var runningTime = timerClock.timeConverter(timerClock.clockInt);
            $("#timer").text(runningTime);
        }
    },

    timeConverter: function (t) {
        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        // allows game time to be altered in the future to more than one minute
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
}

getQuestions(); // call the getQuestions function

var qlist = { //set up variables and functions for new question list as an object

    qnum: 10, //number of questions to use in course of a game round

    gameOn: function () { //gameOn function either brings on a new question or if none are left in the round moves to the score

        if (qlist.qnum === 0) { //if there are no questions left

            qlist.gameOver(); // call gameOver function

        } else { //else there are questions left so display the question-well and hide the others
            $("#start-well").css("display", "none"); // hide start screen
            $("#answer-well").css("display", "none"); // hide answer screen
            $("#next-question").css("display", "none"); // hide next-question button
            $("#score-well").css("display", "none"); // hide the score screen
            $("#question-well").css("display", "inherit"); // show the question screen

            gameActive = true;

            $("#timer").css("display", "inherit"); //show the timer during the question
            timerClock.begin();
            qlist.showQuestion(); //call the showQuestion function to populate a new question to display
        }
    },

    showQuestion: function () { //populate a new question to the DOM

        qlist.qnum--; //with each new question count down from the 10, when it hits 0 the gameOn function will call gameOver

        $("#question").text(gameQues[qlist.qnum].ques); //picks a question from the object copy
        $("#0").text(gameQues[qlist.qnum].answ[0]); //for whatever question was picked shows the answer option index 0
        $("#1").text(gameQues[qlist.qnum].answ[1]); //for whatever question was picked shows the answer option index 1
        $("#2").text(gameQues[qlist.qnum].answ[2]); //for whatever question was picked shows the answer option index 2
        $("#3").text(gameQues[qlist.qnum].answ[3]); //for whatever question was picked shows the answer option index 3
    },

    gradeAnswer: function (data) { //gradeAnswer function will check to see if the user choose the right answer

        if (parseInt(data) === gameQues[qlist.qnum].answIndex) { //if the data-answer attributed to the button the user clicks is equal to the answIndex

            correctAnswer = true;
            rightAnsw++; //add to the correct answers score
            $("#answer-img").html("<img class='img-circle img-responsive center-block' src=" + gameQues[qlist.qnum].img + ">"); //shows a portrait image of the answer subject

            $("#answer-quote").html("<h2 id='displayQuote' class='text-center'>" + gameQues[qlist.qnum].quote + "</h2>"); //shows text of the answer subjects famous quote
            var audioQuote = document.createElement("audio"); //adds an audio element
            audioQuote.setAttribute("src", gameQues[qlist.qnum].sound); //picks the file path to the mp3 of the current answer subjects quote
            audioQuote.play(); //plays the audio clip
            //this will stop the audio clip when user clicks next question.
            $("#next-question").click(function () {
                audioQuote.pause();
            });
        } else {
            correctAnswer = false;
            wrongAnsw++; //add to the incorrect answers score
            $("#answer-img").html("<img class='img-circle img-responsive center-block' src=" + gameQues[qlist.qnum].imgWrong + ">");

            $("#answer-quote").html("<h2 class='text-center'>Sorry, your answer was incorrect!</h2>");
            var audioWrong = document.createElement("audio"); //adds an audio element
            audioWrong.setAttribute("src", "https://s3.amazonaws.com/job-ucf-code-bootcamp/civ-trivia-sounds/Loss2.mp3"); //grabs the loss mp3 for a wrong guess
            audioWrong.play(); //plays the audio clip
            //this will stop the audio clip when user clicks next question.
            $("#next-question").click(function () {
                audioQuote.pause();
            });
        }
        $("#question-well").css("display", "none"); // hides the question screen
        $("#answer-well").css("display", "inherit"); // shows the answer screen
        setTimeout(function () { $("#next-question").css("display", "inherit"); }, 2000); //shows the next-question button after 2 seconds
    },

    gameOver: function () { //gameOver function shows score screen and reset button

        $("#question-well").css("display", "none"); // hides question screen
        $("#answer-well").css("display", "none"); // hides answer screen
        $("#next-question").css("display", "none"); // hides next-question button
        $("#score-well").css("display", "inherit"); // shows score screen

        $("#score-correct").text(rightAnsw); //print the # of correct answers to the DOM
        $("#score-incorrect").text(wrongAnsw); //print the # of incorrect answers to the DOM
        var unanswered;
        if ((rightAnsw + wrongAnsw) === 10) {
            unanswered = "None!";
        } else {
            unanswered = 10 - rightAnsw + wrongAnsw; // calculate the # of unanswered questions
        }
        $("#score-unanswered").text(unanswered); //print the # of unanswered questions to the DOM
        $("#score-grade").text(Math.round((rightAnsw / 10) * 100) + "%"); //calculate & print the precentage grade to the DOM
        setTimeout(function () { $("#reset").css("display", "inherit"); }, 3000); //show reset button after 3 seconds
    }

}