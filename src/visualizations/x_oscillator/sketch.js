const width = 900;
const height = 400;
const fps = 60;

const period = 4;
let frequency = 1/period;
const amplitude = 75;
const equalibrumY = 225;
const b = 0.1;
const m = 5;


function setup() {
    createCanvas(width, height);
    frameRate(fps);
}

function draw() {
    background(200);

    let t = frameCount/fps; // returns time
    let angleFrequency = TWO_PI/period;

    // harmonic oscillator
    // let y = amplitude * sin(angleFrequency * t); // y = ym * sin(w*t)
    // damped oscillator
    let y = Math.pow(Math.E, (-1 * b * t) / (2 * m)) * amplitude * sin(angleFrequency * t); // y = ym * sin(w*t)



    stroke(color(0));
    strokeWeight(2);
    line(300, 90, 300, equalibrumY + y);

    noStroke();
    fill(color(0,0,255));
    ellipse(300, equalibrumY + y, 30);

    let vel = angleFrequency * amplitude * cos(angleFrequency * t); // v = w * ym * cos(w*t)
    let acc = -1 * pow(angleFrequency, 2) * y; // a = -w2 * 

    textSize(16);
    fill(0);
    text(`rychlost: ${Math.abs(vel.toFixed(0))}`, 30, 50);
    text(`zrychlení: ${Math.abs(acc.toFixed(0))}`, 30, 70);
    text(`odchylka: ${Math.abs(y.toFixed(0))}`, 30, 90);

    if (y == amplitude) {
        // noLoop();
    }
}



