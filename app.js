//global variables
let myGamePiece;
let torpedoe;
let obstacle;
let redObstacle;
let enemyShip;
let enemies = [];
let enemiesRight = [];
let enemiesCenter = [];
let obstacles = [];
let bullets = 0;
let score = 0;
let newEnemies;

//generate all game pieces that are not randomly generated 
function startGame() {
    myGameArea.begin();
    let mathRandom = Math.random() * 480 - 0

    // audioObj = new Audio("assets/theme.m4a");
    // audioObj.addEventListener("canplaythrough", event => {
    //     event.preventDefault();
    //     /* the audio is now playable; play it if permissions allow */
    //     audioObj.play();
    // });
    myGamePiece = new component(15, 20, "spaceship.png", 150, 240, "image");
    torpedoe = new component(5, 5, "bullet.png", 150, 240, "image");
    obstacle = new component(100, 20, "green", 380, -40, "color");
    powerUp = new component(20, 20, "blue", 250, -90, "color");
    enemyShip = new component(30, 30, "enemy.png", mathRandom, 0, "image");
    redObstacle = new component(100, 20, "red", mathRandom, 0, "color")

}
//game area, canvas context, and mechanism for arrow key movement
let myGameArea = {
    canvas: document.createElement("canvas"),
    begin: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        score = 0;
        document.getElementById("show-score").innerHTML = score;

        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);


        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
            move(e);
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
            clearmove(e);
        });
        window.addEventListener('touchmove', function (e) {
            myGameArea.x = e.touches[0].screenX;
            myGameArea.y = e.touches[0].screenY;
        })

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    },

    stop: function () {
        clearInterval(this.interval);
    },


}

//game piece interaction
function component(width, height, source, x, y, type) {
    this.type = type;
    if (type == "image" || "color") {
        this.image = new Image();
        this.image.src = source;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = source;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.collision = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }










}

