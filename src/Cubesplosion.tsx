import React from "react";
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


function init(canvas: HTMLCanvasElement) {
const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );
camera.position.set( 0, 0, 50 );
        // LIGHTING
        const lightH = new THREE.HemisphereLight( 0xffffff, 0x080820, 0.9 );
        scene.add(lightH)

				const light = new THREE.DirectionalLight( 0xffffff, 0.5 );

				light.castShadow = true;

				light.shadow.mapSize.width = 100;
				light.shadow.mapSize.height = 100;

				light.shadow.camera.near = 100;
				light.shadow.camera.far = 100;

				light.shadow.camera.left = -100;
				light.shadow.camera.right = 100;
				light.shadow.camera.top = 100;
				light.shadow.camera.bottom = -100;
        scene.add( light );

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 100;

scene.add( new THREE.AmbientLight( 0xffffbb ) );

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 2, 0.1, 0 );

const bloomComposer = new EffectComposer( renderer );
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

const finalComposer = new EffectComposer( renderer );
finalComposer.addPass( renderScene );



const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener( 'pointerdown', onPointerDown );

function onPointerDown( event: PointerEvent ) {

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( scene.children, false );
  if ( intersects.length > 0 ) {
    const object = intersects[ 0 ].object;
    object.layers.toggle(0);
    bloomComposer.render();

  }

}

window.onresize = function () {

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize( width, height );

  bloomComposer.setSize( width, height );
  finalComposer.setSize( width, height );

  bloomComposer.render();

};

let zTranslation = 0;
let yTranslation = 0;

const geometry = new THREE.IcosahedronGeometry( 1, 15 )
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.rotation.set(Math.random() * 500 - 5, Math.random() * 500 - 5, Math.random() * 500 - 5)
  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateZ(2);

  sphere.layers.enable(1);
  scene.add( sphere );
}

for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateZ(4);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateZ(6);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateZ(8);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateZ(10);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateZ(12);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateY(2);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateY(4);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateY(6);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateY(8);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateY(10);

  sphere.layers.enable(1);
  scene.add( sphere );
}
for ( let i = 1; i < 5; i ++ ) {

  const color = new THREE.Color();
  color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
  
  const material = new THREE.MeshPhongMaterial( { color } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.translateX(i/0.45);
  sphere.translateY(12);



  sphere.layers.enable(1);
  scene.add( sphere );
}

  function animate() {
    bloomComposer.render();
    requestAnimationFrame(animate)
  }
  animate()

}

      export function Cubesplosion() {
        const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);

        const _init = async () => {
          if(canvas){
            await init(canvas);
          }
        }
        
        React.useEffect(() => {
          if(canvas) _init();
        },[canvas]);
      
      return (
      <canvas ref={element => setCanvas(element)} />
      )
      }