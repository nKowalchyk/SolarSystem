class Drone {
    constructor(body, messager, scene) {
        this.name = Names[Math.floor(Math.random() * (Names.length - 1))];
        this.entity;
        this.body = body;
        this.moveSpeed = 0.04;
        this.energy = 10000;
        this.size = 1;
        this.messager = messager;
        this.scene = scene;
        this.isDead = false;

        this.center = new THREE.Vector3(body.entity.position.x, body.entity.position.y, body.entity.position.z);
        this.targetSpherical = new THREE.Spherical();
        this.startSpherical = new THREE.Spherical();

        let mat = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        let geo = new THREE.BoxBufferGeometry(this.size, this.size, this.size);

        this.entity = new THREE.Mesh(geo, mat);
        this.entity.position.set(
            body.entity.position.x,
            body.entity.position.y + body.size + 5 / 2,
            body.entity.position.z
        );
        this.startSpherical.setFromCartesianCoords(this.body.entity.position.x, this.body.entity.position.y, this.body.entity.position.z).makeSafe();
        this.targetSpherical.clone(this.currentSpherical);
        scene.add(this.entity);
        this.pushRealEvent("born");
    }

    update(dt) {
        this.center = new THREE.Vector3(this.body.entity.position.x, this.body.entity.position.y, this.body.entity.position.z);
        this.startSpherical.copy(this.targetSpherical);
        this.targetSpherical.set(
            this.body.size, this.startSpherical.phi + THREE.Math.randFloat(-this.moveSpeed, this.moveSpeed), this.startSpherical.theta + THREE.Math.randFloat(-this.moveSpeed, this.moveSpeed)
        );
        this.targetSpherical.makeSafe();
        let targetVector = new THREE.Vector3().setFromSpherical(this.targetSpherical);
        this.entity.position.set(
            targetVector.x + this.body.entity.position.x, 
            targetVector.y + this.body.entity.position.y, 
            targetVector.z + this.body.entity.position.z
        );
        this.entity.lookAt(this.center);
        this.checkDeath();
    }

    consume(energy) {
       // this.pushRealEvent("energy");
        this.energy += energy;
    }

    checkDeath() {
        this.energy -= 1;
        if (this.energy <= 0 && this.isDead === false) {
            this.pushRealEvent("died");
            this.isDead = true;
            scene.remove(this.entity);
        }
    }

    pushRealEvent(realEventType) {
        let dictionary = {
            "baby" : 0,
            "born" : 1,
            "died" : 2
        };

        this.messager.pushRealEvent(this.name, dictionary[realEventType]);
    }

    pushRandomEvent() {
        this.messager.pushRandomMessage(this.name);
    }

    pushDuoEvent(otherName) {
        this.messager.pushDuoMessage(this.name, otherName);
    }
};

const Names = [
    "Liam",	"Emma",
 	"Noah",	"Olivia",
	"William",	"Ava",
	"James",	"Isabella",
	"Logan",	"Sophia",
	"Benjamin",	"Mia",
	"Mason",	"Charlotte",
	"Elijah",	"Amelia",
	"Oliver",	"Evelyn",
	"Jacob",	"Abigail",
	"Lucas",	"Harper",
	"Michael",	"Emily",
	"Alexander",	"Elizabeth",
	"Ethan",	"Avery",
	"Daniel",	"Sofia",
	"Matthew",	"Ella",
	"Aiden",	"Madison",
	"Henry",	"Scarlett",
	"Joseph",	"Victoria",
	"Jackson",	"Aria",
	"Samuel",	"Grace",
	"Sebastian",	"Chloe",
	"David",	"Camila",
	"Carter",	"Penelope",
	"Wyatt",	"Riley",
	"Jayden",	"Layla",
	"John",	"Lillian",
	"Owen",	"Nora",
	"Dylan",	"Zoey",
	"Luke",	"Mila",
	"Gabriel",	"Aubrey",
	"Anthony",	"Hannah",
	"Isaac",	"Lily",
	"Grayson",	"Addison",
	"Jack",	"Eleanor",
	"Julian",	"Natalie",
	"Levi",	"Luna"

];