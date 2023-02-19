import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z=50
camera.position.y=0
camera.position.x=0
scene.add(camera)

var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//groundPlane
const textureGround = new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c382ff-ba87-45f5-bc5f-272d0b65f1fa/d6z6iz9-8f44a3f1-fcf9-4cf2-b126-f085cf7137f8.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzM4MmZmLWJhODctNDVmNS1iYzVmLTI3MmQwYjY1ZjFmYVwvZDZ6Nml6OS04ZjQ0YTNmMS1mY2Y5LTRjZjItYjEyNi1mMDg1Y2Y3MTM3ZjguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vUjTWyc1WO-AVxqae-jJE6hhHtYciE9eVYFK4YZ8QV4');
const materialGround = new THREE.MeshStandardMaterial({ map: textureGround, side: THREE.DoubleSide});
const geometryGround = new THREE.PlaneGeometry(1000, 1000, 10 , 10);
const groundPlane = new THREE.Mesh(geometryGround, materialGround);
groundPlane.rotation.x=Math.PI/2;
groundPlane.receiveShadow = true;
scene.add(groundPlane)

const geometry1 = new THREE.SphereGeometry(5, 64, 64)
const texture1 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1557411732-1797a9171fcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGF0dGVybiUyMHRleHR1cmV8ZW58MHx8MHx8&w=1000&q=80');
const material1 = new THREE.MeshStandardMaterial({
  map:texture1,
  color:'#ffffff',
  transparent:true
})
const sphere = new THREE.Mesh(geometry1,material1)
scene.add(sphere)

const controls = new PointerLockControls(camera, document.body);

document.addEventListener('click', () => {
  controls.lock();
});

document.addEventListener('mousemove', (event) => {
  if (controls.isLocked) {
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;
    controls.rotateLeft(-movementX * 0.002);
    controls.rotateUp(-movementY * 0.002);
  }
});

const moveForward = () => {
  controls.moveForward(0.1);
};

const moveBackward = () => {
  controls.moveForward(-0.1);
};

const moveLeft = () => {
  controls.moveRight(-0.1);
};

const moveRight = () => {
  controls.moveRight(0.1);
};

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      moveForward();
      break;
    case 'KeyA':
      moveLeft();
      break;
    case 'KeyS':
      moveBackward();
      break;
    case 'KeyD':
      moveRight();
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
    case 'KeyA':
    case 'KeyS':
    case 'KeyD':
      // Stop movement when key is released
      controls.setVelocity(0, 0, 0);
      controls.setDirection(0, 0, 0);
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}
animate();