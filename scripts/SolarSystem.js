class SolarSystem {
    constructor(messager, scene) {
        this.sun;
        this.light;
        this.bodies = [];
        this.satellites = [];
        this.drones = [];
        this.energy = [];
        this.scene = scene;
        this.messager = messager;
        this.generate(scene);
    }

    update(dt) {
        this.sun.update(false, dt);
        for(let i = 0; i < this.bodies.length; i++) {
            for(let j = this.drones.length - 1; j >= 0; j--) {
                this.bodies[i].checkCollision(this.drones[j]);

                if(this.drones[j].energy >= 11000) {
                    this.drones[j].energy -= 5000;
                    this.drones[j].pushRealEvent("baby");
                    let planet = Math.floor(Math.random() * (this.bodies.length - 1));
                    this.populateBody(this.bodies[planet]);
                }

                if(this.drones[j].isDead) {
                    this.drones.splice(i, 1);
                }
            }
        }

        for(let i = 0; i < this.drones.length; i++) {
            this.drones[i].update(dt);
            this.randomMessage(this.drones[i]);
        }

        for(let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].update(true, dt);
        }
    }

    populateBody(body) {
        this.drones.push(new Drone(body, this.messager, this.scene));
        if(!body.resources) {
            let energyAmount = Math.floor(Math.random() * 1) + 25;
            for(let i = 0; i < energyAmount; i++) {
                let en = new Pellet(body, this.scene);
                body.addEnergy(en);
            }
        }
        body.resources = true;
    }

    generate(scene) {
        let sunSize = Math.floor(Math.random() * 15) + 40;
        this.sun = new Satellite(new THREE.Vector3(0, 0, 0), sunSize, scene);
        this.light = new THREE.PointLight(0xff0000, 1, 100);
        this.light.position.set(0, 0, -50);
        this.sun.entity.add(this.light);
        scene.add(this.light);

        let planets = Math.floor(Math.random() * 9) + 1;
        for(let i = 0; i < planets; i++) {
            let position = Math.random() * 300 + 50;
            let xPosition = Math.random() * 100 - 50;
            let yPosition = Math.random() * 100 - 50;
            this.bodies.push(new Satellite(new THREE.Vector3(xPosition, 0, position), Math.floor(Math.random() * 10) + 5, scene));
        }
        this.populateBody(this.bodies[0]);
    }

    randomMessage(drone, index) {
        let randomEvent = Math.random() * 2000;
        if(randomEvent < 5) {
            drone.pushRandomEvent();
        }

        let randomDuoEvent = Math.random * 5000;
        if(randomDuoEvent < 1) {
            let other = index;
            while(other === index) {
                index = Math.floor(Math.random() * (this.drones.length - 1));
            }
            drone.pushDuoEvent(this.drones[index].name);
        }
    } 
}