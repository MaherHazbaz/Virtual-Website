import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/ginger1/ginger1.gltf");
  return <primitive object={scene} scale={120} position={[-5, -8, 4]} />;
};

// GLTFModel Component
const GLTFModel = () => {
  const [zoomIn, setZoomIn] = useState(false); // State for zoom effect
  const [showDetails, setShowDetails] = useState(false); // State for showing details

  const handleZoomAndDetails = () => {
    setZoomIn((prev) => !prev); // Toggle zoom effect
    setShowDetails((prev) => !prev); // Toggle details visibility
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#C7E8C2] to-[#9BC88B] absolute w-full">
      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <ambientLight intensity={6} />
        <pointLight position={[10, 1, 10]} />
        <Model />
        <OrbitControls
          enableZoom={true}
          enableRotate={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 6}
          minPolarAngle={Math.PI / 3}
          autoRotate={zoomIn} // Enable auto rotation when zooming
        />
        <ZoomControl zoomIn={zoomIn} />
        {showDetails && (
          <Html position={[25, 1, 0]} center>
            <div
              className={`p-4 bg-white/60 rounded-lg text-center shadow-md backdrop-blur-md w-96 transition-all duration-500 ${
                showDetails ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="mt-2 text-gray-600">
  <h2 className="text-xl font-bold text-black">
    Garlic (Allium sativum)
  </h2>
  <p className="mb-4">
    Garlic is a bulbous plant from the Allium family, well-known for its distinctive flavor and numerous health benefits. Used in cooking and traditional medicine, garlic is celebrated for its immune-boosting and heart-protective properties.
  </p>
  <div className="space-y-2">
    <p>
      <span className="font-semibold">Heart health:</span> Garlic may help lower cholesterol levels, reduce blood pressure, and improve overall heart health.
    </p>
    <p>
      <span className="font-semibold">Immune support:</span> Garlic is known to enhance immune function, helping the body fight off infections and illnesses.
    </p>
    <p>
      <span className="font-semibold">Antimicrobial properties:</span> Garlic has natural antibacterial and antiviral properties, effective against a variety of pathogens.
    </p>
    <p>
      <span className="font-semibold">Antioxidant effects:</span> Garlic contains antioxidants that help protect cells from oxidative stress and reduce inflammation.
    </p>
    <p>
      <span className="font-semibold">Digestive health:</span> Garlic may support digestive health by promoting beneficial gut bacteria and aiding in detoxification.
    </p>
  </div>
</div>

            </div>
          </Html>
        )}
      </Canvas>

      {/* Button to trigger zoom and toggle details */}
      <button
        onClick={handleZoomAndDetails}
        className="absolute bottom-5 left-5 px-4 py-2 bg-black text-white rounded-lg text-center shadow-md backdrop-blur-md hover:bg-white/60 hover:text-gray-600 transition duration-300"
      >
        {zoomIn ? "Hide Details & Zoom Out" : "Zoom In & Show Details"}
      </button>
    </div>
  );
};

// Component to control zooming effect on the camera
const ZoomControl = ({ zoomIn }) => {
  useFrame(({ camera }) => {
    const targetPosition = zoomIn
      ? new Vector3(0, 2, 28)
      : new Vector3(20, 2, 18);
    camera.position.lerp(targetPosition, 0.02); // Smoothly interpolate to target position
    camera.lookAt(0, 2, 0); // Focus on the model
  });
  return null;
};

export default GLTFModel;
