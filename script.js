let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let playerCanMove = false;
let score = 0;
let lives = 3;

livesFunction();

// On Start button click
document.getElementById("startBttn").addEventListener("click", function () {
    playerCanMove = true;

    // Hide the entire start container
    document.getElementById("startDiv").classList.add("hidden");

    console.log("Game started. Movement enabled.");
});

// Simulated player movement
document.addEventListener("keydown", function (e) {
    if (!playerCanMove) {
        console.log("You can't move yet!");
        return;
    }

    if (e.key === "ArrowLeft") {
        console.log("Player moved left");
    } else if (e.key === "ArrowRight") {
        console.log("Player moved right");
    }
});


function livesFunction() {
    console.log('livesFunction called');
    if (score === 0) {
        const livesList = document.querySelector('.livesDiv ul');
        livesList.innerHTML = '';
        if (livesList) {
            for (let i = 0; i < 3; i++) {
                console.log('Adding a life');
                const li = document.createElement('li');
                li.textContent = '❤️';
                livesList.appendChild(li);
            }
        }
    }
}

function loseLife() {
    if (lives > 0) {
        lives--;
        const livesList = document.querySelector('.livesDiv ul');
        if (livesList.children.length > 0) {
            livesList.removeChild(livesList.lastElementChild);
        }
        if (lives === 0) {
            playerCanMove = false;
            gameOver();
        }
    }
}


const enemies = document.querySelectorAll('.enemy');

enemies.forEach(enemy => {
    if (enemyCollision(player, enemy)) {
        loseLife();
    }
});







const main = document.querySelector('main');

// Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Function to randomize enemies
function randomiseEnemies(count) {
    let placedEnemies = 0;
    while (placedEnemies < count) {
        let row = Math.floor(Math.random() * maze.length);
        let column = Math.floor(Math.random() * maze[row].length);
        if (maze[row][column] === 0) { // Only place enemy on empty space
            maze[row][column] = 3; // Place enemy
            placedEnemies++;
        }
    }
}

// Function to randomize walls
function randomiseWalls(count) {
    let placedWalls = 0;
    while (placedWalls < count) {
        let row = Math.floor(Math.random() * maze.length);
        let column = Math.floor(Math.random() * maze[row].length);
        if (maze[row][column] === 0) { // Only place wall on empty space
            maze[row][column] = 1; // Place wall
            placedWalls++;
        }
    }
}

// Randomize enemies and walls
randomiseEnemies(3); // Randomize 5 enemies
randomiseWalls(10); // Randomize 10 walls

// Populate the maze in the HTML
main.innerHTML = ''; // Clear previous maze
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);
    }
}


//Player movement
function keyUp(event) {
    if (!playerCanMove) return;
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (!playerCanMove) return;
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

// Hitbox detection
const player = document.querySelector("#player");
let positiontop = 0;
let positionleft = 0;
function move() {
    const position = player.getBoundingClientRect();
    pointCheck();
    if (downPressed == true) {
        let positionBottom = position.bottom + 1;
        let btmL = document.elementFromPoint(position.left, positionBottom)
        let btmR = document.elementFromPoint(position.right, positionBottom)

        if (btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
            positiontop++;
            player.style.top = positiontop + 'px';
        }
    }

    if (leftPressed == true) {
        let positionLeft = position.left + 1;
        let topLeft = document.elementFromPoint(positionLeft, position.top)
        let bottomLeft = document.elementFromPoint(positionLeft, position.bottom)

        if (topLeft.classList.contains('wall') == false && bottomLeft.classList.contains('wall') == false) {
            positionleft--;
            player.style.left = positionleft + 'px';
        }
    }

    if (upPressed == true) {
        let positionTop = position.top - 1;
        let topLeft = document.elementFromPoint(position.left, positionTop)
        let topRight = document.elementFromPoint(position.right, positionTop)

        if (topLeft.classList.contains('wall') == false && topRight.classList.contains('wall') == false) {
            positiontop--;
            player.style.top = positiontop + 'px';
        }
    }

    if (rightPressed == true) {
        let positionRight = position.right + 1;
        let topRight = document.elementFromPoint(positionRight, position.top)
        let bottomRight = document.elementFromPoint(positionRight, position.bottom)

        if (topRight.classList.contains('wall') == false && bottomRight.classList.contains('wall') == false) {
            positionleft++;
            player.style.left = positionleft + 'px';
        }
    }
}
function pointCheck() {
    const points = document.querySelectorAll('.point');
    const position = player.getBoundingClientRect();
    for (let i = 0; i < points.length; i++) {
        let pos = points[i].getBoundingClientRect();
        if (
            position.right > pos.left &&
            position.left < pos.right &&
            position.bottom > pos.top &&
            position.top < pos.bottom
        ) {
            points[i].classList.remove('point');
            setScore();
        }
    }
}

function setScore() {
    const p = document.querySelector('.score p');
    score = score + 1;
    p.innerHTML = score;
}

function resetScore() {
    const p = document.querySelector('.score p');
    score = 0;
    p.innerHTML = '0';
}

setInterval(move, 10);

let enemyTimer = setInterval(enemyCollision, 5);


document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);




