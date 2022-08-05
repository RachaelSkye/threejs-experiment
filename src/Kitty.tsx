import React from "react";
import * as THREE from 'three';
import { BackSide, RGBAFormat } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


			async function init(canvas: HTMLCanvasElement) {

        // Initial CAMERA positioning
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width/height, 1, 20000);
        camera.position.y = 200;
        camera.position.z = -400;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.layers.enable(1)
        // camera.getWorldDirection(model.scene.position)

        

				const scene = new THREE.Scene();

        // LIGHTING
        const lightH = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.9 );
        scene.add(lightH)

				const light = new THREE.DirectionalLight( 0xffffbb, 0.5 );

				light.castShadow = true;

				light.shadow.mapSize.width = 10000;
				light.shadow.mapSize.height = 10000;

				light.shadow.camera.near = 1000;
				light.shadow.camera.far = 10000;

				light.shadow.camera.left = -10000;
				light.shadow.camera.right = 10000;
				light.shadow.camera.top = 10000;
				light.shadow.camera.bottom = -10000;
        scene.add( light );


        // RENDERER
        const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height, false);

        // CAMERA CONTROLS
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.maxPolarAngle = Math.PI/3 * 1.42;
        controls.maxDistance = 1000
        controls.minDistance = 200
        // controls.addEventListener( 'change', render );
        

        // GEOMETRIES
        // for (let index = 0; index < 2000; index++) {
        //   const radius = Math.ceil(Math.random()) * index
        //   const glowOrbGeometry = new THREE.SphereGeometry( radius );
        //   const glowOrbMaterial = new THREE.MeshBasicMaterial( { color: "rgba(255, 255, 255)"} );
        //   const glowOrb = new THREE.Mesh( glowOrbGeometry, glowOrbMaterial );
        //   glowOrb.position.set(radius * radius, radius , radius);
        //   glowOrb.layers.set(1)
        //   scene.add( glowOrb );
        //   light.position.set(glowOrb.position.x, glowOrb.position.y, glowOrb.position.z);
        // }

        // const geometry = new THREE.IcosahedronGeometry( 1, 15 )

        const geometry = new THREE.SphereGeometry( 1 )
        const color = new THREE.Color();
        color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );

        for ( let i = 0; i < 250; i ++ ) {
          const color = new THREE.Color();
          color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
        
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x = Math.random() * 1500 - 50;
					sphere.position.y = Math.random() * 1500 - 50;
					sphere.position.z = Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}

        for ( let i = 0; i < 250; i ++ ) {
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x = - Math.random() * 1500 - 50;
					sphere.position.y = - Math.random() * 1500 - 50;
					sphere.position.z = - Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}
        for ( let i = 0; i < 250; i ++ ) {
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x = - Math.random() * 1500 - 50;
					sphere.position.y =  Math.random() * 1500 - 50;
					sphere.position.z =  Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}
        for ( let i = 0; i < 250; i ++ ) {
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x =  Math.random() * 1500 - 50;
					sphere.position.y = - Math.random() * 1500 - 50;
					sphere.position.z =  Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}
        for ( let i = 0; i < 250; i ++ ) {
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x =  Math.random() * 1500 - 50;
					sphere.position.y =  Math.random() * 1500 - 50;
					sphere.position.z = - Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}
        for ( let i = 0; i < 250; i ++ ) {
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x =  Math.random() * 1500 - 50;
					sphere.position.y = - Math.random() * 1500 - 50;
					sphere.position.z = - Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}
        for ( let i = 0; i < 250; i ++ ) {
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x = - Math.random() * 1500 - 50;
					sphere.position.y =  Math.random() * 1500 - 50;
					sphere.position.z = - Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}
        for ( let i = 0; i < 250; i ++ ) {
					const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
					const sphere = new THREE.Mesh( geometry, material );
					sphere.position.x = - Math.random() * 1500 - 50;
					sphere.position.y = - Math.random() * 1500 - 50;
					sphere.position.z =  Math.random() * 1500 - 50;
					sphere.layers.enable(1);
					scene.add( sphere );
				}

        // const outerSphereGeometry = new THREE.SphereGeometry( 5000, 50, 50 );
        // const sphereTextureLoader = new THREE.TextureLoader();
        // const sphereTexture = sphereTextureLoader.load("sky.jpg")
        // const outerSphereMaterial = new THREE.MeshBasicMaterial( { side: BackSide, map: sphereTexture} );
        // const outerSphere = new THREE.Mesh( outerSphereGeometry, outerSphereMaterial );
        // outerSphere.position.set(0, 0, 0);
        // scene.add( outerSphere );

        const groundSphereGeometry = new THREE.SphereGeometry( 1000, 200, 200 );
        const groundSphereTextureLoader = new THREE.TextureLoader();
        const groundSphereTexture = groundSphereTextureLoader.load("moon.jpeg")
        const groundSphereMaterial = new THREE.MeshBasicMaterial( { map: groundSphereTexture} );
        const groundSphere = new THREE.Mesh( groundSphereGeometry, groundSphereMaterial );
        groundSphere.position.set(0, -1000, 0);
        // groundSphere.layers.set(1)
        groundSphere.receiveShadow = true;
        scene.add( groundSphere );



        // const boxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
        // const textureLoader = new THREE.TextureLoader();
        // const texture = textureLoader.load("sky.jpg")
        // const boxMaterial = new THREE.MeshBasicMaterial( { side: BackSide, map: texture } );
        // const cube = new THREE.Mesh( boxGeometry, boxMaterial );
        // cube.receiveShadow = true;
        // cube.position.y = 1000;
        // scene.add( cube );

        // const planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
        // const planeMaterial = new THREE.MeshToonMaterial( { color: "#238E47"} )
        // const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        // plane.receiveShadow = true;
        // plane.lookAt(new THREE.Vector3(0,Math.PI/2,0))
        // scene.add( plane );


        //BLOOM
			const renderScene = new RenderPass( scene, camera )

        
      const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 10, 1.4, 0 )
        
      const composer = new EffectComposer( renderer )
      composer.setSize( window.innerWidth, window.innerHeight )
        
      composer.addPass( renderScene )
      composer.addPass( bloomPass )
        
      // renderer.toneMappingExposure = Math.pow( 0.9, 4.0 ) 
        

      const raycaster = new THREE.Raycaster();

      const mouse = new THREE.Vector2();


			function onPointerDown( event: PointerEvent ) {
        console.log("pointer")
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

				raycaster.setFromCamera( mouse, camera );
				const intersects = raycaster.intersectObjects( scene.children, false );
				// if ( intersects.length > 0 ) {

				// 	const object = intersects[ 0 ].object;
				// 	object.layers.toggle( BLOOM_SCENE );
				// 	render();

				// }

			}

        // TODO: clicking globe turns toggles day/night
        window.addEventListener( 'pointerdown', onPointerDown );


        // window.onresize = function () {

        //   const width = window.innerWidth;
        //   const height = window.innerHeight;
  
        //   camera.aspect = width / height;
        //   camera.updateProjectionMatrix();
  
        //   renderer.setSize( width, height );
  
        //   bloomComposer.setSize( width, height );
        //   finalComposer.setSize( width, height );
  
        //   render();
  
        // };

        // MODEL
        const loader = new GLTFLoader();
        const model = await loader.loadAsync('cartoon-cats/glTF_aqua/CuteCat_glTF.gltf');
        model.scene.castShadow = true;
        model.scene.receiveShadow = true;
        scene.add(model.scene);

        // const position = model.scene.getWorldPosition(model.scene.position);

        // ANIMATIONS
        const mixer = new THREE.AnimationMixer( model.scene );
        const attack1 = model.animations.find(clip => clip.name === "attack1");
        const attack2 = model.animations.find(clip => clip.name === "attack2");
        const dmg1 = model.animations.find(clip => clip.name === "dmg1");
        const dmg2 = model.animations.find(clip => clip.name === "dmg2");
        const falls1 = model.animations.find(clip => clip.name === "falls1");
        const falls2 = model.animations.find(clip => clip.name === "falls2");
        const falls3 = model.animations.find(clip => clip.name === "falls3");
        const idle1 = model.animations.find(clip => clip.name === "idle1");
        const idle2 = model.animations.find(clip => clip.name === "idle2");
        const happy = model.animations.find(clip => clip.name === "happy");
        const jump = model.animations.find(clip => clip.name === "jump");
        const no = model.animations.find(clip => clip.name === "no");
        const run = model.animations.find(clip => clip.name === "run");
        const run2 = model.animations.find(clip => clip.name === "run2");
        const wakesup = model.animations.find(clip => clip.name === "wakesup");
        const walk = model.animations.find(clip => clip.name === "walk");
        const waving = model.animations.find(clip => clip.name === "waving");
        const yes = model.animations.find(clip => clip.name === "yes");


        //ACTIONS
        if(idle2) mixer.clipAction(idle2).play();
        document.addEventListener("keydown", (ev) => {
          console.log(model.scene.position.z)
          if(idle2) mixer.clipAction(idle2).stop();

            // WALK
            if(ev.code === "KeyW"){
              if(walk) mixer.clipAction(walk).play();
              model.scene.translateZ(5);
              model.scene.rotateX(0.005);
            }
  
            if(ev.code === "KeyS"){
              if(walk) mixer.clipAction(walk).play();
              model.scene.translateZ(-5);
            }
  
            //RUN
            if(ev.code === "ShiftLeft"){
              if(run) mixer.clipAction(run).play();
              model.scene.translateZ(10);
            }


          //ROTATE
          if(ev.code === "KeyA"){
            if(walk) mixer.clipAction(walk).play();
            model.scene.rotateY(-0.1);

          }

          if(ev.code === "KeyD"){
            if(walk) mixer.clipAction(walk).play();
            model.scene.rotateY(0.1);
          }

          if(ev.code === "Space"){
            if(jump) mixer.clipAction(jump).play();
            model.scene.translateY(20);
            model.scene.translateZ(5);
          }

        });

        document.addEventListener("keyup", (ev) => {
          if(run) mixer.clipAction(run).stop();
          if(walk) mixer.clipAction(walk).stop();
          if(jump) mixer.clipAction(jump).stop();
          if(ev.code === "Space") model.scene.translateY(-20);
          if(model.scene.position.y > 0) model.scene.position.y = 0;
          if(idle2) mixer.clipAction(idle2).play();

        });

        // ANIMATION LOOP
        // renderer.setAnimationLoop(() => {
        //   // console.log(model.scene.position);
        //   controls.update();
        //   if(mixer) {
        //     mixer.update(0.07);
        //   }
        //   // camera.lookAt(model.scene.position.x, 0, model.scene.position.z);
        //   camera.lookAt(model.scene.position);

        //   renderer.render( scene, camera );
        // })
        render();
        function render(){
          requestAnimationFrame(render);
          controls.update();
          if(mixer) {
            mixer.update(0.07);
          }
          camera.lookAt(model.scene.position.x, 0, model.scene.position.z);
          
          renderer.autoClear = false;
          renderer.clear();
          
          camera.layers.set(1);
          composer.render();
          
          renderer.clearDepth();

          camera.layers.set(0);
          renderer.render(scene, camera);
        }

        // function render() {
        //   renderer.render( scene, camera );
        // }
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