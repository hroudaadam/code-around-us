class Nucleus {
    constructor() {
        this.size = 25;
        this.color = color(250, 40, 40);
    }

    update() {
        noStroke();
        fill(0);
        ambientMaterial(this.color);   
        sphere(this.size);     
    }
}

module.exports = Nucleus;