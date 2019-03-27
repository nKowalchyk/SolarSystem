
var scene, camera, renderer, light, spotlight;
var solarSystem;

function createScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 500 );
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xa5b7bd, 1);
    
    camera.position.set(0, 25, 50);
   
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
    solarSystem = new SolarSystem(scene);
}

function handleWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate () {
    let currentTime = Date.now();
    //let deltaTime = (currentTime - lastUpdate) / 1000;
    //lastUpdate = currentTime;
    solarSystem.update(1);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

createScene();
createLights();
createEntities();
animate();