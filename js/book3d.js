const container = document.getElementById('background-scene');
const width = container.offsetWidth;
const height = container.offsetHeight;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
camera.position.z = 10;

camera.position.set(25, 30, -15); // Example: Move camera to look from above and a bit to the side
camera.lookAt(0, -2, 0); // Ensure the camera is focused on the model

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0); // Transparent background
container.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xfff2ff, 1.5);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Load .obj file
let bookModel;
const loader = new THREE.OBJLoader();
loader.load(
    './AdobeStock_396827122/old_book_1537.obj', 
    function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x3495ff, // Light blue color
                    metalness: 0.2,
                    roughness: 0.8,
                    specular: 0x444444, 
                    shininess: 30,        // Level of shininess
                });
            }
        });
        bookModel = object;
        bookModel.scale.set(1.5, 1.5, 1.5);
        bookModel.position.set(0, -120, 0);
        scene.add(bookModel);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('An error occurred:', error);
    }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Handle resizing
window.addEventListener('resize', () => {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Mouse movement effect
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(event.clientY / window.innerHeight - 0.5) * 2;
});

// Animation loop
let initialRotation = 0;
function animate() {
    requestAnimationFrame(animate);

    if (bookModel) {
        // Apply subtle movement based on mouse position
        bookModel.rotation.y = mouse.x * 0.1 + initialRotation; // Rotate on Y axis
        bookModel.rotation.x = mouse.y * 0.2 +initialRotation; // Rotate on X axis
        bookModel.position.x = mouse.x * 0.6; // Slight position shift on X axis
        bookModel.position.y = mouse.y * 0.1; // Slight position shift on Y axis

        // Initial rotation animation
        initialRotation += 0.004; // Adjust the speed of the initial rotation as needed
    }

    renderer.render(scene, camera);
}
animate();