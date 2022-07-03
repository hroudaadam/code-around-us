let ground;
let sprites = [];
let canvas;


function setup() {
  canvas = createCanvas(720, 400);

  ground = new Ground(30);
  
  sprites.push(new Sprite(360, 30, 5));
  sprites.push(new Sprite(20, -123, 5));
  sprites.push(new Sprite(520, -202, 5));
  sprites.push(new Sprite(210, 20, 5));
  sprites.push(new Sprite(74, -12, 5));
}

function draw() { 
  background(color(80,100,200));     
  ground.render();   
  
  let gravity = new Vector(0,3);

  for (let sprite of sprites) {
    sprite.applyForce(gravity);
    sprite.update(); 
    sprite.render();
  }
}

// sprite class
class Sprite {
  constructor(x, y, mass) {
      this.pos = new Vector(x, y);
      this.mass = mass;
      this.size = mass*8;
      this.vel = new Vector(0,0);
      this.acc = new Vector(0,0);
  }

  render() {
      noStroke();
      fill(color(255,0,0));
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }
    
    update() {
      this.vel = Vector.Add(this.vel, this.acc);
      this.pos = Vector.Add(this.pos, this.vel); 
      this.acc = new Vector(0,0);

      // check bottom edge
      if (this.pos.y > ground.pos.y - this.size) {
        this.vel.y = this.vel.y * (-0.4);
        this.pos.y = ground.pos.y - this.size;
      }
  }

  applyForce(force) {
      let f = Vector.Div(force, this.mass); // 2nd Newton's law
      this.acc = Vector.Add(this.acc, f);
  }
}

// ground class
class Ground {
  constructor(size) {
      this.size = size;
      this.pos = new Vector(0, canvas.height - this.size)
  }

  // Custom method for updating the variables
  render() {
      noStroke();
      fill(color(50,200,100));
      rect(this.pos.x, this.pos.y, canvas.width, this.size);
  }
}

// vector class
class Vector {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  static Add(vector1, vector2) {
      var result = new Vector(
          vector1.x + vector2.x,
          vector1.y + vector2.y
      );
      return result;
  }

  static Div(vector, scalar) {
      var result = new Vector(
          vector.x/scalar,
          vector.y/scalar
      );
      return result;
  }
}