import React from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';


			async function init(canvas: HTMLCanvasElement) {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
        camera.position.y = 200;
        camera.position.z = 400;
        camera.lookAt(new THREE.Vector3(0,0,0));
        camera.aspect = canvas.clientWidth / canvas.clientHeight;

				const scene = new THREE.Scene();

        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.5 );
        scene.add( light );

        const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height, false);


        // const sphereGeometry = new THREE.SphereGeometry( 10000 );
        // const sphereMaterial = new THREE.MeshBasicMaterial( { color:  "#ECF1F8"} );
        // const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        // scene.add( sphere );

        const boxGeometry = new THREE.BoxGeometry( 2000, 2000, 2000 );
        const boxMaterial = new THREE.MeshBasicMaterial( { color: "#ECF1F8" } );
        const cube = new THREE.Mesh( boxGeometry, boxMaterial );
        cube.receiveShadow = true;
        cube.castShadow = true;
        scene.add( cube );

        const loader = new GLTFLoader();
        let mixer: THREE.AnimationMixer
        loader.load( 'cartoon-cats/glTF_pink_kawaii/CuteCat_glTF.gltf', gltf => {
          mixer = new THREE.AnimationMixer( gltf.scene );

          //19 animations
          gltf.animations.forEach(clip => {
            console.log(clip.name)
            clip.name === "ALLanim" && mixer.clipAction(clip).play()
          })
          gltf.scene.castShadow = true
          scene.add(gltf.scene);
          render()
        });


        const planeGeometry = new THREE.PlaneGeometry( 2000, 2000, 32, 32 );
        const planeMaterial = new THREE.MeshToonMaterial( { color: "#238E47"} )
        const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.receiveShadow = true;
        plane.lookAt(new THREE.Vector3(0,Math.PI/2,0))
        scene.add( plane );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        // controls.maxZoom = 100
        // controls.maxDistance = 500
        controls.maxPolarAngle = Math.PI/3;

        // const gridXZ = new THREE.GridHelper(100, 10, 0xff0000, 0xffffff);
        // scene.add(gridXZ);

        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
          controls.update();
          if(mixer) mixer.update(0.04)
      
        })

        function render() {
          renderer.render( scene, camera );
        }
			}


      export function Kitty() {
        const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)
      
        React.useEffect(() => {
         async function _init() {
           if(canvas) {
              await init(canvas)
            }
         }
         _init()
        },[canvas])
      
      return (
      <canvas ref={element => setCanvas(element)} />
      )
      }