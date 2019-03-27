class SolarSystem {
    constructor(scene) {
        this.sun;
        this.bodies = [];
        this.satellites = [];
        this.generate(scene);
    }

    update(dt) {
        this.sun.update(dt);
        for(let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].update(dt);
        }
        for(let i = 0; i < this.satellites.length; i++) {
            this.satellites[i].update(dt);
        }
    }

    generate(scene) {
        let sunSize = Math.floor(Math.random() * 15) + 15;
        this.sun = new Satellite(new THREE.Vector3(0, 0, -50), sunSize, scene);
        let planetNum = Math.floor(Math.random() * 10) + 2;
        for(let i = 0; i < planetNum; i++) {
            let size = Math.floor(Math.random() * 20) + 5;
            let x = Math.random() * 200 - 100;
            let y = Math.random() * 200 - 100;
            let z = Math.random() * 200 - 100;
            this.bodies.push(new Satellite(new THREE.Vector3(
                this.sun.entity.position.x + x,
                this.sun.entity.position.y + y,
                this.sun.entity.position.z + z), 
                size, scene));
            this.sun.addBody(this.bodies[i]);
            let moonNum = Math.floor(Math.random() * 7);
            for(let j = 0; j < moonNum; j++) {
                let size = Math.floor(Math.random() * 2) + 2;
                let x = Math.random() * 20 - 10;
                let y = Math.random() * 20 - 10;
                let z = Math.random() * 20 - 10;
                this.satellites.push(new Satellite(new THREE.Vector3(
                    this.bodies[i].entity.position.x + x,
                    this.bodies[i].entity.position.y + y,
                    this.bodies[i].entity.position.z + z
                ), size, scene));
                this.bodies[i].addBody(this.satellites[j]);
            }
        }
    }
}