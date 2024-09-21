import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = ({ position }) => {
  const { scene } = useGLTF("/models/dandelion/dandelion.gltf");
  return <primitive object={scene} scale={43} position={position} />;
};

// GLTFModel Component
const GLTFModel = () => {
  const [zoomIn, setZoomIn] = useState(false); // State for zoom effect
  const [showDetails, setShowDetails] = useState(false); // State for showing details
  const [modelPosition, setModelPosition] = useState([0, -8, 2]); // State for model position
  const [descriptionPosition, setDescriptionPosition] = useState([5, 2, 20]); // State for description box position

  // Function to update model and description positions based on screen size
  const updatePositions = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setModelPosition([0, -6, 1]); // Smaller screens (mobile)
      setDescriptionPosition([0, 2, 15]); // Move description for mobile
    } else if (width < 1024) {
      setModelPosition([0, -7, 1.5]); // Medium screens (tablet)
      setDescriptionPosition([4, 2, 18]); // Move description for tablet
    } else {
      setModelPosition([0, -8, 2]); // Larger screens (desktop)
      setDescriptionPosition([5, 2, 20]); // Default position for desktop
    }
  };

  // Listen for window resize
  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const handleZoomAndDetails = () => {
    setZoomIn(!zoomIn); // Toggle zoom effect
    setShowDetails(!showDetails); // Toggle details visibility
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#C7E8C2] to-[#9BC88B]/* Soft Green Gradient */ absolute w-full">
      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <ambientLight intensity={3.5} />
        <pointLight position={[10, 10, 10]} />
        <Model position={modelPosition} />
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
          <Html position={descriptionPosition} center>
            <div
              className={`p-4 bg-white/60 rounded-lg text-center shadow-md backdrop-blur-md w-96 transition-all duration-500 ${
                showDetails ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="mt-2 text-gray-600">
                <h2 className="text-xl font-bold text-black">
                  Dandelion (Taraxacum officinale)
                </h2>
                <p className="mb-4">
                  Dandelion (Taraxacum officinale) is a flowering plant from the
                  Asteraceae family, commonly regarded as a weed but known for
                  its medicinal properties. Used in traditional herbal medicine
                  for centuries, every part of the dandelion plant—from the
                  roots to the leaves and flowers—has potential health benefits.
                  Today, it is prized for its detoxifying properties,
                  particularly for liver health and digestive support.
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Liver health:</span>{" "}
                    Dandelion may help support liver function and promote
                    detoxification.
                  </p>
                  <p>
                    <span className="font-semibold">Digestive aid:</span>{" "}
                    Dandelion may improve digestion by stimulating the
                    production of stomach acid and bile.
                  </p>
                  <p>
                    <span className="font-semibold">Diuretic properties:</span>{" "}
                    Dandelion may act as a natural diuretic, helping the body
                    eliminate excess fluids.
                  </p>
                  <p>
                    <span className="font-semibold">Antioxidant effects:</span>{" "}
                    Dandelion is rich in antioxidants, which help protect the
                    body from oxidative stress and cellular damage.
                  </p>
                  <p>
                    <span className="font-semibold">Blood sugar control:</span>{" "}
                    Dandelion may help regulate blood sugar levels and improve
                    insulin sensitivity.
                  </p>
                  <p>
                    <span className="font-semibold">
                      Anti-inflammatory properties:
                    </span>
                    Dandelion may help reduce inflammation and support overall
                    immune health.
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