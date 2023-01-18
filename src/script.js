/* READ ME

Caitriona McAllister, Yr 3 GMD (CCI)
Student Number: 019011624

Route B: P&I
Title: 'Creative coded visuals'
Industry: Animated data visualisation and creative coding

Summary: Data is essential in every industry. Making it accesible, eucational 
and fun is important to encourage more people to understand, use and benefit from information. 
The aim of this project is to create a short moving animation using code that highlights important 
environmental data. A topic that I find very relevant today is the bleaching of coral reefs. 
This issue impacts everybody globally as coral reefs are vital to various ecosystems making it
important to raise awareness of the topic. I have found an open source live data set which I will be 
taking elements of to include in my visuals. 

I want to pursue a career in the creative coding industries. This profession is very 
wide and there is lots to cover. I have been focussing on front-end web development, interactivity 
and data visualsing using three.js. I will be creating a visualisation of coral reef bleaching 
with the use of html, js and css. 

Many companies have fun interactive landing pages, exhibits, installations or displays. My intention
is to create a animated visualisation for an environmental cause which could be used on a
larger scale or average monitor display size. 

Outcome: Animated visualisation scene of coral reef bleaching impacts that can be displayed 
in various mockup formats eg a projection, a website landing page, an exhibition etc

Data Source Title: Coral Reef Brightspots
Data Source Credit: Florida Technology College
Data Source URL: http://dmoserv3.bco-dmo.org/jg/serv/BCO-DMO/Coral_Reef_Brightspots/global_bleaching_environmental.html0

*/

/*to do:

-add water jpg to spotlight
-add day and night changes to shadow and lighting
-add tempurature controls to show colour, fish, lighting - add gui
-can anybody look at the scene and understand what it is 
- focus group
*/

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'
import * as dat from 'lil-gui'
// import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

/*
Create basic canvas and scene
*/
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

/*
Load textures
https://3dtextures.me/tag/stone/
https://www.cgtrader.com/3d-models/textures/natural-textures/coral-reef-pbr-tileable-material
*/
var textureLoader = new THREE.TextureLoader();

//water
const waterTexture = textureLoader.load('/textures/water/water.jpg'); //water spotlight jpg
// const floorTexture = textureLoader.load('/textures/water.jpg');
// const coralTexture = textureLoader.load('/textures/water.jpg');

//coral - coral1 texture
const coralColour1Texture = textureLoader.load('/textures/coral/coral1/Coral_001_basecolor.jpg')
const coral1AmbientOcclusionTexture = textureLoader.load('/textures/coral/coral1/Coral_001_ambientOcclusion.jpg')
const coral1NormalTexture = textureLoader.load('/textures/coral/coral1/Coral_001_normal.jpg')
const coral1RoughnessTexture = textureLoader.load('/textures/coral/coral1/Coral_001_roughness.jpg')
const coral1HeightTexture = textureLoader.load('/textures/coral/coral1/Coral_001_height.png')

coralColour1Texture.repeat.set(8, 8)
coral1AmbientOcclusionTexture.repeat.set(1,1)
coral1NormalTexture.repeat.set(1,1)
coral1RoughnessTexture.repeat.set(1,1)

//coral - coral2 texture
const coralColour2Texture = textureLoader.load('/textures/coral/coral2/Coral_002_basecolor.jpg')
const coral2AmbientOcclusionTexture = textureLoader.load('/textures/coral/coral2/Coral_002_ambientOcclusion.jpg')
const coral2NormalTexture = textureLoader.load('/textures/coral/coral2/Coral_002_normal.jpg')
const coral2RoughnessTexture = textureLoader.load('/textures/coral/coral2/Coral_002_roughness.jpg')
const coral2HeightTexture = textureLoader.load('/textures/coral/coral2/Coral_002_height.png')

coralColour2Texture.repeat.set(1,1)
coral2AmbientOcclusionTexture.repeat.set(1,1)
coral2NormalTexture.repeat.set(1,1)
coral2RoughnessTexture.repeat.set(1,1)

//coral - coral3 texture
//coral - coral4 texture
//coral - coral5 texture

//floor - reef1 texture reefFloor2ColorHeightTexture
const reefFloor1ColorTexture = textureLoader.load('/textures/floor/reef1/Ground_Wet_Pebbles_001_basecolor.jpg')
const reefFloor1ColorAmbientOcclusionTexture = textureLoader.load('/textures/floor/reef1/Ground_Wet_Pebbles_001_ambientOcclusion.jpg')
const reefFloor1ColorNormalTexture = textureLoader.load('/textures/floor/reef1/Ground_Wet_Pebbles_001_normal.jpg')
const reefFloor1ColorRoughnessTexture = textureLoader.load('/textures/floor/reef1/Ground_Wet_Pebbles_001_roughness.jpg')

