class Particle {
    constructor(radius, delay = 0) {
        this.radius = radius;
        this.angle = delay;
        this.angleVelocity = 0.09;
        
        this.size = 10;
        this.color = color(40, 40, 230, 255);
    }

    update() {
        let x = sin(this.angle) * this.radius;
        let y = cos(this.angle) * this.radius;
        
        push();
        
        noStroke();
        fill(0);
        translate(x, y, 0)
        ambientMaterial(this.color);   
        sphere(this.size);
        
        pop();
        
        this.angle += this.angleVelocity;
    }
}

module.exports = Particle;