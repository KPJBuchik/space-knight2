//global variables
let myGamePiece;
let torpedoe;
let obstacle;
let enemyShip;
let explosion;
let enemies = [];
let obstacles = [];
let waveTwo = [];
let bullets = 0;
let score = 0;
let newEnemies;
let rateOfFire = 200.00;
let bombAmmo = 0;


function component(width, height, source, x, y, type) {
    this.type = type;
    if (type == "image") {
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


//generate all game pieces that are not randomly generated 
function startGame() {
    myGameArea.begin();
    document.getElementById("opening-scroll").innerHTML = ""
    document.getElementById("begin").style.display="none"
    document.getElementById("d-pad").style.display="inherit"


    // audioObj = new Audio("assets/theme.m4a");
    // audioObj.addEventListener("canplaythrough", event => {
    //     event.preventDefault();
    //     /* the audio is now playable; play it if permissions allow */
    //     audioObj.play();f
    // });
    myGamePiece = new component(15, 20, "spaceship.png", 150, 240, "image");
    torpedoe = new component(5, 5, "bullet.png", 150, 240, "image");
    obstacle = new component(100, 20, "green", 380, -40);
    powerUp = new component(50, 50, "green", 300, -40);
    bomb = new component(10, 10, "blue", 150, 240);
    explosion = new component(200, 200, "explosion.png", 20, 300, "image");

}
//game area, canvas context, and mechanism for arrow key movement
let myGameArea = {
    canvas: document.createElement("canvas"),
    begin: function () {

        this.canvas.width = 480.00;
        this.canvas.height = 270.00;
        score = 0;
        document.getElementById("show-score").innerHTML = score;

        this.context = this.canvas.getContext("2d", { alpha: false });
        this.frameNo = 0;

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);


        window.addEventListener('keydown', function (event) {
            myGameArea.key = event.keyCode;
            move(event);
        });
        window.addEventListener('keyup', function (event) {
            myGameArea.key = false;
            clearmove(event);
        });
        window.addEventListener('touchmove', function (event) {
            myGameArea.x = event.touches[0].screenX;
            myGameArea.y = event.touches[0].screenY;
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
//game events
function updateGameArea() {
    var x, y, height, minHeight, maxHeight;

    if (myGameArea.key && myGameArea.key == 37) { myGamePiece.speedX = -4; };
    if (myGameArea.key && myGameArea.key == 39) { myGamePiece.speedX = 4; };
    if (myGameArea.key && myGameArea.key == 38) { myGamePiece.speedY = -4; };
    if (myGameArea.key && myGameArea.key == 40) { myGamePiece.speedY = 4; };


    for (i = 0; i < obstacles.length; i++) {
        if (myGamePiece.collision(obstacles[i])) {

            myGamePiece.image.src = "explosion.png";
            myGamePiece.update();
            myGameArea.stop();
            console.log("collision");
            return;
        }
        if (torpedoe.collision(obstacles[i])) {
            torpedoe.y = 10000;
            torpedoe.update()

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
            score++;

            newEnemies = enemies[i]
            setInterval(function () {
                console.log("direct hit");

                document.getElementById("show-score").innerHTML = score;
                newEnemies.x = 1000;
                return;
            }, 200);

        };

        if (bomb.collision(enemies[i])) {
            enemies[i].image.src = "explosion.png";
            score++;

            newEnemies = enemies[i]
            setInterval(function () {
                console.log("direct hit");

                document.getElementById("show-score").innerHTML = score;
                newEnemies.x = 1000;
                return;
            }, 200);        
        };
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;

    myGamePiece.newPos();
    myGamePiece.update();


    torpedoe.x = myGamePiece.x;
    // torpedoe.y = myGamePiece.y;


    torpedoe.width = 2;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGamePiece.collision(powerUp)) {
        powerUp.x = 1000;
        bomb.x = myGamePiece.x;
        bombAmmo += 5;
        bomb.update();
        myGamePiece.update();
    }
    else if (myGameArea.key && myGameArea.key == 66 && bombAmmo > 0) {

        obstacle.newPos();
        obstacle.update();
        obstacle.y += 1;

        bomb.y -= 100;

        bomb.width = 5;
        bombAmmo -= 1;
        console.log(bombAmmo)
        bomb.update()

        setTimeout(function () {
            bomb.y = myGamePiece.y
            bomb.x = myGamePiece.x;
            bomb.update();
        }, rateOfFire);

    }

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
        obstacle.y += 1.0;

        torpedoe.y -= 30.00

        torpedoe.width = 5.0
        torpedoe.update()

        setTimeout(function () {
            torpedoe.y = myGamePiece.y
            torpedoe.x = myGamePiece.x;
        }, rateOfFire);

    }

    else {
        obstacle.y += 1.0;
        obstacle.update();
        myGamePiece.newPos();
        myGamePiece.update();

        setInterval(function () {
            powerUp.y += 1.0;
            powerUp.src = "white"
            powerUp.update();

            return;
        }, 200);
    }
    //enemy ship generation
    if (myGameArea.frameNo == 1 || everyinterval(70)) {

        y = myGameArea.canvas.height;
        x = myGameArea.canvas.height;

        let mathRandom = Math.random() * 480 - 0
        enemies.push(new component(30.02, 30.02, "ENEMY.png", mathRandom, 0, "image"));
        console.log(enemies)
        for (i = 0; i < enemies.length; i++) {
            enemies[i].y += 1;
            enemies[i].update();
        };

    }
    //obstacle generation 
    if (myGameArea.frameNo == 1 || everyinterval(120 - score)) {

        y = myGameArea.canvas.height;
        x = myGameArea.canvas.height;

        let mathRandom = Math.random() * 480 - 0

        obstacles.push(new component(100.01, 20.01, "red", mathRandom, 0));

    };

//enemy speed
    for (i = 0; i < enemies.length; i++) {
        enemies[i].y += 1;
        enemies[i].update();
    };

    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 1;
        obstacles[i].update();
    };

    // if (score > 2 && (myGameArea.frameNo == 1 || everyinterval(120 - score))){
    //     let mathRandom = Math.random() * 480 - 0

    //     waveTwo.push(new component(30, 30, "green", mathRandom, 0, "color"));
    //     for (i = 0; i < waveTwo.length; i++) {
    //         waveTwo[i].y += 1;
    //         waveTwo[i].update();
    //     };
    // }

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; };
    return false;
}

function move(dir) {
    myGamePiece.image.src = "spaceshipburst.png";

    bomb.x = myGamePiece.x;
    bomb.y = myGamePiece.y;

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


window.onload = () => {    
    typeWriter(txt)


}
//opening scroll

// // stars
// window.onload = () => {
//     const $el = document.body;



//     const genRandomNumber = (min, max) => {
//         return Math.random() * (max - min) + min;
//     }

//     // Generate a star 

//     const genStar = () => {

//         const star = document.createElement("img");
//         star.src = ("assets/stars.png")
//         star.classList.add("star");

//         // Gen star coordinates relative to $el size
//         let x = genRandomNumber(1, $el.offsetWidth);
//         let y = genRandomNumber(1, $el.offsetHeight);

//         const { style } = star;

//         style.left = Math.floor(x) + "px";
//         style.top = Math.floor(y) + "px";

//         style.setProperty(
//             "--star-size",
//             genRandomNumber(1, 4) + "px"
//         );

//         style.setProperty(
//             "--twinkle-duration",
//             Math.ceil(genRandomNumber(1, 5)) + "s"
//         );

//         style.setProperty(
//             "--twinkle-delay",
//             Math.ceil(genRandomNumber(1, 5)) + "s"
//         );

//         return star;
//     }

//     for (let index = 0; index < 25; index++) {
//         $el.append(genStar());
//     }

// }