let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["yellow", "red", "purple", "green"];

//press key to start the game
document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game started")
        started = true;
        setTimeout(function() {
            levelUp();
        }, 500);
    }
});
//restart game function
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

//box flash function
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300)
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300)
}

//level up
function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    //generate random box 
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(randBtn);
}

//check if sequence is correct
function check(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b>.<br>Press any Key to Start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "antiquewhite";
        }, 200);
        setHighscore(level);
        resetGame();
        return;
    }
    if (userSeq.length === gameSeq.length) {
        userSeq = [];
        setTimeout(levelUp, 1000);
    }
}

//button/box pressed
function btnPressed() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    check(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnPressed);
}


//restart game function
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

//Settinf highscore

let h4 = document.querySelector("h4");
let score = 0;

function setHighscore() {
    if (level > score) {
        score = level;
    }
    h4.innerText = `${score}`;
}