class Sprite {
    constructor(radius, center, angle) {
        this.radius = radius;
        this.center = center;
        
        this.angle = angle;
        this.angleVelocity = 0.05;
    }

    update() {
        this.angle += this.angleVelocity;
    }

    render() {
        noStroke();
        fill(0);
        let x = this.center.x + (sin(this.angle) * this.radius);
        let y = this.center.y + (cos(this.angle) * this.radius);
        ellipse(x, y, 35);
    }
}