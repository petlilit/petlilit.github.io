const board = document.getElementById("game-board");
let snake = [{ x: 10, y: 10 }];
const highScoreText = document.getElementById("highScore");
const score = document.getElementById("score")
const levelUpImg = document.getElementById("levelup")
let snakeHead;
let head;


const colors = [
    ["#990066", "#c166a3", "#ad3284"],
    ["#744fdb", "#ab95e9", "#8f72e2"],
    ["#00686e", "#4c9599", "#19777c"],
    ["#b07e9f", "#bf97b2", "#b78aa8"],
    ["#7dbbb0", "#97c8bf", "#8ac1b7"],
    ["#595f43", "#abb78a", "#8b9668"],
    ["#2874A6", "#3498DB", "#2E86C1"]  
];

const gameBorder1 = document.getElementById("gb1")
const gameBorder2 = document.getElementById("gb2");
const gameBorder3 = document.getElementById("gb3");
const logo = document.getElementById("logo");
const gameborad = document.getElementById("game-board"); 
const score1= document.getElementById("score");
const highScore1 = document.getElementById("highScore");
const levelColor = document.getElementById("level");
const eat = document.getElementById("eat");
const die = document.getElementById("die");
const levelupvolume = document.getElementById("levelup");

let color = randomColor(colors);


gameBorder1.style.border = color[0] + " solid 10px";
gameBorder2.style.border = color[1] + " solid 10px";
gameBorder3.style.border = color[2] + " solid 10px";
gameBorder3.style.backgroundColor = color[2];
gameBorder3.style.boxShadow = "inset 0 0 0 5px" + color[2];
gameBorder1.style.boxShadow = "inset 0 0 0 5px" + color[0];
gameBorder2.style.boxShadow = color[1];





logo.style.backgroundColor = color[1] + " solid 10px";
gameborad.style.border = color[1] + " solid 10px";
score1.style.color = color[1];
highScore1.style.color = color[0];
levelColor.style.color = color[2];



let gridSize = 20;
let food = generateFood();
let direction = "right";
let speed = 200;
let GameIntId;
let highScore = 0;



function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
    levelUp();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}


function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}



function drawFood() {
    let foodElement = createElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}


function move() {
    let head = { ...snake[0] };
    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "right":
            head.x++;
            break;
        case "left":
            head.x--;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        eat.volume = 0.3;
        eat.play();
        food = generateFood();
        clearInterval(GameIntId);
        GameIntId = setInterval(() => {
            move();
            collision();
            draw();
        }, speed);
    } else {
        snake.pop()
    }
}


document.addEventListener("keydown", (event) => {
    if (event.code === 'Space' || event.key === " ") {
        StartGame();
    }

})

function StartGame() {
    document.querySelector('#level').textContent = 'Lev.1';
    let img = document.getElementById('logo');
    let text = document.getElementById("settings")
    img.style.display = 'none';
    text.style.display = 'none';
    draw();
    GameIntId = setInterval(() => {
        move();
        collision();
        draw();
    }, speed);
}





document.addEventListener('keydown', (event) => {
    if ((event.code === 'ArrowUp' || event.key === "ArrowUp") && direction !== 'down') {
        direction = 'up';
    } else if ((event.code === 'ArrowDown' || event.key === "ArrowDown") && direction !== 'up') {
        direction = 'down';
    } else if ((event.code === 'ArrowLeft' || event.key === "ArrowLeft") && direction !== 'right') {
        direction = 'left';
    } else if ((event.code === 'ArrowRight' || event.key === "ArrowRight") && direction !== 'left') {
        direction = 'right';
    }
});



function collision() {

    let head = { ...snake[0] };

    if (head.x > gridSize || head.x < 1 || head.y > gridSize || head.y < 1) {
        resetGame();
        die.volume = 0.3;
        die.play();
        stopGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }



}


function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    speed = 200;
    updateScore();
}


function stopGame() {
    clearInterval(GameIntId);
    logo.style.display = "block";
    settings.style.display = "block";
    logo.style.display = "none";
    document.getElementById('settings').textContent = 'Press spase bar to continue the game';

}



function updateScore() {
    const currentScore = snake.length - 1;
    levelUp(currentScore);
    score.textContent = currentScore.toString().padStart(3, "0");
}


function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }

    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
}


function levelUp(score) {
    if (score == "5") {
        document.querySelector('#level').textContent = 'Lev.2';
        speed = 150;
        levelupvolume.volume = 0.3;
        levelupvolume.play();
    } else if(score == "10") {
        document.querySelector('#level').textContent = 'Lev.3';
        speed = 120;
        levelupvolume.volume = 0.3;
        levelupvolume.play();
    }else if(score == "15"){
        document.querySelector('#level').textContent = 'Lev.4';
        speed = 100;
        levelupvolume.volume = 0.3;
        levelupvolume.play();
    }else if (score == "20") {
        document.querySelector('#level').textContent = 'Lev.5';
        speed = 80;
    }else if (score == "25") {
        document.querySelector('#level').textContent = 'Lev.6';
        speed = 60;
        levelupvolume.volume = 0.3;
        levelupvolume.play();
    }else if (score == "30") {
        document.querySelector('#level').textContent = 'Lev.7';
        speed = 50;
        levelupvolume.volume = 0.3;
        levelupvolume.play();
    }
}


function randomColor(arr){
    const randomColors = Math.floor(Math.random() * arr.length);
    return arr[randomColors];
}
