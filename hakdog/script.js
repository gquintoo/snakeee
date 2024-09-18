const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let speed = 100; // Initial speed interval in milliseconds

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen'; // Head is darker
        ctx.fillRect(segment.x, segment.y, 10, 10);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(segment.x, segment.y, 10, 10);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function update() {
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };

    // Check collision with food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').innerText = `Score: ${score}`;
        snake.unshift(head);
        generateFood();

        // Increase speed every time food is eaten
        speed = Math.max(30, speed - 15); // Minimum speed limit
        clearInterval(gameInterval); // Clear previous interval
        gameInterval = setInterval(gameLoop, speed); // Set new interval
    } else {
        snake.unshift(head);
        snake.pop(); // Remove the last segment
    }

    // Check collision with walls or self
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert('Game Over! Your score was: ' + score);
        document.location.reload();
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
}

function gameLoop() {
    update();
    draw();
}

document.addEventListener('keydown', changeDirection);
generateFood();
let gameInterval = setInterval(gameLoop, speed);
