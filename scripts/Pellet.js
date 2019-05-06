class Pellet {
    constructor(body, scene) {
        this.entity;
        this.energy = 1000;
        this.scene = scene;
        let geo = new THREE.SphereBufferGeometry;
        let mat = new THREE.MeshBasicMaterial({
            color: 0xFFFF33,
            wireframe: true
        });

        this.entity = new THREE.Mesh(geo, mat);

        let sphere = new THREE.Spherical(body.size, THREE.Math.randFloat(0, Math.PI), THREE.Math.randFloat(0, Math.PI * 2));
        let targetVector = new THREE.Vector3().setFromSpherical(sphere);
        this.entity.position.set(
            targetVector.x,
            targetVector.y,
            targetVector.z
        );
        scene.add(this.entity);
    }

    update(displacement) {
        this.entity.position.set(
            this.entity.position.x + displacement.x,
            this.entity.position.y + displacement.y,
            this.entity.position.z + displacement.z
        );
    }

    checkCollision(entity) {
        let worldPosition = new THREE.Vector3();
        if(this.entity.getWorldPosition(worldPosition).distanceTo(entity.entity.position) < entity.size * 2) {
            entity.consume(this.energy);
            this.scene.remove(this.entity);
            this.entity.geometry.dispose();
            this.entity.material.dispose();
            this.entity = undefined;
            return true;
        }
        return false;
    }
};