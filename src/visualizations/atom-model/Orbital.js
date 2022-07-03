const Particle = require("./Particle");

class Orbital {
    constructor(radius, orbitX, orbitY, orbitZ) {
        this.orbitX = orbitX;
        this.orbitY = orbitY;
        this.orbitZ = orbitZ;
        this.radius = radius;
        
        this.electrons = [];
        this.electrons.push(new Particle(this.radius, 0));
        this.electrons.push(new Particle(this.radius, PI));
    }

    update() {     
        push();

        rotateX(this.orbitX)
        rotateY(this.orbitY)
        rotateZ(this.orbitZ)
        
        noFill();
        strokeWeight(1.5)
        stroke(color(40, 40, 230, 100));
        circle(0, 0, this.radius*2);

        for (const electron of this.electrons) {
            electron.update();
        }
        
        pop();
    }
}

module.exports = Orbital;