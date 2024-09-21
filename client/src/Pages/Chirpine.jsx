import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/preface/plant.gltf");
  return <primitive object={scene} scale={1} />;
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
          <Html position={[5, 2, 0]} center>
            <div className="p-4 bg-white/60 rounded-lg text-center shadow-md backdrop-blur-md w-96">
              <div className="mt-2 text-gray-600">
                {" "}
                <h2 className="text-xl font-bold text-black">
                  {" "}
                  Chir Pine (Pinus roxburghii){" "}
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  Chir Pine (Pinus roxburghii) is a species of pine native to
                  the Himalayas, valued for its timber and resin. The tree is
                  known for its long needles and large cones. Chir pine has been
                  used traditionally in various forms of folk medicine, and its
                  resin, known as "chir pine resin," is particularly noted for
                  its therapeutic properties.
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Respiratory health:
                    </span>{" "}
                    Chir pine may help alleviate respiratory issues such as
                    coughs and bronchitis by acting as an expectorant and
                    decongestant.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Anti-inflammatory effects:
                    </span>{" "}
                    Chir pine has anti-inflammatory properties that may help
                    reduce inflammation and related discomfort.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Antimicrobial properties:
                    </span>{" "}
                    Chir pine may possess antimicrobial effects, helping to
                    combat bacterial and fungal infections.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Skin health:</span> Chir
                    pine resin may be used to treat minor skin irritations and
                    wounds due to its antiseptic properties.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Immune support:</span> Chir
                    pine may help support the immune system and enhance the
                    body’s defense mechanisms.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Digestive health:
                    </span>{" "}
                    Chir pine is traditionally used to aid digestion and relieve
                    symptoms of digestive discomfort.{" "}
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
      ? new Vector3(0, 2, 5)
      : new Vector3(20, 2, 18);
    camera.position.lerp(targetPosition, 0.05); // Smoothly interpolate to target position
    camera.lookAt(0, 2, 0); // Focus on the model
  });
  return null;
};

export default GLTFModel;
