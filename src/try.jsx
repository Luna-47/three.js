import * as THREE from "three"
import './index.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//scene
const scene = new THREE.Scene()

// Create a texture loader
var textureLoader = new THREE.TextureLoader();
document.body.appendChild( renderer.domElement );

//create sphere
const geometry = new THREE.SphereGeometry(20, 64, 64)
const texture2 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1557411732-1797a9171fcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGF0dGVybiUyMHRleHR1cmV8ZW58MHx8MHx8&w=1000&q=80');
const material = new THREE.MeshStandardMaterial({
  color:"#ffffff",
  map:texture2
})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x =-20
mesh.position.y = 20
scene.add(mesh)

const geometry2 = new THREE.BoxGeometry(40,40,40);
const texture = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPZgtAVY5t4F_X-1m8hSlrSv0oo5BznEYM5zuFRjO2MnSkFvwSLQcETqnYY8WibzVNf-M&usqp=CAU');
const material2 = new THREE.MeshStandardMaterial({
  // color: "#c6f536",
  map:texture
})
const cube = new THREE.Mesh(geometry2, material2);
cube.position.x=100
cube.position.y=20
scene.add(cube)

var message = document.createElement( 'div' );
message.style.position = 'absolute';
message.style.top = '30%';
message.style.right = '0px';
message.style.backgroundColor = '#282c34';
message.style.color = '#ffffff';
message.style.padding = '30px';
message.style.height ='70%';
message.style.width ='40%';
document.body.appendChild( message );

//Onclick
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseClick( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );
  if ( intersects.length > 0 ) {
      message.innerHTML = 'Intersected object: ' + intersects[0].object.uuid;
  }
}
window.addEventListener( 'click', onMouseClick, false );

//sizes
const sizes={
  width: window.innerWidth*0.6,
  height: window.innerHeight*0.7,
}

//light
const light = new THREE.PointLight(0xffffff, 1, 1000)
light.position.set(0, 60, 50) //(x,y,z)
light.intensity=4
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)//camera width, aspect ratio
camera.position.z=450
camera.position.y=30
scene.add(camera)

//keyboard
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 37) {
    camera.position.x -= 5;
  } else if (keyCode == 39) {
    camera.position.x += 5;
  } else if (keyCode == 38) {
    camera.position.z -= 5;
  } else if (keyCode == 40) {
    camera.position.z += 5;
  }
}

//groundPlane
const textureGround = new THREE.TextureLoader().load('https://media.istockphoto.com/id/94745969/photo/fine-brown-sand-dirt-background.jpg?b=1&s=170667a&w=0&k=20&c=f5hMGMZXaX8u5dFQTN0EfY7jIvvedAKQ5CN110tLRo4=');
const materialGround = new THREE.MeshBasicMaterial({ map: textureGround, side: THREE.DoubleSide});
const geometryGround = new THREE.PlaneGeometry(1000, 1000, 10 , 10);
const groundPlane = new THREE.Mesh(geometryGround, materialGround);
groundPlane.rotation.x=Math.PI/2;
groundPlane.receiveShadow = true;
scene.add(groundPlane)

//sideplanes
const s1 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1601370690183-1c7796ecec61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80');
const materials1 = new THREE.MeshBasicMaterial({map: s1, side: THREE.DoubleSide});
const geometrys1 = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const s1Plane = new THREE.Mesh(geometrys1, materials1);
s1Plane.rotation.z=Math.PI/2;
s1Plane.position.z=-500;
s1Plane.position.y=500;
scene.add(s1Plane)

const s2 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1601370690183-1c7796ecec61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80');
const materials2 = new THREE.MeshBasicMaterial({map: s2, side: THREE.DoubleSide});
const geometrys2 = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const s2Plane = new THREE.Mesh(geometrys2, materials2);
s2Plane.rotation.z=Math.PI/2;
s2Plane.position.z=500;
s2Plane.position.y=500;
scene.add(s2Plane)

const s3 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1601370690183-1c7796ecec61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80');
const materials3 = new THREE.MeshBasicMaterial({map: s3, side: THREE.DoubleSide});
const geometrys3 = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const s3Plane = new THREE.Mesh(geometrys3, materials3);
s3Plane.rotation.y=Math.PI/2;
s3Plane.position.x=-500;
s3Plane.position.y=500;
scene.add(s3Plane)

const s4 = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1601370690183-1c7796ecec61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80');
const materials4 = new THREE.MeshBasicMaterial({map: s4, side: THREE.DoubleSide});
const geometrys4 = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const s4Plane = new THREE.Mesh(geometrys4, materials4);
s4Plane.rotation.y=Math.PI/2;
s4Plane.position.x=500;
s4Plane.position.y=500;
scene.add(s4Plane)

//renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true
// controls.autoRotateSpeed = 5
// controls.enablePan = false
// controls.enableZoom = false

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

const loop =()=> {
  controls.update()
  camera.position.y=50;
  renderer.render (scene, camera)
  window.requestAnimationFrame(loop)
}

loop()