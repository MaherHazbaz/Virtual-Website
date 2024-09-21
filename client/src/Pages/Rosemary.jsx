import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/rosemary/rosemary.gltf");
  return <primitive object={scene} scale={65} position={[0, -8, 0]} />;
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
                  Rosemary (Salvia rosmarinus){" "}
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  Rosemary (Salvia rosmarinus) is a perennial herb from the
                  Lamiaceae family that has been used in culinary and medicinal
                  practices for centuries. Originating in the Mediterranean,
                  rosemary has become a staple in many global cuisines, prized
                  for its distinct aroma and flavor. Beyond its culinary uses,
                  rosemary is valued for its numerous health benefits,
                  particularly in improving cognitive function and memory, as
                  well as its antioxidant and anti-inflammatory properties.
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Cognitive health:
                    </span>{" "}
                    Rosemary may enhance memory and concentration.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Antioxidant properties:
                    </span>{" "}
                    Rosemary is rich in antioxidants that help protect cells
                    from damage.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Anti-inflammatory effects:
                    </span>{" "}
                    Rosemary may help reduce inflammation in the body.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Digestive health:
                    </span>{" "}
                    Rosemary may aid in digestion and relieve indigestion.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Circulatory health:
                    </span>{" "}
                    Rosemary may improve circulation.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Mood and stress relief:
                    </span>{" "}
                    Rosemary may help reduce stress and improve mood.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Antimicrobial properties:
                    </span>{" "}
                    Rosemary has antimicrobial effects that may help prevent
                    infections.{" "}
                  </p>{" "}
                </div>{" "}
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
