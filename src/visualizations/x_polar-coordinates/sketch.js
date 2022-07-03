let sprites = [];

// PARAMS
const FPS = 30;
const DELAY = 1.5;

function setup() {
    handleSetup(FPS);
}

function draw() {
    background(color(255, 255, 255, 155));
    noFill();
    strokeWeight(2);
    stroke(0);
    rect(0, 0, canvasSize, canvasSize);

    for (let sprite of sprites) {
        sprite.update();
        sprite.render();
    }
}

function restart() {
    background(255); 
    const center = createVector(canvasSize / 2.0, canvasSize / 2.0)
    sprites.push(new Sprite(150, center, PI * 0));
    sprites.push(new Sprite(100, center, PI * 0.5));
    sprites.push(new Sprite(175, center, PI * 1.0));
    sprites.push(new Sprite(75, center, PI * 1.5));   
}
