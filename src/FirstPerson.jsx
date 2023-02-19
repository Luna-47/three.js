import * as THREE from "three"
import './index.css'
import { PointerLockControls } from "three/examples/jsm/controls/pointerlockcontrols"

const scene = new THREE.Scene();

//sizes
const sizes={
    width: window.innerWidth*0.6,
    height: window.innerHeight*0.7,
  }

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 100);
scene.add(camera)

// Create a renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

//message
var message = document.createElement( 'div' );
message.style.position = 'absolute';
message.style.bottom = '73%';
message.style.right = '5%';
message.style.backgroundColor = '#282c34';
message.style.color = '#ffffff';
message.style.padding = '30px';
message.style.height ='25%';
message.style.width ='25%';
message.style.boxShadow = '2px 2px 4px grey';
message.style.opacity = '0%';
message.style.zIndex='5';
message.style.borderRadius='5px';
document.body.appendChild( message );

var selected = false;
var selectedObject = null;
var objects = [];

const boxTexture = new THREE.TextureLoader().load('https://t3.ftcdn.net/jpg/05/03/22/88/360_F_503228811_52rvm1eaIpXxVQ9TaTNV1USeU4rZDR6y.jpg');
var geometry = new THREE.BoxGeometry( 20, 20, 20 );
var material = new THREE.MeshStandardMaterial( { map:boxTexture } );
var object = new THREE.Mesh( geometry, material );
object.position.x = 0;
object.position.y = 10;
object.position.z = 0;
scene.add( object );
objects.push( object );

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


//groundPlane
function ground(){
    const textureGround = new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c382ff-ba87-45f5-bc5f-272d0b65f1fa/d6z6iz9-8f44a3f1-fcf9-4cf2-b126-f085cf7137f8.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzM4MmZmLWJhODctNDVmNS1iYzVmLTI3MmQwYjY1ZjFmYVwvZDZ6Nml6OS04ZjQ0YTNmMS1mY2Y5LTRjZjItYjEyNi1mMDg1Y2Y3MTM3ZjguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vUjTWyc1WO-AVxqae-jJE6hhHtYciE9eVYFK4YZ8QV4');
    const materialGround = new THREE.MeshStandardMaterial({ map: textureGround, side: THREE.DoubleSide});
    const geometryGround = new THREE.PlaneGeometry(1000, 1000, 10 , 10);
    const groundPlane = new THREE.Mesh(geometryGround, materialGround);
    groundPlane.rotation.x=Math.PI/2;
    groundPlane.receiveShadow = true;
    scene.add(groundPlane)

    const textureSky = new THREE.TextureLoader().load('https://cdn.shopify.com/s/files/1/0695/0954/6295/products/ArcticShimmer_103_460x@2x.jpg?v=1673571721');
    const materialSky = new THREE.MeshStandardMaterial({ map: textureSky, side: THREE.DoubleSide});
    const geometrySky = new THREE.PlaneGeometry(1000, 1000, 10 , 10);
    const skyPlane = new THREE.Mesh(geometrySky, materialSky);
    skyPlane.rotation.x=Math.PI/2;
    skyPlane.position.y=500;
    skyPlane.receiveShadow = true;
    scene.add(skyPlane)

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
}

//FPS from here
const controls = new PointerLockControls(camera, canvas);

//object
function objectMovement(){
    renderer.domElement.addEventListener('click', onClick, false);

    function onClick(event){
        var rect = event.target.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var vector = new THREE.Vector3( ( x / window.innerWidth ) * 2 - 1, - ( y / window.innerHeight ) * 2 + 1, 0.5 );
        vector.unproject( camera );
      
        var direction = vector.sub( camera.position ).normalize();

        var ray = new THREE.Raycaster( camera.position, direction );
        var intersects = ray.intersectObjects(objects);
        if (intersects.length>0){
            if (!selected){
                selected = true;
                selectedObject=intersects[0].object;
                message.innerHTML="Object Selected";
                message.style.opacity = 0.77;
                document.addEventListener("keydown", onDocumentKeyDown, false);
            }
            else {
                selected = false;
                message.innerHTML = "";
                message.style.opacity=0;
                document.removeEventListener("keydown", onDocumentKeyDown);
            }

            document.addEventListener("keydown", onDocumentKeyDown, false);
            function onDocumentKeyDown(event){
                var keyCode = event.which;
                if (keyCode == 37) {
                    selectedObject.position.x -= 0.1;
                    message.innerHTML= 'left'
                  } else if (keyCode == 39) {
                    selectedObject.position.x += 0.1;
                    message.innerHTML= 'right'
                  } else if (keyCode == 38) {
                    selectedObject.position.y += 0.1;
                    message.innerHTML= 'up'
                  } else if (keyCode == 40) {
                    selectedObject.position.y -= 0.1;
                    message.innerHTML= 'down'
                  } else if (keyCode == 13) {
                    selectedObject.position.z -= 0.1;
                    message.innerHTML= 'backward'
                  } else if (keyCode == 16) {
                    selectedObject.position.z += 0.1;
                    message.innerHTML= 'forward'
                  } else if (keyCode == 107) {
                    selectedObject.scale.x +=0.005
                    selectedObject.scale.y +=0.005
                    selectedObject.scale.z +=0.005
                  }else if (keyCode == 109) {
                    selectedObject.scale.x -=0.005
                    selectedObject.scale.y -=0.005
                    selectedObject.scale.z -=0.005
                  }else if (keyCode == 88){
                    selectedObject.rotation.x +=0.005
                  }else if (keyCode == 89){
                    selectedObject.rotation.y +=0.005
                  }else if (keyCode == 90){
                    selectedObject.rotation.z +=0.005
                  }else if (keyCode == 46){
                    scene.remove(selectedObject)
                  }
            }
        }
    }
}

controls.unlock();
document.addEventListener('click', () => {
  if(controls.isLocked){
    controls.unlock()
    objectMovement();

  }
  else{
    controls.lock()
    objectMovement();
  }
});

document.addEventListener('mousemove', (event) => {
    if (controls.isLocked) {
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;
      controls.rotateLeft(-movementX * 0.05);
      controls.rotateUp(-movementY * 0.05);
    }
  });

const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
};

document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW':
        keys.forward = true;
        break;
      case 'KeyA':
        keys.left = true;
        break;
      case 'KeyS':
        keys.backward = true;
        break;
      case 'KeyD':
        keys.right = true;
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW':
        keys.forward = false;
        break;
      case 'KeyA':
        keys.left = false;
        break;
      case 'KeyS':
        keys.backward = false;
        break;
      case 'KeyD':
        keys.right = false;
        break;
    }
  });

  function keyMovement(){
    if (keys.forward) {
        controls.moveForward(0.5);
      }
      if (keys.backward) {
        controls.moveForward(-0.5);
      }
      if (keys.left) {
        controls.moveRight(-0.5);
      }
      if (keys.right) {
        controls.moveRight(0.5);
      }
  };

function animate(){
    requestAnimationFrame(animate);
    keyMovement();
    renderer.render(scene, camera);
}

ground();
animate();