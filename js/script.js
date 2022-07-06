const vh = document.documentElement.clientHeight;
const vw = document.documentElement.clientWidth;
var pacman = document.getElementById('pacman');

var move = 0;
var move_x = true;
var move_y = true;
var eat = 0;

var speed = 80;
var bg = 0;
var marks = 0;
var direction1 = -1;

var fruitX = 100;
var fruitY = 100;

var bgAudio = new Audio("./audio/bg.mp3");
bgAudio.pause();
bgAudio.currentTime = 0;
bgAudio.loop = true;
var audio_started = false;

var eatAudio = new Audio("./audio/eat.mp3");
var deadAudio = new Audio("./audio/dead.wav");
var wonAudio = new Audio("./audio/won.wav");

function rotateScreen() {
    fruitMove();
    if (vh > vw) {
        alert("Please Rotate your device for a Better Experience.");
    }
}

function gameOver() {

    bgAudio.pause();
    deadAudio.play();
    bgAudio.currentTime = 0;
    audio_started = false;
    clearInterval(move);
    clearInterval(eat);
    pacman.style.marginLeft = '1px';
    pacman.style.marginTop = '1px';
    pacman.style.transform = "rotate(0deg)";
    direction1 = 0;
    $("#exampleModalCenter").modal("show");
}

function resume() {
    $("#exampleModalCenter").modal("hide");
}

function moveX(direction) {
    var style = getComputedStyle(pacman);
    var x = parseInt(style.marginLeft);
    var y = parseInt(style.marginTop);
    var trTime = speed / 1000 + 's';
    pacman.style.transition = 'margin ' + trTime + ' linear';

    var angle = 0;
    if (direction == -1)
        angle = 180;
    pacman.style.transform = "rotateY(" + angle + "deg)";
    pacman.style.marginLeft = x + 10 * direction + 'px';

    // check right hit
    if (x + 10 * direction >= vw - 50) {
        gameOver();
    }

    // check left hit
    else if (x + 8 * direction < 1) {
        gameOver();
    }

    if (fruitX - 10 < x && x < fruitX + 2) {
        if (fruitY - 30 < y && y < fruitY + 10) {
            speedUp();
            fruitMove();
        }
    }

}


function moveY(direction) {
    var style = getComputedStyle(pacman);
    var x = parseInt(style.marginLeft);
    var y = parseInt(style.marginTop);
    var trTime = speed / 1000 + 's';
    pacman.style.transition = 'margin ' + trTime + ' linear'

    var angle = 90 * direction;
    pacman.style.transform = "rotate(" + angle + "deg)";
    pacman.style.marginTop = y + 10 * direction + 'px';

    // check bottom hit
    if (y + 10 * direction >= vh - 50) {
        gameOver();
    }

    // check top hit
    else if (y + 8 * direction < 1) {
        gameOver();
    }

    // eat the cherry
    if (fruitY - 10 < y && y < fruitY + 2) {
        if (fruitX - 30 < x && x < fruitX + 10) {
            speedUp();
            fruitMove();
        }

    }
}

// random popup cherry
function fruitMove() {
    eatAudio.play();
    var x = Math.floor(Math.random() * (vw - 100) + 10);
    var y = Math.floor(Math.random() * (vh - 100) + 10);
    var fruit = document.getElementById('fruit');
    fruitX = parseInt(x);
    fruitY = parseInt(y);
    fruit.style.marginLeft = fruitX + 'px';
    fruit.style.marginTop = fruitY + 'px';
    document.getElementById('marks').innerText = marks;
}


function speedUp() {
    if (speed > 10)
        speed -= 5;
    else if (speed > 1)
        speed -= 1
    else if (speed > 0.1)
        speed -= 0.1
    else {
        bgAudio.pause();
        wonAudio.play();
        bgAudio.currentTime = 0;
        audio_started = false;
        clearInterval(move);
        clearInterval(eat);
        pacman.style.marginLeft = '1px';
        pacman.style.marginTop = '1px';
        pacman.style.transform = "rotate(0deg)";
        direction1 = 0;
        $(".won").css("visibility", "visible");
        $("#won").modal("show");
    }
    marks += 10;
}


function speedDown() {
    if (speed < 100)
        speed += 10;
}

var pacmanImg = document.getElementById('pacman-img');
var bg0Name = "./js/packman0.png";
var bg1Name = "./js/packman1.png";

function pacmanbg() {
    if (bg == 1) {
        pacmanImg.src = bg1Name;
        bg = 0;
    }
    else {
        pacmanImg.src = bg0Name;
        bg = 1;
    }
}


function press(event) {

    switch (event.key) {

        case "ArrowRight":
            if (!(move_x && direction1 == 1)) {
                direction1 = 1;
                move_x = true;
                move_y = false;
                clearInterval(move);
                move = setInterval(moveX, speed, 1);
                clearInterval(eat);
                eat = setInterval(pacmanbg, 200);
                if (!audio_started) {
                    bgAudio.play()
                    audio_started = true;
                }

            }
            break;

        case "ArrowLeft":
            if (!(move_x && direction1 == -1)) {
                direction1 = -1;
                move_x = true;
                move_y = false;
                clearInterval(move);
                move = setInterval(moveX, speed, -1)
                clearInterval(eat);
                eat = setInterval(pacmanbg, 200);
                if (!audio_started) {
                    bgAudio.play()
                    audio_started = true;
                }
            }
            break;

        case "ArrowDown":
            if (!(move_y && direction1 == 1)) {
                direction1 = 1;
                move_x = false;
                move_y = true;
                clearInterval(move);
                move = setInterval(moveY, speed, 1);
                clearInterval(eat);
                eat = setInterval(pacmanbg, 200);
                if (!audio_started) {
                    bgAudio.play()
                    audio_started = true;
                }
            }
            break;

        case "ArrowUp":
            if (!(move_y && direction1 == -1)) {
                direction1 = -1;
                move_x = false;
                move_y = true;
                clearInterval(move);
                move = setInterval(moveY, speed, -1);
                clearInterval(eat);
                eat = setInterval(pacmanbg, 200);
                if (!audio_started) {
                    bgAudio.play()
                    audio_started = true;
                }
            }
            break;

        case "+":
            speedUp();
            break;
        case "-":
            speedDown();
            break;
        default:
            console.log("Too much fast...?\n Well, why don't you try to reduce the speed ;-)");

    }

}