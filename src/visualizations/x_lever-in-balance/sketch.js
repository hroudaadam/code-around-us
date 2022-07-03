const ww = 900;
const wh = 600;
const aClickChng = 0.5;
const fClickChng = 100;

var f1=100;
var f2=100;
var a1=5;
var a2=5;
var f1X=()=> {return map(a1, 0.5, 5, 430, 160); };
var f1L=()=> {return map(f1, 100, 1000, 50, 230); };
var f2X=()=> {return map(a2, 0.5, 5, 470, 740); };
var f2L=()=> {return map(f2, 100, 1000, 50, 230); };


// F1=10N => cca x=180
// F1=90N => cca x=430

// A1=90m => cca x=


function setup() {
  let myCanvas = createCanvas(ww, wh);
  myCanvas.parent('p5js');


  f1Plus = createButton('+');
  f1Plus.position(175, 28);
  f1Plus.mousePressed(() => {updateF1(false)});

  f1Minus = createButton('–');
  f1Minus.position(210, 28);
  f1Minus.mousePressed(() => {updateF1(true)});

  f2Plus = createButton('+');
  f2Plus.position(800, 28);
  f2Plus.mousePressed(() => {updateF2(false)});

  f2Minus = createButton('–');
  f2Minus.position(835, 28);
  f2Minus.mousePressed(() => {updateF2(true)});

  a1Plus = createButton('+');
  a1Plus.position(175, 58);
  a1Plus.mousePressed(() => {updateA1(false)});

  a1Minus = createButton('–');
  a1Minus.position(210, 58);
  a1Minus.mousePressed(() => {updateA1(true)});

  a2Plus = createButton('+');
  a2Plus.position(800, 58);
  a2Plus.mousePressed(() => {updateA2(false)});

  a2Minus = createButton('–');
  a2Minus.position(835, 58);
  a2Minus.mousePressed(() => {updateA2(true)});
}

function draw() {
  // console.log(f1X);

  background(color("lightgrey"));
  drawLabel("F₁ = " + f1.toFixed(2) + " N", 25, 50, color("red"));
  drawLabel("F₂ = " + f2.toFixed(2) + " N", 650, 50, color("blue"));
  drawLabel("a₁ = " + a1.toFixed(2) + " m", 25, 80, color("darkorange"));
  drawLabel("a₂ = " + a2.toFixed(2) + " m", 650, 80, color("blueviolet"));
  drawLabel("M₁ = 500 N.m", 25, 110, color("black"));
  drawLabel("M₂ = 500 N.m", 650, 110, color("black"));

  drawLabel("F₁", 380, 50, color("black"), 22);
  drawLabel(".", 405, 50, color("black"), 26);
  drawLabel("a₁", 420, 50, color("black"), 22);
  drawLabel("=", 450, 50, color("black"), 22);
  drawLabel("F₂", 475, 50, color("black"), 22);
  drawLabel(".", 500, 50, color("black"), 26);
  drawLabel("a₂", 515, 50, color("black"), 22);

  drawLabel("M₁", 420, 80, color("black"), 22);
  drawLabel("=", 450, 80, color("black"), 22);
  drawLabel("M₂", 470, 80, color("black"), 22);


  drawLabel("Adam Hrouda © 2021", 700, 580, color("black"), 18);


  fill(color("black"));
  noStroke();
  rectMode(CENTER);
  rect(ww/2, wh/2 + 120, 600, 15);
  fill(color("black"))
  ellipse(ww/2, wh/2 + 150, 50);

  // drawArrow(createVector(50, 50), createVector(0, 100), 0);
  var f1Arr = new Arrow(f1X(), 380, f1L(), color("red"));
  f1Arr.draw();
  var f2Arr = new Arrow(f2X(), 380, f2L(), color("blue"));
  f2Arr.draw();

  noFill();
  stroke(color("black"));
  strokeWeight(1);
  rect(460, 58, 220, 70);

  stroke(color("darkorange"));
  strokeWeight(3);
  fill(color("darkorange"));
  line(f1X(), wh/2 + 120, 450, wh/2 + 120);

  stroke(color("blueviolet"));
  strokeWeight(3);
  fill(color("blueviolet"));
  line(f2X(), wh/2 + 120, 450, wh/2 + 120);
}

function drawLabel(string, x, y, c, s=22) {
  noStroke();
  textSize(s);
  fill(c);
  text(string, x, y);
}

function updateA1(subtract) {
  var diff = a1%aClickChng;
  a1-=diff;
  if (subtract) {
    if(a1 > 0.5) a1 = a1-aClickChng
  }
  else {
    if(a1 < 5) a1 = a1+aClickChng
  }
  f1 = (f2*a2) / a1;
}

function updateA2(subtract) {
  var diff = a2%aClickChng;
  a2-=diff;
  if (subtract) {
    if(a2 > 0.5) a2 = a2-aClickChng
  }
  else {
    if(a2 < 5) a2 = a2+aClickChng
  }
  f2 = (f1*a1) / a2;
}

function updateF1(subtract) {
  var diff = f1%fClickChng;
  f1-=diff;
  if (subtract) {
    if(f1 > 100) f1 = f1-fClickChng
  }
  else {
    if(f1 < 1000) f1 = f1+fClickChng
  }
  a1 = (f2*a2) / f1;
}

function updateF2(subtract) {
  var diff = f2%fClickChng;
  f2-=diff;
  if (subtract) {
    if(f2 > 100) f2 = f2-fClickChng
  }
  else {
    if(f2 < 1000) f2 = f2+fClickChng
  }
  a2 = (f1*a1) / f2;
}

class Arrow {
  constructor(x, y, l, c) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.c = c;
  }

  draw() {
    let arrowSize = 15;
    let hx = this.x;
    let hy = this.y + arrowSize;

    stroke(this.c);
    strokeWeight(5);
    fill(this.c);
    line(this.x, this.y, this.x, this.y - this.l);

    triangle(hx, hy, hx-(arrowSize/2), hy-arrowSize, hx+(arrowSize/2), hy-arrowSize);
  }
}
