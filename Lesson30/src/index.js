//23
let arrNumbers = [4, 10, 9, 6, 2, 9, 8, 7, 3, 9];

let arrSum = 0;
for (let i = 0; i < arrNumbers.length; i++) {
    if (typeof arrNumbers[i] !== 'number') {
        continue;
    }
    arrSum = arrSum + arrNumbers[i];
}
console.log("Sum: " + arrSum);

let max = -Infinity;
for (let i = 0; i < arrNumbers.length; i++) {
    if (typeof arrNumbers[i] !== 'number') {
        continue;
    }
    if (max < arrNumbers[i] && max != arrNumbers[i]) {
        max = arrNumbers[i];
    }
}
console.log("Max: " + max);

let min = Infinity;
for (let i = 0; i < arrNumbers.length; i++) {
    if (typeof arrNumbers[i] !== 'number') {
        continue;
    }
    if (min > arrNumbers[i] && min != arrNumbers[i]) {
        min = arrNumbers[i];
    }
}
console.log("Min: " + min);

let tree = "";
let rows = 5;
for (let i = 0; i <= rows; i++) {
    for (let j = 0; j < i; j++){
        tree = tree + "#";
    }
    tree = tree + "\n";
}
console.log(tree);

//26
function Accumulator(value) {
    this.value = value;
}

Accumulator.prototype.increment = function() {
    this.value += 1;
    console.log(this.value);
};

Accumulator.prototype.decrement = function() {
    this.value -= 1;
    console.log(this.value);
};


function CancelableAccumulator(value) {
    this.value = value;
    this.initialValue = value;
    Accumulator.call(this.increment, this.decrement);
}

CancelableAccumulator.prototype = Object.create(Accumulator.prototype);

CancelableAccumulator.prototype.clear = function() {
    console.log(this.initialValue);
};


let accumulator = new Accumulator(5);
let cancelableAccumulator = new CancelableAccumulator(15);

accumulator.increment();
accumulator.increment();
accumulator.increment();

accumulator.decrement();
accumulator.decrement();

cancelableAccumulator.increment();
cancelableAccumulator.increment();
cancelableAccumulator.increment();

cancelableAccumulator.decrement();
cancelableAccumulator.decrement();

cancelableAccumulator.clear();

//28
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
    }
}