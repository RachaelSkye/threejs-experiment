import React from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function init(canvas: HTMLCanvasElement) {

  const params = {
    clipIntersection: true,
    planeConstant: 0,
    showHelpers: false
  };
  
  const clipPlanes = [
    new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
    new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0 ),
    new THREE.Plane( new THREE.Vector3( 0, 0, - 1 ), 0 )
  ];
  const renderer = new THREE.WebGLRenderer( { canvas } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.localClippingEnabled = true;
              
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );

  camera.position.set( - 1.5, 2.5, 3.0 );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.enablePan = false;

  const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1.5 );
  light.position.set( - 1.25, 1, 1.25 );
  scene.add( light );


  const group = new THREE.Group();

  for ( let i = 1; i <= 30; i += 2 ) {

    const geometry = new THREE.SphereGeometry( i / 30, 48, 24 );

    const material = new THREE.MeshLambertMaterial( {

      color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5 ),
      side: THREE.DoubleSide,
      clippingPlanes: clipPlanes,
      clipIntersection: params.clipIntersection

    } );

    group.add( new THREE.Mesh( geometry, material ) );

  }

  scene.add( group );

  // helpers
  const helpers = new THREE.Group();
  helpers.add( new THREE.PlaneHelper( clipPlanes[ 0 ], 2, 0xff0000 ) );
  helpers.add( new THREE.PlaneHelper( clipPlanes[ 1 ], 2, 0x00ff00 ) );
  helpers.add( new THREE.PlaneHelper( clipPlanes[ 2 ], 2, 0x0000ff ) );
  helpers.visible = params.showHelpers;
  scene.add( helpers );

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
  })
  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.render(scene, camera);

  }
  window.addEventListener( 'resize', onWindowResize );
}

export function Globe() {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    if(canvas) init(canvas)
  },[canvas])

return (
<canvas ref={element => setCanvas(element)} />
)
}

