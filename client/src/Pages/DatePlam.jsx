import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/date_palm/datepalm.gltf");
  return <primitive object={scene} scale={5} position={[0, -17, -1]} />;
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
                  Date Palm (Phoenix dactylifera){" "}
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  The date palm (Phoenix dactylifera) has been cultivated for
                  thousands of years and is a staple food in many parts of the
                  Middle East and North Africa. Known for its sweet, energy-rich
                  fruit, the date palm provides not only essential nutrients but
                  also potential health benefits. In addition to being a rich
                  source of fiber, vitamins, and minerals, dates are recognized
                  for their antioxidant properties and their role in promoting
                  overall wellness, particularly in managing chronic conditions.{" "}
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Blood pressure:</span> Dates
                    may help regulate blood pressure due to their potassium
                    content.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Satiety:</span> The high
                    fiber content of dates may help enhance feelings of fullness
                    and aid in weight management.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Serum lipids:</span> Regular
                    consumption of dates may help in maintaining healthy
                    cholesterol levels.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Hypercholesterolemia:
                    </span>{" "}
                    Dates may aid in preventing hypercholesterolemia through
                    their fiber and antioxidant properties.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Diabetes:</span> While dates
                    are high in natural sugars, they have a low glycemic index,
                    which may help in moderate blood sugar management.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Hypertension:</span> The
                    combination of potassium and low sodium content in dates may
                    help prevent hypertension.{" "}
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
