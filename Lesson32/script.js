const resize = document.getElementById('resize');
let clickCounter = 0;

resize.onclick = function () {
    clickCounter++;
    if (clickCounter % 2 == 0) {
        document.getElementById("resize").style.animation = 'sizeDown 2s';
        document.getElementById("resize").style.boxShadow = 'none';
        document.getElementById("resize").style.zIndex = 2;
        document.getElementById("resize").style.width = '100%';
    } else {
        document.getElementById("resize").style.animation = 'sizeUp 2s';
        document.getElementById("resize").style.boxShadow = '10px 10px 16px #bfbfbf';
        document.getElementById("resize").style.zIndex = 2;
        document.getElementById("resize").style.width = '200%';
    }
};


window.addEventListener("keydown", checkKey, false);

function checkKey(e) {
    if (e.keyCode == "65") {
        document.getElementById("A").scrollIntoView({ behavior: 'smooth' });
    } else if (e.keyCode == "66") {
        document.getElementById("B").scrollIntoView({ behavior: 'smooth' });
    } else if (e.keyCode == "67") {
        document.getElementById("C").scrollIntoView({ behavior: 'smooth' });
    } else if (e.keyCode == "68") {
        document.getElementById("D").scrollIntoView({ behavior: 'smooth' });
    } else if (e.keyCode == "69") {
        document.getElementById("E").scrollIntoView({ behavior: 'smooth' });
    } else if (e.keyCode == "70") {
        document.getElementById("F").scrollIntoView({ behavior: 'smooth' });
    } else if (e.keyCode == "71") {
        document.getElementById("G").scrollIntoView({ behavior: 'smooth' });
    } else if (e.keyCode == "72") {
        document.getElementById("H").scrollIntoView({ behavior: 'smooth' });
    }
}