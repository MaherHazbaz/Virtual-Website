// GLTFModel.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = () => {
  const { scene } = useGLTF("/models/plant.gltf"); // Direct reference to the path inside the 'public' folder
  return <primitive object={scene} scale={1} />;
};

const GLTFModel = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-4xl h-96 bg-gray-800 shadow-lg rounded-md">
        <Canvas className="w-full h-full">
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} />
          <Model />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default GLTFModel;
