import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/thyme/thyme.gltf");
  return <primitive object={scene} scale={75} position={[0, -8, 0]} />;
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
        <ambientLight intensity={1.3} />
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
                {" "}
                <h2 className="text-xl font-bold text-black">
                  {" "}
                  Thyme (Thymus vulgaris){" "}
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  Thyme (Thymus vulgaris) is a perennial herb from the Lamiaceae
                  family, widely used in culinary and medicinal traditions.
                  Known for its earthy, slightly minty flavor, thyme is a staple
                  in Mediterranean cuisine and is also valued for its potent
                  therapeutic properties. Rich in essential oils such as thymol,
                  thyme has powerful antioxidant, antimicrobial, and
                  anti-inflammatory effects.
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Respiratory health:
                    </span>{" "}
                    Thyme may help relieve coughs, bronchitis, and other
                    respiratory issues.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Antimicrobial properties:
                    </span>{" "}
                    Thyme has natural antimicrobial effects, helping to fight
                    off bacteria, viruses, and fungi.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Antioxidant properties:
                    </span>{" "}
                    Thyme is rich in antioxidants, which help protect cells from
                    oxidative stress.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Anti-inflammatory effects:
                    </span>{" "}
                    Thyme may reduce inflammation in the body, aiding conditions
                    such as arthritis.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Digestive health:
                    </span>{" "}
                    Thyme may improve digestion and help relieve indigestion and
                    bloating.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Immune support:</span> Thyme
                    may help boost the immune system and fight infections.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Skin health:</span> Thyme’s
                    antimicrobial properties may help treat skin conditions like
                    acne.{" "}
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
