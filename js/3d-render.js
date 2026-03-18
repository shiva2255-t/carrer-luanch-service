/**
 * Career Launch Services - 3D Hero Render
 * Using Three.js to create the floating Gold Compass/Box
 */

// 1. Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // 1:1 Aspect ratio for the hero box
const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
});

const container = document.getElementById('compass-canvas');
const size = container.clientWidth;
renderer.setSize(size, size);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 2. Lights (Essential for Gold/Metal Materials)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xc5a059, 2); // Gold-tinted light
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 3. Create the "Box" (Plinth) from your sketch
const boxGeometry = new THREE.BoxGeometry(2, 0.5, 2);
const boxMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1b2430,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
    transmission: 0.5, // Glass effect
    thickness: 0.5
});
const plinth = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(plinth);

// 4. Create the "Compass" (Simplified for Code-only version)
// For a production site, you would use GLTFLoader to load a .glb compass model
const compassGroup = new THREE.Group();

const ringGeo = new THREE.TorusGeometry(0.8, 0.05, 16, 100);
const goldMat = new THREE.MeshStandardMaterial({ 
    color: 0xc5a059, 
    metalness: 1, 
    roughness: 0.2 
});
const ring = new THREE.Mesh(ringGeo, goldMat);
ring.rotation.x = Math.PI / 2;

const needleGeo = new THREE.ConeGeometry(0.1, 1.2, 4);
const needle = new THREE.Mesh(needleGeo, goldMat);
needle.rotation.x = Math.PI / 2;

compassGroup.add(ring);
compassGroup.add(needle);
compassGroup.position.y = 0.8; // Floating above the box
scene.add(compassGroup);

camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

// 5. Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Subtle floating movement
    const time = Date.now() * 0.001;
    compassGroup.position.y = 0.8 + Math.sin(time) * 0.1;
    
    // Rotation matching the "3D" tag in your sketch
    compassGroup.rotation.y += 0.01;
    plinth.rotation.y += 0.005;

    renderer.render(scene, camera);
}

// 6. Handle Resize
window.addEventListener('resize', () => {
    const newSize = container.clientWidth;
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.setSize(newSize, newSize);
});

animate();