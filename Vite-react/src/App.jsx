import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Sparkles} from '@react-three/drei';
import {useRef} from 'react';

const RotatingCylinder = () => { //this function returns a mesh of a rotating cube. 
  const meshRef = useRef(); //hook from React
  useFrame(() => {
    if (meshRef.current) { //if the mesh exists
      meshRef.current.rotation.x += 0.01; //rotate the cube on x-axis
      meshRef.current.rotation.y += 0.01; //rotate the cube on y-axis
      meshRef.current.rotation.z += 0.01; //rotate the cube on z-axis
    }
  })
  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1,1,1]} />
      <meshStandardMaterial color="#468585" emissive= "#468585" />
    </mesh>
  )
}

const App = () => {
  return (
    <Canvas style={{height:'100vh', width:'100vw', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <OrbitControls enableZoom enablPan enableRotate />
      {/* Add your 3D scene elements here */}
      {/* Sparkles spread throughout the entire background */}
      <Sparkles 
        count={1000} 
        scale={[50, 50, 50]} // Spread sparkles across the entire scene
        size={4} 
        speed={0.1} 
        noise={0.5} 
        position={[0, 0, -10]} // Push sparkles behind the cube
        color='silver'
      />
      <directionalLight position={[10, 10, 10]} intensity={10} color={0x9CBDA6} />
      <color attach="background" args={['#234564']}/>
      
      <RotatingCylinder />
    </Canvas>
  )
}

export default App;

// It is a 3d scene using React-Three-fiber library. 
// The scene is rendered in a canvas element.
// The scene includes orbits controls for user interaction, directional lighting to add lighting, color to set background and a rotating cylinder component
//To run this code, you need to have Node.js and npm installed on your machine.
//npm create vite@latest
// npm i three @react-three/fiber @react-three/drei
// npm run dev