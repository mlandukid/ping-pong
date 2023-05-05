const canvas = document.getElementById("pingpong");
const context = canvas.getContext("2d");

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE",
};

const player = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    dy: 10,
};

const computer = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    dy: 2,
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawBall(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}

function movePaddle(paddle, upKey, downKey) {
    document.addEventListener("keydown", function(event) {
        switch(event.keyCode) {
            case upKey:
                paddle.y -= paddle.dy;
                break;
            case downKey:
                paddle.y += paddle.dy;
                break;
        }
    });
}

function collisionDetect(player, ball) {
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
}

function update() {
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.velocityY = -ball.velocityY;

    const computerLevel = 0.1;
    computer.y += (ball.y - (computer.y + computer.height / 2)) * computerLevel;
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > canvas.height) computer.y = canvas.height - computer.height;

    if (collisionDetect(player, ball)) ball.velocityX = -ball.velocityX;
    if (collisionDetect(computer, ball)) ball.velocityX = -ball.velocityX;

    if (ball.x - ball.radius < 0) {
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        resetBall();
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000000");
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
}

const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);

movePaddle(player, 87, 83);
