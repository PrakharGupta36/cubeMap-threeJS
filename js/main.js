import "../css/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// init-three.js
const scene = new THREE.Scene();

// textures

scene.background = new THREE.CubeTextureLoader()
  .setPath("./public/textures/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

const CubeTextureLoader = new THREE.CubeTextureLoader()
  .setPath("./public/textures/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

// mesh

const torusKnotGeometry = new THREE.TorusKnotBufferGeometry(0.5, 0.2, 128, 128);

const material = new THREE.MeshPhongMaterial({ envMap: CubeTextureLoader });

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);

scene.add(torusKnot);

// camera,renderer
const sizes = { width: window.innerWidth, height: window.innerHeight };

let { width, height } = sizes;
const aspectRatio = width / height;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
camera.position.z = 5;

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// lights
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 1;
pointLight.position.y = 1;
pointLight.position.z = 1;
scene.add(pointLight);

// animation

function animation(time) {
  controls.update();

  torusKnot.rotation.x = 0.0001 * time;
  torusKnot.rotation.y = 0.0001 * time;
  torusKnot.rotation.z = 0.0001 * time;

  renderer.render(scene, camera);
}
