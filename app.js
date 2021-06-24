

let myGamePiece;
let torpedoe;
let obstacle;
let enemyShip;
let explosion;
let enemies = [];
let obstacles = [];
let waveTwo = [];
let fighters = [];
let enemyWeapon = [];
let powerUp = [];
let allEnemies = (waveTwo, enemies)
let bullets = 0;
let newEnemies;
let rateOfFire = 200.00;
let bombAmmo = 1;
let score = 0;
let time = 60;

let mathRandom = Math.floor(Math.random() * (480 - 0 + 1)) + 0

window.onload = () => {
    let canvas = document.createElement('canvas');
    canvas.setAttribute("id","canvas-html");
    canvas.setAttribute("width","640");
    canvas.setAttribute("height","480");
    document.getElementById("canvas").appendChild(canvas);

    const context = canvas.getContext('2d');

    let img = new Image();        

    
    img.src = "assets/start.png";
    img.onload = () => { 
    context.fillStyle = "#222;";
    context.fillRect(800, 800, 800, 800);
    context.drawImage(img, -8, 20);


};


}

function component(width, height, source, x, y, type, alive) {
    this.alive = alive
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

        ctx = game.context;
        if ((type == "image") && (alive == true)) {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            ctx.font = "30px VT323";
            ctx.fillStyle = "#54ABB9";

            ctx.fillText(time, 440, 30);
            ctx.fillText("Ammo: " + bombAmmo, 380, 60);

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
        if (otherobj.alive == true) {
            var myAlive = this.alive
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var otherAlive = otherobj.alive
            var crash = true;


            if ((myAlive != otherAlive) || (mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
        }
        return crash;
    }
}





//generate all game pieces that are not randomly generated 
function startGame() {
    game.begin();
    let element =  document.getElementById("canvas-html");
    element.remove();


    document.getElementById("opening-scroll").innerHTML = ""
    document.getElementById("begin").style.display = "none"
    document.getElementById("d-pad").style.display = "inherit"


    myGamePiece = new component(30, 30, "assets/spaceship.png", 240, 240, "image", true);
    torpedoe = new component(5, 5, "assets/bullet.png", 150, 240, "image", true);
    bomb = new component(5, 200, "red", 150, 240, "color", true);
    explosion = new component(200, 200, "assets/explosion.png", 20, 300, "image", true);
    galaga1 = new component(30, 30, "green", 0, 240, "color", false)
}
//game area, canvas context, and mechanism for arrow key movement
let game = {
    canvas: document.createElement("canvas"),

    begin: function () {
        setInterval(count, 1000);
        mainTheme = new Audio("assets/theme.m4a");
        mainTheme.addEventListener("canplaythrough", event => {
            event.preventDefault();
            mainTheme.play();
        });


        setInterval(decrement, 1000)
        this.canvas.width = 480.00;
        this.canvas.height = 270.00;
        score = 0;
        document.getElementById("show-score").innerHTML = score;

        this.context = this.canvas.getContext("2d", { alpha: false });
        this.frameNo = 0;

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGame, 20);


        window.addEventListener('keydown', function (event) {
            game.key = event.keyCode;
            touchmove(event);

        });
        window.addEventListener('keyup', function (event) {
            game.key = false;
            clearmove(event);
        });
        window.addEventListener('touchmove', function (event) {
            game.x = event.touches[0].screenX;
            game.y = event.touches[0].screenY;
            touchmove(event)
        })


    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    },

    stop: function () {
        clearInterval(this.interval);
        clearInterval(score, count);
        ctx.font = "30px VT323";
        ctx.fillText("Final Score:" + score, 10, 50);
        mainTheme.src = ""
    },
    stopAudio: function () {

    }


}

//game piece interaction
//game events
var x, y, height, minHeight, maxHeight;

function updateGame() {

    if (game.key == 37 && myGamePiece.x > 0) { myGamePiece.speedX = -4; };
    if (game.key == 39 && myGamePiece.x + 30 < 480.00) { myGamePiece.speedX = 4; };
    if (game.key == 38 && myGamePiece.y > 0) { myGamePiece.speedY = -4; };
    if (game.key == 40 && myGamePiece.y + 30 < 270.00) { myGamePiece.speedY = 4; };


    for (i = 0; i < obstacles.length; i++) {
        if (myGamePiece.collision(obstacles[i])) {

            myGamePiece.alive = false

            myGamePiece.image.src = "assets/explosion.png";
            myGamePiece.newPos();
            myGamePiece.update();
            game.stop();
            console.log("collision");
            return
        }
        if (torpedoe.collision(obstacles[i])) {
            torpedoe.y = 1000;
            torpedoe.update()

        }
        if (bomb.collision(obstacles[i])) {
            obstacles[i].alive = false;

            obstacles[i].x = 10000;
        }

    }
    for (i = 0; i < waveTwo.length; i++) {
        if (myGamePiece.collision(waveTwo[i])) {

            myGamePiece.alive = false

            myGamePiece.image.src = "assets/explosion.png";
            myGamePiece.newPos();
            myGamePiece.update();

            game.stop();
            console.log("collision");
            return
        }
        if (torpedoe.collision(waveTwo[i])) {

            torpedoe.x = 10000;
            torpedoe.update()

        }
        if (bomb.collision(waveTwo[i])) {
            waveTwo[i].alive = false;

            waveTwo[i].x = 10000;
        }

        // if (enemies[i].alive == false) {
        //     enemies[i].image.src = "";

        // }
    }

    for (i = 0; i < enemies.length; i++) {

        if (myGamePiece.collision(enemies[i])) {
            myGamePiece.alive = false

            myGamePiece.image.src = "assets/explosion.png";
            myGamePiece.newPos();
            myGamePiece.update();
            game.stop();
            console.log("collision");
            game.stopAudio()
            return;

        };
        if (torpedoe.collision(enemies[i])) {
            audioObj = new Audio("assets/death.m4a");
            audioObj.addEventListener("canplaythrough", event => {
                event.preventDefault()
                audioObj.volume = 0.11;
                audioObj.play();
            });
            enemies[i].image.src = "assets/explosion.png";
            score++;
            enemies[i].alive = false;
            newEnemies = enemies[i];
            newEnemies.update();
            console.log(enemies[i].alive);
            requestAnimationFrame(function () {

                document.getElementById("show-score").innerHTML = score;
                newEnemies.image.src = ""
                newEnemies.height = 0;
                newEnemies.width = 0;

                return;
            }, 200);

        };
        if (bomb.collision(enemies[i])) {

            enemies[i].image.src = "assets/explosion.png";
            newEnemies.alive = false;

            score++;
            newEnemies = enemies[i]
            newEnemies.update()
            requestAnimationFrame(function () {

                document.getElementById("show-score").innerHTML = score;
                newEnemies.x = 1000;
                return;
            }, 200);
        }
    }

    for (i = 0; i < fighters.length; i++) {

        if (myGamePiece.collision(fighters[i])) {

            myGamePiece.image.src = "assets/explosion.png";
            myGamePiece.alive = false
            game.stopAudio()

            myGamePiece.newPos();
            myGamePiece.update();
            game.stop();
            console.log("collision");
            return

        };
        if (torpedoe.collision(fighters[i])) {
            fighters[i].image.src = "assets/explosion.png";
            score++;
            fighters[i].alive = false;
            newEnemies = fighters[i]
            newEnemies.update();
            setInterval(function () {

                document.getElementById("show-score").innerHTML = score;
                newEnemies.height = 0;
                newEnemies.width = 0;
                newEnemies.x = 1000;

                return;
            }, 100);

        };
        if (bomb.collision(fighters[i])) {

            fighters[i].image.src = "assets/explosion.png";
            newEnemies = fighters[i];

            newEnemies.alive = false;

            score++;
            newEnemies = enemies[i]
            newEnemies.update()
            setInterval(function () {

                document.getElementById("show-score").innerHTML = score;
                newEnemies.x = 1000;
                return;
            }, 200);
        }
    }

    for (i = 0; i < enemyWeapon.length; i++) {

        if (myGamePiece.collision(enemyWeapon[i])) {
            myGamePiece.alive = false
            game.stopAudio()

            myGamePiece.image.src = "assets/explosion.png";
            myGamePiece.newPos();
            myGamePiece.update();
            game.stop();
            console.log("collision");
            return

        };
        if (bomb.collision(enemyWeapon[i])) {

            fighters[i].image.src = "assets/explosion.png";
            newEnemies = enemyWeapon[i];

            newEnemies.alive = false;

            score++;
            newEnemies = enemyWeapon[i]
            newEnemies.update()
            setInterval(function () {

                document.getElementById("show-score").innerHTML = score;
                newEnemies.x = 1000;
                return;
            }, 200);
        }
    }

    game.clear();
    game.frameNo += 1;
    myGamePiece.newPos();
    myGamePiece.update();

    torpedoe.x = myGamePiece.x;
    // torpedoe.y = myGamePiece.y;

    bomb.x = myGamePiece.x;
    // bomb.y = myGamePiece.y;
    torpedoe.width = 2;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    for (i = 0; i < powerUp.length; i++) {
        if (myGamePiece.collision(powerUp[i])) {
            powerUp[i].x = 1000;
            bombAmmo += 1;
            myGamePiece.update()
        }
    }


    if (game.key == 66 && bombAmmo > 0) {

        audioObj = new Audio("assets/shoot.m4a");
        audioObj.volume = 0.11;
        audioObj.addEventListener("canplaythrough", event => {
            event.preventDefault();
            audioObj.play();
        });
        bombAmmo--;
        shootBomb(bomb);
    }

    else if
        (game.key == 83) {

        audioObj = new Audio("assets/shoot.m4a");
        audioObj.addEventListener("canplaythrough", event => {
            audioObj.volume = 0.11;

            event.preventDefault();
            audioObj.play();
        });
        torpedoe.alive = true;

        torpedoe.image.src = "assets/bullet.png";
        torpedoe.update();


        torpedoe.y -= 30.00;
        torpedoe.update();

        torpedoe.width = 5.0;
        torpedoe.update();

        setTimeout(function () {
            torpedoe.y = myGamePiece.y
            torpedoe.x = myGamePiece.x;
        }, rateOfFire);

    }
    else {

        myGamePiece.newPos();
        myGamePiece.update();

    }

    //enemy ship generation
    if (game.frameNo == 1 || everyinterval(60 - (score / 2))) {

        y = game.canvas.height;
        x = game.canvas.width;

        let mathRandom = Math.floor(Math.random() * (480 - 1 + 1)) + 1


        enemies.push(new component(30.02, 30.02, "assets/ENEMY.png", mathRandom, 0, "image", true));
        console.log(enemies)
        for (i = 0; i < enemies.length; i++) {
            enemies[i].y += 1;
            enemies[i].update();
        };

    }
    //obstacle generation 
    if (game.frameNo == 1 || everyinterval(50 - (score / 2))) {

        y = game.canvas.height;
        x = game.canvas.width;

        let mathRandom = Math.floor(Math.random() * (480 - 0 + 1)) + 0


        obstacles.push(new component(100.01, 20.01, "silver", mathRandom, 0, "color", true));

    };
    //asteroid generation
    if (game.frameNo == 1 || everyinterval(150 - (score / 2))) {

        y = game.canvas.height;
        x = game.canvas.width;

        let mathRandom = Math.floor(Math.random() * (480 - 0 + 1)) + 0

        waveTwo.push(new component(20.00, 20.00, "assets.meteor.png", mathRandom, 0, "image", true));

    };
    //enemy fighter generation
    if (game.frameNo == 1 || everyinterval(100 - (score / 2))) {

        y = game.canvas.height;
        x = game.canvas.width;

        let mathRandom = Math.floor(Math.random() * (480 - 0 + 1)) + 0

        fighters.push(new component(30.02, 30.01, "assets/shooter.png", mathRandom, -40, "image", true));
        enemyWeapon.push(new component(5, 5, "white", mathRandom, -40, "color", true));

    };

    if (game.frameNo == 1 || everyinterval(400)) {

        y = game.canvas.height;
        x = game.canvas.width;

        powerUp.push(new component(30.02, 30.01, "assets/powerup.png", mathRandom, 0, "image", true));


    };


    //enemy speed
    if (score > 30) {
        for (i = 0; i < enemies.length; i++) {
            enemies[i].y += 2;
            enemies[i].update();
        };

    }
    else
        for (i = 0; i < enemies.length; i++) {
            enemies[i].y += 1;
            enemies[i].update();
        };




    if (score > 30) {
        for (i = 0; i < obstacles.length; i++) {
            obstacles[i].y += 2;
            obstacles[i].update();
        };

    }

    else for (i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 1;
        obstacles[i].update();
    };

    for (i = 0; i < waveTwo.length; i++) {
        waveTwo[i].y += 1.3;
        waveTwo[i].update();
    };

    for (i = 0; i < powerUp.length; i++) {
        powerUp[i].y += 1.3;
        powerUp[i].update();
    };

    for (i = 0; i < fighters.length; i++) {
        let enemySpeed = Math.floor(Math.random() * 5)
        fighters[i].y += enemySpeed;
        for (w = 0; w < enemyWeapon.length; w++) {
            enemyWeapon[w].y += enemySpeed
            fighters[i].update();
            enemyWeapon[w].y += enemySpeed

            enemyWeapon[w].update();


        }
    }
    setInterval(function () {
        game.stop();

    }, 60000);

}

function everyinterval(number) {
    if ((game.frameNo / number) % 1 == 0) { return true; };
    return false;
}

function touchmove(dir) {
    myGamePiece.image.src = "assets/spaceshipburst.png";

    bomb.x = myGamePiece.x;
    bomb.y = myGamePiece.y;

    if (dir == up) { myGamePiece.speedY = -5; };
    if (dir == down) { myGamePiece.speedY = 5; };
    if (dir == left) { myGamePiece.speedX = -5; };
    if (dir == right) { myGamePiece.speedX = 5; };



}

function clearmove() {
    myGamePiece.image.src = "assets/spaceship.png";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}




function shootTorpedoe(weapon) {
    weapon.update()

    weapon.y -= 30;
    weapon.update();
    weapon.y - 50;
    weapon.update();



    setTimeout(function () {
        weapon.y = myGamePiece.y
        weapon.x = myGamePiece.x;
    }, 600);

}


function shootTorpedoe(weapon) {
    weapon.update()

    weapon.y -= 30;
    weapon.update();
    weapon.y - 50;
    weapon.update();



    setTimeout(function () {
        weapon.y = myGamePiece.y
        weapon.x = myGamePiece.x;
    }, 600);

}

function shootBomb(weapon) {

    weapon.y -= 30;

    weapon.update();
    weapon.y -= 20;
    weapon.update();
    weapon.width = 200;
    weapon.height = 50;

    weapon.y = 20;

    weapon.x = myGamePiece.x

    weapon.update()
    weapon.image.src = ""
    setInterval(weapon.alive = false, 500)


}



function count() {
    if (myGamePiece.alive == true) {
        score += 1
    }
    else
        score = score;
}

function decrement() {
    time -= 1
}

