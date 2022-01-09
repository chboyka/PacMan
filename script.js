const vh = document.documentElement.clientHeight;
const vw = document.documentElement.clientWidth;
var move = setInterval(moveX,100,0)
var eat = setInterval(pacmanbg,200);
clearInterval(eat);
var speed = 100;
var bg = 0;
var marks = 0;

var fruitX = 100;
var fruitY = 100;


function rotateScreen(){
    fruitMove();
    if(vh > vw){
        alert("Please Rotate your device for a Better Experience.");
    }
}

function moveX(direction){
    var pacman = document.getElementById('pacman');
    var style = getComputedStyle(pacman);
    var x = parseInt(style.marginLeft);
    var y = parseInt(style.marginTop);
    var trTime = speed/1000+'s';
    pacman.style.transition = 'margin '+trTime+' linear';
    // pacmanbg();
    var angle = 0;
    if(direction == -1)
    angle = 180;
    pacman.style.transform = "rotateY("+angle+"deg)";
    pacman.style.marginLeft = x + 10*direction + 'px';
    
    if(x+10*direction >= vw-50){
        if(!confirm('Game Over\n\nResume Game?'))
            location.reload();
        clearInterval(move);
        clearInterval(eat);
        pacman.style.marginLeft ='1px';
        pacman.style.marginTop ='1px';
        pacman.style.transform = "rotate(0deg)";
    }

    else if(x+8*direction < 1){
        // alert('game over');
        if(!confirm('Game Over\n\nResume Game?'))
            location.reload();
        clearInterval(move);
        clearInterval(eat);
        pacman.style.marginLeft ='1px';
        pacman.style.marginTop = '1px';
        pacman.style.transform = "rotate(0deg)";
    }

    if(fruitX - 10 < x && x < fruitX + 2){
        if(fruitY - 30 < y && y < fruitY + 10){
            speedUp();
            fruitMove();
        }
    }
    
}

function moveY(direction){
    var pacman = document.getElementById('pacman');
    var style = getComputedStyle(pacman);
    var x = parseInt(style.marginLeft);
    var y = parseInt(style.marginTop);
    var trTime = speed/1000+'s';
    pacman.style.transition = 'margin '+trTime+' linear'
    // pacmanbg()
    var angle = 90*direction;
    pacman.style.transform = "rotate("+angle+"deg)";
    pacman.style.marginTop = y + 10*direction + 'px';

    if(y+10*direction >= vh-50){
        if(!confirm('Game Over\n\nResume Game?'))
            location.reload();
        clearInterval(move);
        clearInterval(eat);
        pacman.style.marginLeft = '1px';
        pacman.style.marginTop = '1px';
        pacman.style.transform = "rotate(0deg)";
    }

    else if(y+8*direction < 1){
        if(!confirm('Game Over\n\nResume Game?'))
            location.reload();
        clearInterval(move);
        clearInterval(eat);
        pacman.style.marginLeft ='1px';
        pacman.style.marginTop = '1px';
        pacman.style.transform = "rotate(0deg)";
    }

    if(fruitY - 10 < y && y < fruitY + 2){
        if(fruitX - 30 < x && x < fruitX + 10){
            speedUp();
            fruitMove();
        }
            
    }
}

function speedUp(){
    marks += 10;
    speed -= 10;
}
function speedDown(){
    speed += 10;
}

function pacmanbg(){
    var bgName = "packman"+bg%2+".png";
    document.getElementById('pacman').style.backgroundImage = "url("+bgName+")";
    bg++;
}

function fruitMove(){
    var x = Math.floor(Math.random() * (vw - 100) + 10);
    var y = Math.floor(Math.random() * (vh - 100) + 10);
    var fruit = document.getElementById('fruit');
    fruitX = parseInt(x);
    fruitY = parseInt(y);
    fruit.style.marginLeft = fruitX + 'px';
    fruit.style.marginTop = fruitY + 'px';
    document.getElementById('marks').innerText = marks;
    // alert(fruitX);
    
}

function press(event){

    switch(event.key){
        case "ArrowRight":
            // moveX(1);
            clearInterval(move);
            move = setInterval(moveX,speed,1);
            clearInterval(eat);
            eat = setInterval(pacmanbg,200);
            break;
        case "ArrowLeft":
            // moveX(-1);
            clearInterval(move);
            move = setInterval(moveX,speed,-1)
            clearInterval(eat);
            eat = setInterval(pacmanbg,200);
            break;
        case "ArrowDown":
            // moveY(1);
            clearInterval(move);
            move = setInterval(moveY,speed,1);
            clearInterval(eat);
            eat = setInterval(pacmanbg,200);
            break;
        case "ArrowUp":
            // moveY(-1);
            clearInterval(move);
            move = setInterval(moveY,speed,-1);
            clearInterval(eat);
            eat = setInterval(pacmanbg,200);
            break;
        case "+":
            speedUp();
            break;
        case "-":
            speedDown();
            break;
        default:
            console.log("Play It");
        
    }

}