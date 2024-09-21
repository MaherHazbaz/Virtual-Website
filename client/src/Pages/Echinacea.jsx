import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/echinacea/echinacea.gltf");
  return <primitive object={scene} scale={23} position={[0, -10, 2]} />;
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
        <ambientLight intensity={1} />
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
                  Echinacea (Echinacea species)
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  Echinacea is a genus of flowering plants from the Asteraceae
                  family, traditionally used in herbal medicine. Indigenous to
                  North America, echinacea has been a part of natural remedies
                  for centuries. Today, it is recognized for its immune-boosting
                  properties and a variety of health benefits, making it a
                  popular choice in herbal supplements for wellness and disease
                  prevention.
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    <span className="font-semibold">Immune support:</span>{" "}
                    Echinacea may help boost the immune system, aiding in the
                    prevention of infections like colds and respiratory
                    illnesses.
                  </p>
                  <p>
                    <span className="font-semibold">Cold and flu relief:</span>{" "}
                    Echinacea may reduce the duration and severity of colds and
                    flu when taken at the onset.
                  </p>
                  <p>
                    <span className="font-semibold">
                      Anti-inflammatory properties:
                    </span>{" "}
                    Echinacea may help reduce inflammation, benefiting
                    conditions like arthritis and sore throats.
                  </p>
                  <p>
                    <span className="font-semibold">Antioxidant effects:</span>{" "}
                    Echinacea contains antioxidants that help neutralize free
                    radicals and promote overall health.
                  </p>
                  <p>
                    <span className="font-semibold">Wound healing:</span>{" "}
                    Echinacea may promote wound healing due to its antimicrobial
                    and anti-inflammatory properties.
                  </p>
                  <p>
                    <span className="font-semibold">Respiratory health:</span>{" "}
                    Echinacea may relieve symptoms of respiratory infections
                    such as sinusitis and bronchitis.
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
