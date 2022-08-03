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

const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 1,
  scene: 'Scene with Glow'
};


const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );
camera.position.set( 0, 0, 20 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 1;
controls.maxDistance = 100;

scene.add( new THREE.AmbientLight( 0xffffbb ) );

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const bloomComposer = new EffectComposer( renderer );
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

const finalComposer = new EffectComposer( renderer );
finalComposer.addPass( renderScene );

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

// window.addEventListener( 'pointerdown', onPointerDown );


// // setupScene();

// function onPointerDown( event: PointerEvent ) {

//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//   raycaster.setFromCamera( mouse, camera );
//   const intersects = raycaster.intersectObjects( scene.children, false );
//   if ( intersects.length > 0 ) {

//     const object = intersects[ 0 ].object;
//     object.layers.toggle( BLOOM_SCENE );
//     render();

//   }

// }

// window.onresize = function () {

//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();

//   renderer.setSize( width, height );

//   bloomComposer.setSize( width, height );
//   finalComposer.setSize( width, height );

//   bloomComposer.render();

// };


const geometry = new THREE.IcosahedronGeometry( 1, 15 );
const material = new THREE.MeshBasicMaterial( { color: "#238E47" } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
camera.lookAt( sphere.position);


  function animate() {
    bloomComposer.render();
    requestAnimationFrame(animate)
  }
  animate()

}

      export function Bloom() {
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