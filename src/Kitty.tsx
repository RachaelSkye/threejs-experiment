import React from "react";
import * as THREE from 'three';
import { BackSide } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';




			async function init(canvas: HTMLCanvasElement) {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
        camera.position.y = 200;
        camera.position.z = 400;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // camera.getWorldDirection(model.scene.position)

				const scene = new THREE.Scene();

        const lightH = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add(lightH)
        // scene.add( new THREE.AmbientLight( 0x222222 ) );

				const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
				light.position.set( 200, 450, 500 );

				light.castShadow = true;

				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 512;

				light.shadow.camera.near = 100;
				light.shadow.camera.far = 1200;

				light.shadow.camera.left = - 1000;
				light.shadow.camera.right = 1000;
				light.shadow.camera.top = 350;
				light.shadow.camera.bottom = - 350;
        scene.add( light );

        const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height, false);


        




        // const sphereGeometry = new THREE.SphereGeometry( 10000 );
        // const sphereMaterial = new THREE.MeshBasicMaterial( { color:  "#ECF1F8"} );
        // const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        // scene.add( sphere );

        const boxGeometry = new THREE.BoxGeometry( 2000, 2000, 2000 );
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("sky.jpg")
        const boxMaterial = new THREE.MeshBasicMaterial( { color: "#ECF1F8", side: BackSide, map: texture } );
        const cube = new THREE.Mesh( boxGeometry, boxMaterial );
        
        cube.receiveShadow = true;
        cube.castShadow = true;
        scene.add( cube );

        const loader = new GLTFLoader();
        const model = await loader.loadAsync('cartoon-cats/glTF_pink_kawaii/CuteCat_glTF.gltf');
        const mixer = new THREE.AnimationMixer( model.scene );
        const run = model.animations.find(clip => clip.name === "run");
        const jump = model.animations.find(clip => clip.name === "jump");
        // const position = model.scene.getWorldPosition(model.scene.position);
        let running = false;

        document.addEventListener("keydown", (ev) => {
          running = true;
          if(ev.code === "KeyW"){
            if(run) mixer.clipAction(run).play();
            model.scene.translateZ(5);
          }

          if(ev.code === "KeyS"){
            if(run) mixer.clipAction(run).play();
            model.scene.translateZ(-5);
          }

          if(ev.code === "KeyA"){
            if(run) mixer.clipAction(run).play();
            model.scene.translateX(-5);
          }

          if(ev.code === "KeyD"){
            running = false;
            if(run) mixer.clipAction(run).play();
            model.scene.translateX(5);
          }

          // TODO: jumping needs a lot of work
          // if(ev.code === "Space"){
          //   if(jump) mixer.clipAction(jump).play();
          //   model.scene.translateY(10);
          //   if(mixer) mixer.update(0.03);
          // }

        });

        model.scene.addEventListener("", (ev) => {
          console.log(ev)
        })

        document.addEventListener("keyup", (ev) => {
          if(run) mixer.clipAction(run).stop();
        });

        model.scene.castShadow = true;
        camera.lookAt(model.scene.position);

        scene.add(model.scene);
        render()
        

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
        controls.maxPolarAngle = Math.PI/3 * 1.5;

        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
          controls.update();
          if(mixer) {
            if(running) {
              mixer.update(0.07);
            }
          }
        })

        function render() {
          renderer.render( scene, camera );
        }

			}




      export function Kitty() {
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