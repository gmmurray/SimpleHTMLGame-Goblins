
// Create canvas
var canvas = document.createElement("canvas"); // Create element
var ctx = canvas.getContext("2d"); // Drawing context
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas); // Add element to body
var monstersCaught = 0;
function level(){
    if (monstersCaught < 10)
        return 1;
    else if (monstersCaught >= 10)
        return 2;
}

function leveler(){
    if (level() == 1){
        bgImage.src = "resources/img/background.png"; 
        heroImage.src = "resources/img/hero.png";
    }
    else if(level() == 2){
        bgImage.src =  "resources/img/background2.jpg";
        heroImage.src = "resources/img/articuno_2.png";
    }   
}

function levelHero(){
    
}

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "resources/img/monster.png"

// Game objects
var hero = {
    speed: 256, // Hero movement pixels/second
    x: 0,
    y: 0
};

var monster = {
    x: 0,
    y: 0
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e){
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
    delete keysDown[e.keyCode];
}, false);

// Reset game field
var reset = function (){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Monster randomly spawns somewhere on screen
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
}

var update = function (modifier) {
    if (38 in keysDown) { // If player is holding up, change y position by speed * modifier
        if (hero.y > 32){
            hero.y -= hero.speed * modifier;  
        }       
    }

    if (40 in keysDown) { // Player holding down
        if (hero.y < canvas.height - 64){
            hero.y += hero.speed * modifier;
        }
    }

    if (37 in keysDown) { // Player holding left
        if (hero.x > 32){
            hero.x -= hero.speed * modifier;
        }
    }

    if (39 in keysDown) { // Player holding right
        if (hero.x < canvas.height - 32){
            hero.x +=hero.speed * modifier;
        }
    }

    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ){
        ++monstersCaught;
        reset();
    } 
};

// Draw game
var render = function () {
    leveler();
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterImage){
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
    ctx.fillText("Level: " + level(), 32, 64);
};

// Main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

var then = Date.now();
reset();
main();