reefFloor1ColorTexture.repeat.set(8, 8)
reefFloor1ColorAmbientOcclusionTexture.repeat.set(8, 8)
reefFloor1ColorNormalTexture.repeat.set(8, 8)
reefFloor1ColorRoughnessTexture.repeat.set(8, 8)

reefFloor1ColorTexture.wrapS = THREE.RepeatWrapping
reefFloor1ColorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
reefFloor1ColorNormalTexture.wrapS = THREE.RepeatWrapping
reefFloor1ColorRoughnessTexture.wrapS = THREE.RepeatWrapping

reefFloor1ColorTexture.wrapT = THREE.RepeatWrapping
reefFloor1ColorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
reefFloor1ColorNormalTexture.wrapT = THREE.RepeatWrapping
reefFloor1ColorRoughnessTexture.wrapT = THREE.RepeatWrapping

//floor - reef2 texture
const reefFloor2ColorTexture = textureLoader.load('/textures/floor/reef2/Stylized_Rocks_001_basecolor.jpg')
const reefFloor2ColorAmbientOcclusionTexture = textureLoader.load('/textures/floor/reef2/Stylized_Rocks_001_ambientOcclusion.jpg')
const reefFloor2ColorNormalTexture = textureLoader.load('/textures/floor/reef2/Stylized_Rocks_001_normal.jpg')
const reefFloor2ColorRoughnessTexture = textureLoader.load('/textures/floor/reef2/Stylized_Rocks_001_roughness.jpg')
const reefFloor2HeightTexture = textureLoader.load('/textures/floor/reef2/Stylized_Rocks_001_height.png')

reefFloor2ColorTexture.repeat.set(8, 8)
reefFloor2ColorAmbientOcclusionTexture.repeat.set(8, 8)
reefFloor2ColorNormalTexture.repeat.set(8, 8)
reefFloor2ColorRoughnessTexture.repeat.set(8, 8)
reefFloor2HeightTexture.repeat.set(8, 8)

reefFloor2ColorTexture.wrapS = THREE.RepeatWrapping
reefFloor2ColorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
reefFloor2ColorNormalTexture.wrapS = THREE.RepeatWrapping
reefFloor2ColorRoughnessTexture.wrapS = THREE.RepeatWrapping
reefFloor2HeightTexture.wrapS = THREE.RepeatWrapping

reefFloor2ColorTexture.wrapT = THREE.RepeatWrapping
reefFloor1ColorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
reefFloor2ColorNormalTexture.wrapT = THREE.RepeatWrapping
reefFloor2ColorRoughnessTexture.wrapT = THREE.RepeatWrapping
reefFloor2HeightTexture.wrapT = THREE.RepeatWrapping

/*
Scene colour palette
    0xFC5000, // orange
    0xFF7062, // coral
    0x245B81, // dark blue
    0x338EB8, // blue
    0x80DDEF, // light blue
    0x3B684A, // dark green
    0x6FAE84  // green
*/

/*
Create groups
Reef, coral and sea lighting
*/
const reef = new THREE.Group()
scene.add(reef)
const floor = new THREE.Group()
scene.add(floor)

/*
coral geometry and material
does this need to be standard,basic or lambert mesh
change colour of each coral 
add colour change here to coral make coralPlant.colour=white
test this with a gui
coral texture 1
*/
const coral1Geometry = new THREE.SphereGeometry(0.9,100,100,100) //double check these
const coral2Geometry = new THREE.SphereGeometry(1.3,100,100,100)

var coralColours = [
    0x912a00, // dark orange
    0xFC5000, // orange
    0xFF7062, // coral
    0xC45AB3, // pink
    0x8D6B94, // blue
    0x034732, // dark green
    0x3B684A, // green
    0x6FAE84 // lightngreen
    // 0xE0CBA8, // beige
    // 0xFFD07B, // lightngreen
    // 0xffab33  // yellow
    // 0xffffff,
    // 0xfff999,
    // 0xF3DDF3
  ];

