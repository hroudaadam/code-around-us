let width = 600;
let height = 600;
let symetry = 4;
let angle = 360 / symetry;

function setup() {
  let canvas = createCanvas(width, height);
  console.log(canvas);
  angleMode(DEGREES);
  background(255);
}

function draw() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;

    translate(width / 2, height / 2);
    strokeWeight(4);

    if (mouseIsPressed) {
      randomColor();
      for (let i = 0; i < symetry; i++) {
        rotate(angle);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}

function randomColor() {
  r = random(255); // r is a random number between 0 - 255
  g = random(255); // g is a random number betwen 100 - 200
  b = random(255);
  stroke(r, g, b);
}