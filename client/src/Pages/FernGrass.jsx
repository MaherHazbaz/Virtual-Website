import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/fern_grass_01/ferngrass.gltf");
  return <primitive object={scene} scale={3} position={[0, -10, -15]} />;
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#C7E8C2] to-[#9BC88B] /* Soft Green Gradient */
 absolute w-full">
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
              <h2 className="text-xl font-bold text-black">
                Maidenhair fern( Adiantum capillus-veneris Linn)
              </h2>
              <p className="mt-2 text-gray-600">
                Adiantum capillus-veneris Linn (Maidenhair fern) is an herb
                belonging to the family Pteridaceae. It is named as
                “Pare-siavashan” in medical and pharmaceutical textbooks of
                Iranian Traditional Medicine. The fronds of Maidenhair fern were
                mainly administrated by ancient physicians as single medicine or
                in combination with other plants in multi-herbal formulations
                for curing different diseases. Because of different chemical
                compositions, the herb fronds were also assessed for its
                numerous pharmacological effects.
                <br />
                <br />
                [Central nervous system] <br />
                (Anti Alzheimer, Brain tonic) [Liquorice, Sweet Violet, Damask
                Rose, Lavender, Peony, Borage, Fennel, Celery, Marshmallow,
                Stavesacre, Assyrian Plum, Honey] Form of Medication (Syrup){" "}
                <br />
                <br />
                [Treatment of Epilepsy Mania and Headache ]<br />
                (Lavender, Liquorice, Borage, Fennel, Celery, Damask Rose,
                Stavesacre, Assyrian Plum )Form Of Medication (Syrup) <br />
                Dentistry Dental analgesic 1. Liquorice, Borage flower 2.
                Lavender, Fumitory, Jujube, Black Nightshade aromatic water 1.
                Oral decoction, Mouthwash 2. Oral, decoction (19) Dental tonic
                Frankincense, Long Aristolochi, Sweet Violet, Sandalwood Dental
                Powder .
              </p>
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