//game events
function updateGameArea() {
    var x, y, height, minHeight, maxHeight;
    for (i = 0; i < obstacles.length; i++) {
        if (myGamePiece.collision(obstacles[i])) {

            myGamePiece.image.src = "explosion.png";
            myGamePiece.update();
            myGameArea.stop();
            console.log("collision");
        }
    }
    for (i = 0; i < enemies.length; i++) {
        if (myGamePiece.collision(enemies[i])) {

            myGamePiece.image.src = "explosion.png";
            myGamePiece.newPos();
            myGamePiece.update();
            myGameArea.stop();
            console.log("collision");
            return

        };
        if (torpedoe.collision(enemies[i])) {
            enemies[i].image.src = "explosion.png";
            newEnemies = enemies[i]
            setTimeout(function () {
                score++;
                console.log("direct hit");

                document.getElementById("show-score").innerHTML = score;
                newEnemies.height = 0;
                newEnemies.width = 0;

            }, 200);

        };


    }
    // for (i = 0; i < enemiesRight.length; i += 1) {
    //     if (myGamePiece.collision(enemiesRight[i])) {
    //         myGamePiece.image.src = "explosion.png";

    //         myGameArea.stop();

    //         return;
    //     }
    //     if (torpedoe.collision(enemiesRight[i])) {
    //         enemiesRight[i].image.src = "explosion.png";
    //         newEnemies = enemiesRight[i]
    //         setTimeout(function () {
    //             score++;
    //             console.log("direct hit");

    //             document.getElementById("show-score").innerHTML = score;
    //             newEnemies.height = 0;
    //             newEnemies.width = 0;   

    //         }, 200);



    //     }
    // }


    if (myGameArea.key && myGameArea.key == 37) { myGamePiece.speedX = -4; };
    if (myGameArea.key && myGameArea.key == 39) { myGamePiece.speedX = 4; };
    if (myGameArea.key && myGameArea.key == 38) { myGamePiece.speedY = -4; };
    if (myGameArea.key && myGameArea.key == 40) { myGamePiece.speedY = 4; };


    myGameArea.clear();

    myGameArea.frameNo += 1;


    myGamePiece.newPos();
    myGamePiece.update();


    torpedoe.x = myGamePiece.x;
    // torpedoe.y = myGamePiece.y;
    myGamePiece.update();

    torpedoe.update();

    torpedoe.width = 2;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if (obstacle.collision(myGamePiece)) {
        myGamePiece.image.src = "explosion.png";

        obstacle.update();
        myGamePiece.update();
        myGameArea.stop();
    }
    else if
        (myGameArea.key && myGameArea.key == 83) {


        obstacle.newPos();
        obstacle.update();
        obstacle.y += 1;

        torpedoe.y -= 20

        torpedoe.width = 5
        torpedoe.update()

        setTimeout(function () {
            torpedoe.y = myGamePiece.y
            torpedoe.x = myGamePiece.x;
        }, 200);

    }

    else {

        obstacle.y += 1;
        obstacle.update();

        myGamePiece.newPos();
        myGamePiece.update();

    }
    if (myGameArea.frameNo == 1 || everyinterval(70 - score)) {
        console.log("asdfasdfas")
        y = myGameArea.canvas.height;
        x = myGameArea.canvas.height;

        minHeight = 200;
        maxHeight = 600;
        // function component(width, height, source, x, y, type) {

        // height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        // width = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        let mathRandom = Math.random() * 480 - 0

        // enemies.push(new component(enemyShip, mathRandom, -40,"image"));
        enemies.push(new component(30, 30, "enemy.png", mathRandom, 0, "image"));

    }

    if (myGameArea.frameNo == 1 || everyinterval(120 - score)) {
        y = myGameArea.canvas.height;
        x = myGameArea.canvas.height;
        minHeight = 200;
        maxHeight = 600;
        console.log("comeon")
        obstacles.push(redObstacle);


    }

    for (i = 0; i < enemies.length; i++) {
        enemies[i].y += 1;
        enemies[i].update();
    }
    // for (i = 0; i < enemiesRight.length; i += 2) {
    //     enemiesRight[i].y += 1;
    //     enemiesRight[i].update();
    // }
    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 1;
        obstacles[i].update();
    }


    //     if (score == 2) {
    // myGameArea.begin()    }

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function move(dir) {
    myGamePiece.image.src = "spaceshipburst.png";
    torpedoe.x = myGamePiece.x;
    torpedoe.y = myGamePiece.y;

    if (dir == "up") { myGamePiece.speedY = -1; };
    if (dir == "down") { myGamePiece.speedY = 1; };
    if (dir == "left") { myGamePiece.speedX = -1; };
    if (dir == "right") { myGamePiece.speedX = 1; };
}

function clearmove() {
    myGamePiece.image.src = "spaceship.png";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
// stars
// window.onload = () => {
//     const $el = document.body;



//     const genRandomNumber = (min, max) => {
//         return Math.random() * (max - min) + min;
//     }

    // Generate a star <div>

    // const genStar = () => {

    //     const star = document.createElement("img");
    //     star.src = ("assets/stars.png")
    //     star.classList.add("star");

    //     // Gen star coordinates relative to $el size
    //     let x = genRandomNumber(1, $el.offsetWidth);
    //     let y = genRandomNumber(1, $el.offsetHeight);

    //     const { style } = star;

    //     style.left = Math.floor(x) + "px";
    //     style.top = Math.floor(y) + "px";

    //     style.setProperty(
    //         "--star-size",
    //         genRandomNumber(1, 4) + "px"
    //     );

    //     style.setProperty(
    //         "--twinkle-duration",
    //         Math.ceil(genRandomNumber(1, 5)) + "s"
    //     );

    //     style.setProperty(
    //         "--twinkle-delay",
    //         Math.ceil(genRandomNumber(1, 5)) + "s"
    //     );

    //     return star;
    // }

    // for (let index = 0; index < 25; index++) {
    //     $el.append(genStar());
    // }

// }