window.onload = function () {
    init();

    //  letoltes()
}
var kerdesek;
let kerdesSzam = 1;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 7; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;      //A következő kérdés száma a teljes listában
var timeoutHandler;

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés(questionNumber);
                }
            }
        );
}

function kérdésMegjelenítés() {

    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);

    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3

    if (kérdés.image != "") {
        document.getElementById("kép1").style.display = "initial";
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;;
    } else {
        document.getElementById("kép1").style.display = "none";
    }

    timeoutHandler = setTimeout(Előre, 3000);
    
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");



    document.getElementById("válasz1").onclick = function joValasz1() {
        let valasz = document.getElementById("válasz1");
        let jo = kérdés.correctAnswer;
        document.getElementById("válasz1").style.pointerEvents = "none"
        if (1 == jo) {
            valasz.style.background = 'green';
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion
            }
        }
        else {
            valasz.style.background = 'red';
            hotList[displayedQuestion].goodAnswers = 0;
        }
    }
    document.getElementById("válasz2").onclick = function joValasz2() {
        let valasz = document.getElementById("válasz2");
        let jo = kérdés.correctAnswer;
        document.getElementById("válasz2").style.pointerEvents = "none"

        if (2 == jo) {
            valasz.style.background = 'green';
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion
            }
        }
        else {
            valasz.style.background = 'red';
            hotList[displayedQuestion].goodAnswers = 0;
        }
    }
    document.getElementById("válasz3").onclick = function joValasz3() {
        let valasz = document.getElementById("válasz3");
        let jo = kérdés.correctAnswer;
        document.getElementById("válasz3").style.pointerEvents = "none"


        if (3 == jo) {
            valasz.style.background = 'green';
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion
            }
        }
        else {
            valasz.style.background = 'red';
            hotList[displayedQuestion].goodAnswers = 0;
        }
    }

}


function választás(n) {
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
}

function Előre(lepes) {
    clearTimeout(timeoutHandler)
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
    displayedQuestion++;
    document.getElementById("válasz1").style.background = "lightpink";
    document.getElementById("válasz2").style.background = "lightpink";
    document.getElementById("válasz3").style.background = "lightpink";
}

function Vissza(lepes) {
    displayedQuestion++;
    clearTimeout(timeoutHandler)
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
    document.getElementById("válasz1").style.background = "lightpink";
    document.getElementById("válasz2").style.background = "lightpink";
    document.getElementById("válasz3").style.background = "lightpink";
}