for(let i = 0; i < 150; i++){
   
    //creates variables and attributes
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 1 + Math.random() * 10     // Random radius
    const coralX = Math.cos(angle) * radius   // Get the x position using cosinus
    const coralZ = Math.sin(angle) * radius   // Get the z position using sinus
    const coralY = Math.random() // Get the y position
    var minSize = 0.3;
    var maxSize = 0.7;
    const coralSize = Math.random() * (maxSize - minSize) + minSize; //random coral size

    var coralColour = coralColours[Math.floor(Math.random() * coralColours.length)];

    // Create the mesh
    const coralPlant = new THREE.Mesh(
        coral1Geometry, 
        new THREE.MeshStandardMaterial({
        // map: coralColour1Texture,
        color: coralColour,
        aoMap: coral1AmbientOcclusionTexture,
        normalMap: coral1NormalTexture,
        roughnessMap: coral1RoughnessTexture,
        displacementMap: coral1HeightTexture,
        displacementScale: .25
    })
)
    coralPlant.castShadow = true
    coralPlant.position.set(coralX, coralY -0.6, coralZ)    
    coralPlant.scale.set(coralSize, coralSize, coralSize)
    coralPlant.rotation.z = (Math.random() - 0.5) * 0.4
    coralPlant.rotation.y = (Math.random() - 0.5) * 0.4

    reef.add(coralPlant)
}
//coral texture 2
for(let i = 0; i < 100; i++){
   
    //creates variables and attributes
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 1 + Math.random() * 5     // Random radius
    const smallCoralX = Math.cos(angle) * radius   // Get the x position using cosinus
    const smallCoralZ = Math.sin(angle) * radius   // Get the z position using sinus
    const smallCoralY = Math.random() // Get the y position
    var minSize = 0.3;
    var maxSize = 0.4;
    const smallCoralSize = Math.random() * (maxSize - minSize) + minSize; //random coral size

    var coralColour = coralColours[Math.floor(Math.random() * coralColours.length)];

    // Create the mesh
    const smallCoralPlant = new THREE.Mesh(
        coral2Geometry, 
        new THREE.MeshStandardMaterial({
        // map: coralColour2Texture,
        color: coralColour,
        aoMap: coral2AmbientOcclusionTexture,
        normalMap: coral2NormalTexture,
        roughnessMap: coral2RoughnessTexture,
        displacementMap: coral2HeightTexture,
        // dispalcementScale: .1
    })
)
smallCoralPlant.castShadow = true
    smallCoralPlant.position.set(smallCoralX, smallCoralY -0.6, smallCoralZ)    
    smallCoralPlant.scale.set(smallCoralSize, smallCoralSize, smallCoralSize)
    smallCoralPlant.rotation.z = (Math.random() - 0.5) * 0.4
    smallCoralPlant.rotation.y = (Math.random() - 0.5) * 0.4

    reef.add(smallCoralPlant)
}



/*
Create fish
Gui showing change in temp, colour etc (bleeching)
const col = {color:'blue'}
gui.addColor(col, 'colour').onChange(()=> {
    pointLight.color.set
})
*/
const fishes = new THREE.Group()
scene.add(fishes)
//fish geometry and material and amount
const fishGeometry = new THREE.SphereGeometry(1.3, 16, 16)
const fishMaterial = new THREE.MeshStandardMaterial({ color: '#ED9C0A' })
const fishAmount = 30


for (let i = 0; i < fishAmount; i++){

    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 1 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus
    const fishY = Math.random()
    var minSizeFish = 0.08;
    var maxSizeFish = 0.2;
    const fishSize = Math.random() * (maxSizeFish - minSizeFish) + minSizeFish; //random coral size

    // Create the mesh
    const fish = new THREE.Mesh(fishGeometry, fishMaterial)
    fish.castShadow = true
    fish.position.set(x, fishY + 1, z)    
    fish.scale.set(fishSize,fishSize,fishSize)
    fish.rotation.z = (Math.random() - 0.5) * 0.4
    fish.rotation.y = (Math.random() - 0.5) * 0.4
    fishes.add(fish)
}


/*
Create sea bed floor
*/
const reefFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(40,40,100,100),
    new THREE.MeshStandardMaterial({
        map: reefFloor2ColorTexture,
        // color: '#034732',
        color: '#ffffff',
        aoMap: reefFloor2ColorAmbientOcclusionTexture,
        normalMap: reefFloor2ColorNormalTexture,
        roughnessMap: reefFloor2ColorRoughnessTexture,
        displacementMap: reefFloor2HeightTexture
    })
)
reefFloor.receiveShadow = true
reefFloor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(reefFloor.geometry.attributes.uv.array, 2))
reefFloor.rotation.x = - Math.PI * 0.5
reefFloor.position.y = 0
floor.add(reefFloor)


