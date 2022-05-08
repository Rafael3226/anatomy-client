import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

export default function LoadObj({
  mtlPath,
  objPath,
  canvasId,
}: {
  mtlPath: string;
  objPath: string;
  canvasId: string;
}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  canvas.appendChild(renderer.domElement);

  // const controls = new OrbitControls(camera, renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(light);

  // controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(0, 20, 20);
  // controls.update();

  const mtlLoader = new MTLLoader();
  // mtlLoader.setPath(path);
  mtlLoader.load(mtlPath, (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    // objLoader.setPath(path);
    objLoader.load(objPath, (object) => {
      scene.add(object);
    });
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

// export default function loadObjWithMaterial(mtlFile: string, objFile: string) {
//   let mtlLoader = new MTLLoader();
//   let url = mtlFile;
//   return new Promise((resolve, reject) => {
//     mtlLoader.load(url, (materials) => {
//       materials.preload();
//       let objLoader = new OBJLoader();
//       objLoader.setMaterials(materials);
//       objLoader.load(objFile, (object) => resolve(object));
//     });
//   });
// }
