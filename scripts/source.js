
var scene, camera, renderer, light, spotlight;
var solarSystem;
var drone;
var pellets = [];
var drones = [];
var lastUpdate, deltaTime, currentTime;
var messager;

function createScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 3000 );
    renderer = new THREE.WebGLRenderer({canvas: mainCanvas});

    camera.position.set(0, 75, 300);
   
    scene.add(camera);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener('resize', handleWindowResize);
}

function createLights() {
    light = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
    spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(0, 100, 0);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height - 1024;
    spotlight.shadow.camera.near = 500;
    spotlight.shadow.camera.far = 4000;
    spotlight.shadow.camera.fov = 30;
    scene.add(spotlight);
    scene.add(light);
}

function createEntities() {
    messager = new Messager();
    solarSystem = new SolarSystem(messager, scene);
/*    drone = new Drone(solarSystem.sun, messager, scene);
    for(let i = 0; i < 10; i++) {
        pellets.push(new Pellet(solarSystem.sun, scene));
        solarSystem.sun.addEntity(pellets[i]);
    } */
    lastUpdate = Date.now();
}

function handleWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate () {
    let currentTime = Date.now();
    let deltaTime = (currentTime - lastUpdate) / 1000;
    lastUpdate = currentTime;
   // drone.update(deltaTime);
    solarSystem.update(deltaTime);
   /* for(let i = pellets.length - 1; i >= 0; i--) {
        if(pellets[i].checkCollision(drone)) {
            pellets.splice(i, 1);
        }
    } */

    //solarSystem.sun.entity.position.x += 0.1;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

createScene();
createLights();
createEntities();
animate();