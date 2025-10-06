let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["yellow", "red", "purple", "green"];

// ✅ Play sound based on color or event (updated folder path)
function playSound(type) {
    let audio;
    switch (type) {
        case "yellow":
            audio = new Audio("Sounds/key1.mp3");
            break;
        case "red":
            audio = new Audio("Sounds/key2.mp3");
            break;
        case "purple":
            audio = new Audio("Sounds/key3.mp3");
            break;
        case "green":
            audio = new Audio("Sounds/key4.mp3");
            break;
        case "start":
            audio = new Audio("Sounds/game-start.mp3");
            break;
        case "levelup":
            audio = new Audio("Sounds/level-up.mp3");
            break;
        case "gameover":
            audio = new Audio("Sounds/game-over.mp3");
            break;
    }
    audio.play();
}

//press key to start the game
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;
        playSound("start"); // ✅ game start sound
        setTimeout(function () {
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

//box flash function (Simon flash)
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

//user click flash
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

// ✅ Flash full sequence
function flashSequence() {
    let i = 0;
    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`);
        btnFlash(btn);
        playSound(color); // ✅ play sound for each Simon flash
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);
}

//level up
function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    playSound("levelup"); // ✅ level up sound

    //generate random box 
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);

    flashSequence();  // ✅ show whole sequence
}

//check if sequence is correct
function check(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        playSound("gameover"); // ✅ game over sound
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b>.<br>Press any Key to Start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
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
    playSound(userColor); // ✅ play sound on user click
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

//Setting highscore
let h4 = document.querySelector("h4");
let score = 0;

function setHighscore() {
    if (level > score) {
        score = level;
    }
    h4.innerText = `${score}`;
}
