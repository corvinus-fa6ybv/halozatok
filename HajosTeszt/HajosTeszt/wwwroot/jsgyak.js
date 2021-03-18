var div = document.createElement("div");
const most = document.getElementById("div1");

for (var i = 0; i < 10; i++) {
    let szam = document.createTextNode(i);
    div.appendChild(szam);
    document.body.insertBefore(div, div1);
    document.getElementById("div1").classList.add("szin");
   // szam.style.color = `rgb(${255 / 10 * i}, 0, ${255 / 10 * i})`;
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

        for (var oszlop = 0; oszlop <= s; oszlop++) {
            let szám = document.createElement("div");
            szám.classList.add("elem");
            szám.innerText = faktoriális(s, oszlop); 
            sor.appendChild(szám);
           
        }
    }
}








