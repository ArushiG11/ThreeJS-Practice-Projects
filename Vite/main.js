import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

// create Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// create Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.z = 5;

// Create object - geometry and material
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
const dodecahedron = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshLambertMaterial({ color: '#A7A7A7', emissive: '#A7A7A7'  });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

// add object to scene
scene.add(dodecahedron);
scene.add(box);


// add light
const light = new THREE.SpotLight(0x9CDBA6, 100);
light.position.set(1, 1, 1);
scene.add(light);

// create Renderer  
const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setClearColor(scene.background);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // set pixel ratio so that the scene looks good on different devices

// Add Orbit Controls to make the canvas interactive
const controls = new OrbitControls(camera, renderer.domElement); //domElement is used to attach the control to the canvas // what is domElement? - an element that is part of the DOM tree, such as a <div> or <canvas> element. 
controls.enableDamping = true; // enable damping to prevent the camera from zooming too quickly //make the camera movement more smooth
controls.dampingFactor = 0.05; // how much the camera movement is dampened by
controls.enableZoom = true; // enable zooming
controls.enablePan = true; // enable panning //what does panning do? - move the camera around in 3D space

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  dodecahedron.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01); // rotate the dodecahedron
  box.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005); // rotate the box
  renderer.render(scene, camera);
  controls.update(); // update the controls to make sure they are in sync with the camera
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight; // update the camera aspect ratio when the window is resized
  camera.updateProjectionMatrix(); // update the camera projection matrix to reflect the new aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight); // resize the renderer to match the new window size
})
animate();


// To run this code, you need to have three.js library included in your HTML file.
// cd Vite
// npm create vite@latest (if you haven't already) - what it does?: creates a new Vite project
// npm i three - what it does?: installs the three.js library
// npm run dev (in the Vite directory) - what it does?: starts a development server at port 5173
