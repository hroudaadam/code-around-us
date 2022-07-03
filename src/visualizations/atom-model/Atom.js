const Nucleus = require("./Nucleus");
const Orbital = require("./Orbital");

class Atom {
    constructor() {
        this.nucleus = new Nucleus();
        
        this.orbitals = [];
        this.orbitals.push(new Orbital(160, PI*(1/2), PI*(-3/16), 0));
        this.orbitals.push(new Orbital(160, PI*(1/2), PI*(3/16), 0));
        this.orbitals.push(new Orbital(160, 0, PI*(1/2), 0));

    }

    update() {      
        this.nucleus.update();

        for (const orbital of this.orbitals) {
            orbital.update();
        }
    }
}

module.exports = Atom;