function moveEnemy(enemy) {
    let top = 0;
    let left = 0;

    setInterval(function () {
        top;
        left--;
        enemy.style.top = top + "px";
    })
}

let canLoseLife = true;

function enemyCollision() {
    if (!canLoseLife) return;

    const enemies = document.querySelectorAll('.enemy');
    const position = player.getBoundingClientRect();
    for (let enemy of enemies) {
        let enemyPosition = enemy.getBoundingClientRect();
        if (
            position.right > enemyPosition.left &&
            position.left < enemyPosition.right &&
            position.bottom > enemyPosition.top &&
            position.top < enemyPosition.bottom
        ) {
            loseLife();
            canLoseLife = false;
            setTimeout(() => {
                canLoseLife = true;
            }, 1000); // 1 second cooldown before you can lose another life
            break; // stop checking after first hit
        }
    }
}

function moveEnemiesTowardPlayer() {
    const playerPos = player.getBoundingClientRect();  // Get player position
    const enemies = document.querySelectorAll('.enemy'); // Get all enemies

    enemies.forEach(enemy => {
        let enemyPos = enemy.getBoundingClientRect(); // Get enemy position
        let dx = playerPos.x - enemyPos.x; // Difference in x position
        let dy = playerPos.y - enemyPos.y; // Difference in y position

        let stepX = dx === 0 ? 0 : dx / Math.abs(dx); // Step in x direction
        let stepY = dy === 0 ? 0 : dy / Math.abs(dy); // Step in y direction

        // Function to check if the position is blocked by a wall
        function isWall(x, y) {
            let element = document.elementFromPoint(x, y);
            return element && element.classList.contains('wall');
        }

        // Move step by step
        let nextPosTop = parseInt(enemy.style.top || 0); // Current top position
        let nextPosLeft = parseInt(enemy.style.left || 0); // Current left position

        // Check horizontal movement
        if (stepX !== 0) {
            let nextX = nextPosLeft + stepX;
            if (!isWall(nextX, nextPosTop) && !isWall(nextX, nextPosTop + enemy.offsetHeight)) {
                nextPosLeft += stepX; // Move the enemy horizontally if no wall
            }
        }

        // Check vertical movement
        if (stepY !== 0) {
            let nextY = nextPosTop + stepY;
            if (!isWall(nextPosLeft, nextY) && !isWall(nextPosLeft + enemy.offsetWidth, nextY)) {
                nextPosTop += stepY; // Move the enemy vertically if no wall
            }
        }

        // Update the enemy's position if moved
        enemy.style.top = nextPosTop + 'px';
        enemy.style.left = nextPosLeft + 'px';
    });
}




setInterval(() => {
    moveEnemiesTowardPlayer();
}, 100);











function gameOver() {
    const startBttn = document.querySelector('.startDiv');
    setTimeout(() => {
        startBttn.style.display = 'flex';
    }, 1000); // show after 1 second
    let h1 = document.querySelector('.start');
    h1.innerHTML = 'GAME OVER!';
    player.classList = 'dead';
    playerCanMove = false;
    const p = document.querySelector('.score p');
    resetScore();

}








