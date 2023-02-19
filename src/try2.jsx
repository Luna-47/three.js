//WORKS WELL

import * as THREE from "three"
import './index.css'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


// Set up the scene, camera, and renderer
var scene = new THREE.Scene();

//sizes
const sizes={
  width: window.innerWidth*0.6,
  height: window.innerHeight*0.7,
}

var message = document.createElement( 'div' );
message.style.position = 'absolute';
message.style.bottom = '2%';
message.style.right = '5%';
message.style.backgroundColor = '#282c34';
message.style.color = '#ffffff';
message.style.padding = '30px';
message.style.height ='60%';
message.style.width ='25%';
message.style.boxShadow = '2px 2px 4px grey';
message.style.opacity = '0%';
message.style.zIndex='5';
message.style.borderRadius='5px';
document.body.appendChild( message );

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)//camera width, aspect ratio
camera.position.z=450
camera.position.y=70
camera.position.x=30
scene.add(camera)

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
var selected = false;
var selectedObject = null;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

const control = new PointerLockControls(camera, canvas);

document.addEventListener('click', () => {
  control.lock();
});

document.addEventListener('mousemove', (event) => {
  if (control.isLocked) {
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;
    control.rotateLeft(-movementX * 0.002);
    control.rotateUp(-movementY * 0.002);
  }
});

const moveForward = () => {
  control.moveForward(0.1);
};

const moveBackward = () => {
  control.moveForward(-0.1);
};

const moveLeft = () => {
  control.moveRight(-0.1);
};

const moveRight = () => {
  control.moveRight(0.1);
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
      control.setVelocity(0, 0, 0);
      control.setDirection(0, 0, 0);
      break;
  }
});

//resize
window.addEventListener('resize', () =>{
  //update size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
}) 

// Create a list to store the objects in the scene
var objects = [];

//light
const light = new THREE.PointLight(0xffffff, 1, 1000)
light.position.set(0, 600, 0) //(x,y,z)
light.intensity=2
scene.add(light)
const light2 = new THREE.PointLight(0xffffff, 1, 1000)
light2.position.set(10, 500, 200) //(x,y,z)
light2.intensity=2
scene.add(light2)
const light3 = new THREE.PointLight(0xffffff, 1, 1000)
light3.position.set(-200, 600, -10) //(x,y,z)
light3.intensity=1
scene.add(light3)
const light4 = new THREE.PointLight(0xffffff, 1, 1000)
light4.position.set(0,0,0) //(x,y,z)
light4.intensity=1
scene.add(light4)

var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

// Create some objects and add them to the scene and the objects list
// for (var i = 0; i < 1; i++) {
  const boxTexture = new THREE.TextureLoader().load('https://t3.ftcdn.net/jpg/05/03/22/88/360_F_503228811_52rvm1eaIpXxVQ9TaTNV1USeU4rZDR6y.jpg');
  var geometry = new THREE.BoxGeometry( 40, 40, 40 );
  var material = new THREE.MeshStandardMaterial( { map:boxTexture } );
  var object = new THREE.Mesh( geometry, material );
  var rand = Math.floor(Math.random()*100);
  // console.log(rand)
  object.position.x = 0;
  object.position.y = 20;
  object.position.z = 0;
  scene.add( object );
  objects.push( object );
// }

// Add a click event listener to the renderer's canvas element
renderer.domElement.addEventListener('click', onClick, false);

// Function to handle clicks
function onClick(event) {
  // Get the mouse position relative to the canvas
  var rect = event.target.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  // Convert the mouse position to a 3D coordinate using the inverse of the projection matrix
  var vector = new THREE.Vector3( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1, 0.5 );
  vector.unproject( camera );

  // Get the direction of the click
  var direction = vector.sub( camera.position ).normalize();

  // Create a ray from the camera position in the direction of the click
  var ray = new THREE.Raycaster( camera.position, direction );
  // Check if the ray intersects with any of the objects in the scene
  var intersects = ray.intersectObjects( objects );
  if (intersects.length > 0) {
    if (!selected) {
      selected = true;
      selectedObject = intersects[0].object;
      message.innerHTML = "Object Selected.";
      message.style.opacity = 0.77;
      document.addEventListener("keydown", onDocumentKeyDown, false);
      }
      else {
        selected = false;
        selectedObject = camera;
        message.innerHTML = "";
        message.style.opacity=0;
        document.removeEventListener("keydown", onDocumentKeyDown);
        }
        
    document.addEventListener("keydown", onDocumentKeyDown, false);

  }
}

//photoFrame
const photo = new THREE.TextureLoader().load('https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/StandardImage/p3-hd.jpg');
const materialsPhoto = new THREE.MeshStandardMaterial({map: photo, side: THREE.DoubleSide});
const geometrysPhoto = new THREE.PlaneGeometry(50, 50, 10, 10);

const geometry1 = new THREE.SphereGeometry(5, 64, 64)
const texture1 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1557411732-1797a9171fcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGF0dGVybiUyMHRleHR1cmV8ZW58MHx8MHx8&w=1000&q=80');
const material1 = new THREE.MeshStandardMaterial({
  map:texture1,
  color:'#ffffff',
  transparent:true
})
const sphere = new THREE.Mesh(geometry1,material1)
scene.add(sphere)

