
let elso = document.getElementById("div1");

for (var i = 0; i < 10; i++) {
    let szam = document.createElement("div");
    szam.innerText = i;
    elso.appendChild(szam)
    szam.classList.add("elsofeladat");
    szam.style.background = `rgb(${200 / (i / 2)}, 0, ${249 / (i / 2)})`;
}

window.onload = function () {
    console.log("start")

    var faktoriális = function (n) {
        let er = 1;
        for (let i = 2; i <= n; i++) {
            er = er * i;
        }
        return er;
    }
   
    let hova = document.getElementById("pascal");

    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);

        for (var o = 0; o <= s; o++) {
            let oszlop = document.createElement("div");
            oszlop.classList.add("elem");
            oszlop.innerText = `${faktoriális(s)/(faktoriális(o)*faktoriális(s-o))}`
            sor.appendChild(oszlop);
           
        }
    }
}