/*
Create Lighting
*/
//ambient lighting
const ambientLight = new THREE.AmbientLight('#CAE2D6', 0.5)
scene.add(ambientLight)
// sunlight Point lights
const sunlight1 = new THREE.PointLight('#2f92c1', 2, 3)
sunlight1.castShadow = true
sunlight1.shadow.mapSize.width = 256
sunlight1.shadow.mapSize.height = 256
sunlight1.shadow.camera.far = 7
const sunlight2 = new THREE.PointLight('#00b300', 2, 3)
sunlight2.castShadow = true
sunlight2.shadow.mapSize.width = 256
sunlight2.shadow.mapSize.height = 256
sunlight2.shadow.camera.far = 7
const sunlight3 = new THREE.PointLight('#ab8127', 2, 3)
sunlight3.castShadow = true
sunlight3.shadow.mapSize.width = 256
sunlight3.shadow.mapSize.height = 256
sunlight3.shadow.camera.far = 7
scene.add(sunlight1, sunlight2, sunlight3)

//water spotlight - this spotlight texture not working
//https://threejs.org/docs/#api/en/lights/SpotLight.map 
const spotLight = new THREE.SpotLight( 0xb1dd8c )
// const spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set( 1, 5, 1 );
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.7;
spotLight.decay = 2;
spotLight.distance = 0;
spotLight.intensity = 2;
spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 100;
spotLight.shadow.mapSize.height = 100;
spotLight.shadow.camera.near = 2;
spotLight.shadow.camera.far = 200;
spotLight.shadow.focus = 1;
spotLight.map = waterTexture; //not working
scene.add( spotLight );
const lightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( lightHelper );


/*
Sea mist / fog
*/
const fog = new THREE.Fog('#0c5159', 1, 15)
scene.fog = fog



/*
Sizing and resizing 
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/*
Cameras
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0.5
camera.position.y = 5
camera.position.z = 5
scene.add(camera)



/*
Controls
*/
const controls = new OrbitControls(camera, canvas)
controls.minDistance = 1; //zoom in
controls.maxDistance = 10; //zoom out
controls.maxPolarAngle = Math.PI / 2.3 ; //stops going below ground
controls.autoRotate = true; //enable rotation
controls.enableDamping = true


/*
Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor('#0c5159')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*
Animate
*/
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // move sunlight spots
    const sunlight1Angle = elapsedTime * 0.5
    sunlight1.position.x = Math.cos(sunlight1Angle) * 4
    sunlight1.position.z = Math.sin(sunlight1Angle) * 4
    sunlight1.position.y = Math.sin(elapsedTime * 3)

    const sunlight2Angle = - elapsedTime * 0.32
    sunlight2.position.x = Math.cos(sunlight2Angle) * 5
    sunlight2.position.z = Math.sin(sunlight2Angle) * 5
    sunlight2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const sunlight3Angle = - elapsedTime * 0.18
    sunlight3.position.x = Math.cos(sunlight3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    sunlight3.position.z = Math.sin(sunlight3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    sunlight3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    //animates fishes
    const fishAngle = elapsedTime * 0.5
    fishes.position.x = Math.cos(fishAngle) * 2
    fishes.position.z = Math.sin(fishAngle) * 2
    fishes.position.y = Math.sin(elapsedTime * 0.1)

    // Update controls
    controls.update()

    // Render scene and camera
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


/*
Debug - gui (test colour temp change)
*/
const gui = new dat.GUI()
const fishFolder = gui.addFolder('Fish')
const cameraFolder = gui.addFolder('Camera')
const soundFolder = gui.addFolder('Audio') // add underwater effects
const reefFolder = gui.addFolder('Reef')
const lightFolder = gui.addFolder('Lighting')

cameraFolder.add(camera.position, 'x', 0 , Math.PI * 2)
cameraFolder.add(camera.position, 'y', 0 , Math.PI * 2)
cameraFolder.add(camera.position, 'z', 0 , Math.PI * 2)

fishFolder.add(fishes, 'visible').name('Show fish') //show fish
fishFolder.addColor(fishMaterial, 'color').onChange() //change fish colour
// fishFolder.add(fishAmount, '30').min(0).max(30).step(0.001)

reefFolder.add(reef, 'visible').name('Show Reef') //show fish)
// reefFolder.addColour(coral

// lighting
lightFolder.addColor(spotLight, 'color').onChange() //change fish colour
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)

/*
Sliders
With more time, I can add sliders that show temperature and change the colour of
the corals to white (bleached) in order to visualise the impact of sea temperatures
rising. 
*/


/*
animate by calling tick
*/
tick()
