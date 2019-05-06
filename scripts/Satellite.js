class Satellite {
    constructor(origin, size, scene) {
        this.satellites = [];
        this.energy = [];
        this.size = size;
        this.entity;
        this.rotationSpeed = Math.random() * 0.001;
        this.resources = false;

        this.radius = Math.random() * 300 + 50;
        this.theta = 0;
        this.dTheta = Math.random() * 2 * Math.PI / 1000;
        
        let mat = new THREE.MeshLambertMaterial({
            color: 0x9F79EE,
            wireframe: true
        });
        let geo = new THREE.SphereBufferGeometry(this.size, this.size, 32);

        this.entity = new THREE.Mesh(geo, mat);
        this.entity.position.set(origin.x, origin.y, origin.z);
        scene.add( this.entity );
    }

    addBody(body) {
        this.satellites.push( body );
    }

    addEnergy(obj) {
        this.energy.push(obj);
        this.entity.add( this.energy[this.energy.length - 1].entity );
    }

    addDrone(drone) {
        this.drone = drone;
    }

    update(rotatable, dt) {
        for(let i = 0; i < this.satellites.length; i++) {
            this.satellites[i].update(true, dt);
        }
        this.entity.rotation.z += this.rotationSpeed;
        if(rotatable) {
            this.theta += this.dTheta;
            this.entity.position.x = this.radius * Math.cos(this.theta);
            this.entity.position.z = this.radius * Math.sin(this.theta);
        }
    }

    checkCollision(drone) {
        for(let i = this.energy.length - 1; i >= 0; i--) {
            if(this.energy[i].checkCollision(drone)) {
                this.entity.remove(this.energy[i]);
                scene.remove(this.energy[i].entity);
                this.energy.splice(i, 1);
            }
        }
    }
}