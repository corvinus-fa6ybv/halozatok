
var kerdesek;
let kerdesSzam = 1;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 7; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;      //A következő kérdés száma a teljes listában
var timeoutHandler;

//rendben van
document.addEventListener("DOMContentLoaded" , ()  => {
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

    fetch("qestions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("előre_gomb").addEventListener("click", Előre)
    document.getElementById("vissza_gomb").addEventListener("click", Vissza)

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
    }

    if (localStorage.getItem("nextQuestion")) {
       nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
    }
    if (hotList.lenght === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        kérdésMegjelenítés();
    }
});

//rendben van
function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`)
                    return null;
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

    for (var i = 1; i <= 3; i++) document.getElementById("válasz" + i).classList.remove("jo", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";

}

//rendben van
function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jo");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jo");
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timeHandler = setTimeout(Előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

//rendben van
function Előre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
    
    //document.getElementById("válasz1").style.background = "lightpink";
  //  document.getElementById("válasz2").style.background = "lightpink";
  //  document.getElementById("válasz3").style.background = "lightpink";
}

//rendben van
function Vissza() {
    displayedQuestion--;
   // clearTimeout(timeoutHandler)
    if (displayedQuestion < 0) displayedQuestion = questionInHotList - 1 ;
    kérdésMegjelenítés();
   // document.getElementById("válasz1").style.background = "lightpink";
    //document.getElementById("válasz2").style.background = "lightpink";
    //document.getElementById("válasz3").style.background = "lightpink";
}