//groundPlane
const textureGround = new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c382ff-ba87-45f5-bc5f-272d0b65f1fa/d6z6iz9-8f44a3f1-fcf9-4cf2-b126-f085cf7137f8.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzM4MmZmLWJhODctNDVmNS1iYzVmLTI3MmQwYjY1ZjFmYVwvZDZ6Nml6OS04ZjQ0YTNmMS1mY2Y5LTRjZjItYjEyNi1mMDg1Y2Y3MTM3ZjguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vUjTWyc1WO-AVxqae-jJE6hhHtYciE9eVYFK4YZ8QV4');
const materialGround = new THREE.MeshStandardMaterial({ map: textureGround, side: THREE.DoubleSide});
const geometryGround = new THREE.PlaneGeometry(1000, 1000, 10 , 10);
const groundPlane = new THREE.Mesh(geometryGround, materialGround);
groundPlane.rotation.x=Math.PI/2;
groundPlane.receiveShadow = true;
scene.add(groundPlane)

//sideplanes
const s1 = new THREE.TextureLoader().load('https://png.pngtree.com/background/20220720/original/pngtree-cement-wall-texture-background-old-texture-wall-concrete-wall-use-placement-picture-image_1677898.jpg');
const materials1 = new THREE.MeshStandardMaterial({map: s1, side: THREE.DoubleSide});
const geometrys1 = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const s1Plane = new THREE.Mesh(geometrys1, materials1);
s1Plane.rotation.z=Math.PI/2;
s1Plane.position.z=-500;
s1Plane.position.y=500;
scene.add(s1Plane)

const s2Plane = new THREE.Mesh(geometrys1, materials1);
s2Plane.rotation.z=Math.PI/2;
s2Plane.position.z=500;
s2Plane.position.y=500;
scene.add(s2Plane)

const s3Plane = new THREE.Mesh(geometrys1, materials1);
s3Plane.rotation.y=Math.PI/2;
s3Plane.position.x=-500;
s3Plane.position.y=500;
scene.add(s3Plane)

const s4Plane = new THREE.Mesh(geometrys1, materials1);
s4Plane.rotation.y=Math.PI/2;
s4Plane.position.x=500;
s4Plane.position.y=500;
scene.add(s4Plane)

//add cube button 
var addCubeButton = document.createElement( 'button' );
addCubeButton.innerHTML = 'Add Cube';
addCubeButton.style.position = 'absolute';
addCubeButton.style.top = '2%';
addCubeButton.style.left = '5%';
document.body.appendChild( addCubeButton );

addCubeButton.addEventListener( 'click', function () {
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = 0;
    cube.position.y = 20;
    scene.add( cube );
    objects.push( cube );
} );

//add sphere button 
var addSphereButton = document.createElement( 'button' );
addSphereButton.innerHTML = 'Add Sphere';
addSphereButton.style.position = 'absolute';
addSphereButton.style.top = '6%';
addSphereButton.style.left = '5%';
document.body.appendChild( addSphereButton );

addSphereButton.addEventListener( 'click', function () {
    var sphere = new THREE.Mesh( geometry1, material );
    sphere.position.x = 0;
    sphere.position.y = 5;
    scene.add( sphere );
    objects.push( sphere );
} );

//add frame button 
var addFrameButton = document.createElement( 'button' );
addFrameButton.innerHTML = 'Add Frame';
addFrameButton.style.position = 'absolute';
addFrameButton.style.top = '6%';
addFrameButton.style.left = '18%';
document.body.appendChild( addFrameButton );

addFrameButton.addEventListener( 'click', function () {
    const frame = new THREE.Mesh( geometrysPhoto, materialsPhoto );
    frame.position.z = -498;
    frame.position.y = 100;
    console.log('frame')
    scene.add( frame );
    objects.push( frame );
} );


//new Canvas
var scene2 = new THREE.Scene();
var camera2 = new THREE.PerspectiveCamera( 45, (sizes.width)/(sizes.height));
camera2.position.z = -100;

const canvas2 = document.querySelector(".webgl")
const renderer2 = new THREE.WebGLRenderer({
  canvas2: canvas2,
  alpha: true
})

const controls2 = new OrbitControls(camera2, canvas2)
controls2.enableDamping = true
controls2.autoRotate = true
controls2.autoRotateSpeed = 5

renderer2.setSize( window.innerWidth*0.2, window.innerHeight*0.2 );
renderer2.domElement.style.zIndex = 5;
renderer2.domElement.style.position = 'absolute';
renderer2.domElement.style.top = '12%';
renderer2.domElement.style.left = '5%';
document.body.appendChild( renderer2.domElement );

var cube2 = new THREE.Mesh( geometry, material );
cube2.position.x = 0;
cube2.position.y = 0;
cube2.position.z = 0;
scene2.add( cube2 );

var ambientLight = new THREE.AmbientLight( 0xffffff, 0.9 );
scene2.add( ambientLight );

//resize
window.addEventListener('resize', () =>{
  //update size
  sizes.width = window.innerWidth*0.2
  sizes.height = window.innerHeight*0.2

  //update camera
  camera2.aspect = (sizes.width)/(sizes.height)
  camera2.updateProjectionMatrix()
  renderer2.setSize(sizes.width, sizes.height)
}) 

// Render the scene
function animate() {
  // controls.update()
  // controls2.update()
  // control.update()
  camera.position.y=70;
  requestAnimationFrame( animate );
  renderer2.render(scene2, camera2);
  renderer.render( scene, camera );
}
animate();

