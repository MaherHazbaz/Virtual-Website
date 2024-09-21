import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/neem_tree/neem.gltf");
  return <primitive object={scene} scale={0.02} position={[-6, -16, -3]} />;
};

// GLTFModel Component
const Datepalm = () => {
  const [zoomIn, setZoomIn] = useState(false); // State for zoom effect
  const [showDetails, setShowDetails] = useState(false); // State for showing details

  const handleZoomAndDetails = () => {
    setZoomIn(!zoomIn); // Toggle zoom effect
    setShowDetails(!showDetails); // Toggle details visibility
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#C7E8C2] to-[#9BC88B]/* Soft Green Gradient */ absolute w-full">
      {" "}
      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls
          enableZoom={true}
          enableRotate={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate={zoomIn} // Enable auto rotation when zooming
        />
        <ZoomControl zoomIn={zoomIn} />
        {showDetails && (
          <Html position={[5, 2, 20]} center>
            <div
              className={`p-4 bg-white/60 rounded-lg text-center shadow-md backdrop-blur-md w-96 transition-all duration-500 ${
                showDetails ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="mt-2 text-gray-600">
                <h2 className="text-xl font-bold text-black">
                  Neem (Azadirachta indica){" "}
                </h2>
                <p className="mb-4">
                  Neem (Azadirachta indica), often referred to as the "miracle
                  tree," is a versatile tree native to the Indian subcontinent
                  and known for its extensive medicinal properties. Every part
                  of the neem tree, including its leaves, bark, seeds, and oil,
                  is used in traditional medicine. Neem is rich in bioactive
                  compounds such as azadirachtin, nimbin, and nimbolide, which
                  contribute to its wide-ranging health benefits.
                </p>
                <div className="space-y-2">
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Antimicrobial properties:
                    </span>{" "}
                    Neem may help combat bacteria, viruses, fungi, and
                    parasites, supporting overall immune function.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Anti-inflammatory effects:
                    </span>{" "}
                    Neem may reduce inflammation and provide relief from
                    conditions such as arthritis and inflammatory skin
                    disorders.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Skin health:</span> Neem is
                    often used in skincare for its ability to treat acne,
                    eczema, and other skin conditions due to its antimicrobial
                    and anti-inflammatory properties.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Immune support:</span> Neem
                    may boost the immune system and enhance the body’s natural
                    defense mechanisms.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Oral health:</span> Neem is
                    used in oral hygiene products for its ability to help reduce
                    plaque, gingivitis, and bad breath.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Blood sugar regulation:
                    </span>{" "}
                    Neem may help regulate blood sugar levels, which could be
                    beneficial for individuals with diabetes.{" "}
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
        className="absolute bottom-5 left-5 px-4 py-2 bg-black  text-white rounded-lg text-center shadow-md backdrop-blur-md hover:bg-white/60 hover:text-gray-600 transition duration-300"
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

export default Datepalm;
