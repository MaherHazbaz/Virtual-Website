import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/lupine_plant/lupine.gltf");
  return <primitive object={scene} scale={0.3} position={[-2, -8, 3]} />;
};

// GLTFModel Component
const GLTFModel = () => {
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
        <ambientLight intensity={3} />
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
                  Lupine (Lupinus){" "}
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  Lupine (Lupinus) is a legume from the Fabaceae family that has
                  been part of the human diet for centuries. It is commonly
                  consumed in the Mediterranean and South American regions.
                  Known for its high protein and fiber content, lupine offers
                  several health benefits while also contributing to ecological
                  sustainability.
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Blood pressure:</span>{" "}
                    Lupine may help lower blood pressure due to its bioactive
                    peptides.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Satiety:</span> The high
                    fiber and protein content in lupine may enhance satiety,
                    helping with weight management.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Serum lipids:</span> Regular
                    consumption of lupine may help improve lipid profiles,
                    reducing bad cholesterol (LDL) levels.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Hypercholesterolemia:
                    </span>{" "}
                    Lupine’s rich fiber content may help prevent and manage high
                    cholesterol levels.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Diabetes:</span> Lupine may
                    help improve insulin sensitivity and control blood sugar
                    levels.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Type 2 diabetes:</span>{" "}
                    Lupine may reduce glucose absorption and lower the risk of
                    type 2 diabetes.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Hypertension:</span>{" "}
                    Lupine's ability to help relax blood vessels may contribute
                    to the prevention and management of hypertension.{" "}
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

export default GLTFModel;
