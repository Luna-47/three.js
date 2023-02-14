//WORKS WELL

import * as THREE from "three"
import './index.css'
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
message.style.bottom = '30%';
message.style.right = '0px';
message.style.backgroundColor = '#282c34';
message.style.color = '#ffffff';
message.style.padding = '30px';
message.style.height ='70%';
message.style.width ='40%';
document.body.appendChild( message );

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)//camera width, aspect ratio
camera.position.z=500
camera.position.y=50
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

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


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
light.position.set(50, 400, 50) //(x,y,z)
light.intensity=4
scene.add(light)
const light2 = new THREE.PointLight(0xffffff, 1, 1000)
light2.position.set(0, 400, 200) //(x,y,z)
light2.intensity=2
scene.add(light2)

// Create some objects and add them to the scene and the objects list
for (var i = 0; i < 2; i++) {
  var geometry = new THREE.BoxGeometry( 40, 40, 40 );
  var material = new THREE.MeshStandardMaterial( { color: Math.random() * 0xffffff } );
  var object = new THREE.Mesh( geometry, material );
  var rand = Math.floor(Math.random()*100);
  console.log(rand)
  object.position.x = rand;
  object.position.y = 20;
  object.position.z = rand;
  scene.add( object );
  objects.push( object );
}

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
      message.innerHTML = 'Intersected object: ' + typeof(intersects[0].object)+typeof(object);
      selected = true;
      selectedObject = intersects[0].object;
      message.innerHTML = 'Object selected.';
      document.addEventListener("keydown", onDocumentKeyDown, false);
      }
      else {
        selected = false;
        selectedObject = null;
        message.innerHTML = 'Object not selected. Click on object to select.';
        document.removeEventListener("keydown", onDocumentKeyDown);
        }
        
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event){
      var keyCode = event.which;
      if (keyCode == 37) {
        selectedObject.position.x -= 1;
        message.innerHTML= 'left'
      } else if (keyCode == 39) {
        selectedObject.position.x += 1;
        message.innerHTML= 'right'
      } else if (keyCode == 38) {
        selectedObject.position.z -= 1;
        message.innerHTML= 'backward'
      } else if (keyCode == 40) {
        selectedObject.position.z += 1;
        message.innerHTML= 'forward'
      } else if (keyCode == 107) {
        selectedObject.scale.x +=0.01
        selectedObject.scale.y +=0.01
        selectedObject.position.y +=0.2
        selectedObject.scale.z +=0.01
      }else if (keyCode == 109) {
        selectedObject.scale.x -=0.01
        selectedObject.scale.y -=0.01
        selectedObject.position.y -=0.2
        selectedObject.scale.z -=0.01
      }else if (keyCode == 88){
        selectedObject.rotation.x +=0.01
      }else if (keyCode == 89){
        selectedObject.rotation.y +=0.01
      }else if (keyCode == 90){
        selectedObject.rotation.z +=0.01
      }else if (keyCode == 65){
        selectedObject.rotation.x -=0.01
      }else if (keyCode == 66){
        selectedObject.rotation.y -=0.01
      }else if (keyCode == 67){
        selectedObject.rotation.z -=0.01
      }
    }
  }
}

const geometry1 = new THREE.SphereGeometry(5, 64, 64)
const texture1 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1557411732-1797a9171fcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGF0dGVybiUyMHRleHR1cmV8ZW58MHx8MHx8&w=1000&q=80');
const material1 = new THREE.MeshStandardMaterial({
  color:"#ff0000",
  map:texture1
})
const sphere = new THREE.Mesh(geometry1,material1)
scene.add(sphere)

//groundPlane
const textureGround = new THREE.TextureLoader().load('https://media.istockphoto.com/id/94745969/photo/fine-brown-sand-dirt-background.jpg?b=1&s=170667a&w=0&k=20&c=f5hMGMZXaX8u5dFQTN0EfY7jIvvedAKQ5CN110tLRo4=');
const materialGround = new THREE.MeshStandardMaterial({ map: textureGround, side: THREE.DoubleSide});
const geometryGround = new THREE.PlaneGeometry(1000, 1000, 10 , 10);
const groundPlane = new THREE.Mesh(geometryGround, materialGround);
groundPlane.rotation.x=Math.PI/2;
groundPlane.receiveShadow = true;
scene.add(groundPlane)

//sideplanes
const s1 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1601370690183-1c7796ecec61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80');
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

// Render the scene
function animate() {
  controls.update()
  camera.position.y=50;
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();

