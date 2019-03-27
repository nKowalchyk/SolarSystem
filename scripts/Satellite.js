class Satellite {
    constructor(origin, size, scene) {
        this.satellites = [];
        this.size = size;
        this.entity;
        this.rotationSpeed = Math.random() * 0.01;
        
        let mat = new THREE.MeshLambertMaterial({
            color: 0x008080
        });
        let geo = new THREE.SphereBufferGeometry(this.size, this.size, 32);

        this.entity = new THREE.Mesh(geo, mat);
        this.entity.position.set(origin.x, origin.y, origin.z);
        scene.add( this.entity );
    }

    addBody(body) {
        this.satellites.push( body );
        this.entity.add( this.satellites[this.satellites.length - 1].entity );
    }

    update(dt) {
        for(let i = 0; i < this.satellites.length; i++) {
            this.satellites[i].update(dt);
        }

        this.entity.rotation.z += this.rotationSpeed;
    }
}