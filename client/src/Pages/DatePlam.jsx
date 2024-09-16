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
const GLTFModel = () => {
  const [zoomIn, setZoomIn] = useState(false); // State for zoom effect
  const [showDetails, setShowDetails] = useState(false); // State for showing details

  const handleZoomAndDetails = () => {
    setZoomIn(!zoomIn); // Toggle zoom effect
    setShowDetails(!showDetails); // Toggle details visibility
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 via-purple-200 to-blue-300 absolute w-full">
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
              <h2 className="text-xl font-bold text-black">
                Date Palm ( Phoenix Dactylifera)
              </h2>
              <p className="mt-2 text-gray-600">
                Phoenix dactylifera, commonly known as the date palm, is a
                flowering-plant species in the palm family, Arecaceae,
                cultivated for its edible sweet fruit called dates. The species
                is widely cultivated across northern Africa, the Middle East,
                the Horn of Africa, Australia, South Asia, and California. It is
                naturalized in many tropical and subtropical regions worldwide.
                P.dactylifera is the type species of genus Phoenix, which
                contains 12–19 species of wild date palms.
                <br />
                <br />
                Antioxidants are chemicals/materials that interact and
                deactivate the free radicals, therefore preventing them from
                causing harm. The prevention of actions of free radical is
                important step in the management of disease. Medicinal plants
                and their constituents play a vital and significant action to
                neutralize or inhibit the free radical by the use of antioxidant
                activity. Experimental studies support the role of reactive
                oxygen species in cancer and dietary antioxidants as well as
                endogenous antioxidants shows a vital role as cancer preventive
                agents via neutralization of reactive oxygen species. Another
                study also showed that plant phenolic compounds including
                flavonoids are effective antioxidants with reported
                anti-mutagenic and anti-carcinogenic effects.
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
      : new Vector3(20,2, 18);
    camera.position.lerp(targetPosition, 0.02); // Smoothly interpolate to target position
    camera.lookAt(0, 2, 0); // Focus on the model
  });
  return null;
};

export default GLTFModel;
