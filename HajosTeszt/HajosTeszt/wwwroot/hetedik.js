window.onload = function () {
    letoltes();
}
var kerdesek;
let kerdesSzam = 0;


function letoltes() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data));
}

function letoltesBefejezodott(d) {
    console.log(d);
    kerdesek = d;
    console.log("Sikeres letöltés!");
    console.log(kerdesek);
    kerdesMegjelenites(kerdesSzam);
}

function kerdesMegjelenites(kerdes) {
    let kerdesHely = document.getElementById("kérdés_szöveg");
    kerdesHely.innerHTML = kerdesek[kerdes].questionText;

    document.getElementById("válasz1").innerHTML = kerdesek[kerdes].answer1;
    document.getElementById("válasz2").innerHTML = kerdesek[kerdes].answer2;
    document.getElementById("válasz3").innerHTML = kerdesek[kerdes].answer3;

    let kepHely = document.getElementById("kép1");
    if (kerdesek[kerdes].image != "") {
        kepHely.style.display = "initial";
        kepHely.src = "https://szoft1.comeback.hu/hajo/" + kerdesek[kerdes].image;
    } else {
        kepHely.style.display = "none";
    }
}

function Előre(lepes) {
    if (kerdesSzam < 2) {
        kerdesSzam += 1;
    }
    else {
        kerdesSzam = 0;
    }
    console.log(kerdesSzam);
    kerdesMegjelenites(kerdesSzam);
    document.getElementById("válasz1").style.background = "lightpink";
    document.getElementById("válasz2").style.background = "lightpink";
    document.getElementById("válasz3").style.background = "lightpink";
}

function Vissza(lepes) {
    if (kerdesSzam > 0) {
        kerdesSzam -= 1;
    }
    else {
        kerdesSzam = 2;
    }
    console.log(kerdesSzam);
    kerdesMegjelenites(kerdesSzam);
    document.getElementById("válasz1").style.background = "lightpink";
    document.getElementById("válasz2").style.background = "lightpink";
    document.getElementById("válasz3").style.background = "lightpink";
}


function joValasz1() {
    let valasz = document.getElementById("válasz1");
    let jo = kerdesek[kerdesSzam].correctAnswer;

    if (1 == jo) {
        valasz.style.background = 'green';
    }
    else {
        valasz.style.background = 'red';
    }

}
function joValasz2() {
    let valasz = document.getElementById("válasz2");
    let jo = kerdesek[kerdesSzam].correctAnswer;

    if (2 == jo) {
        valasz.style.background = 'green';
    }
    else {
        valasz.style.background = 'red';
    }

}
function joValasz3() {
    let valasz = document.getElementById("válasz3");
    let jo = kerdesek[kerdesSzam].correctAnswer;

    if (3 == jo) {
        valasz.style.background = 'green';
    }
    else {
        valasz.style.background = 'red';
    }
}







