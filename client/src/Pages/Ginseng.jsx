import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/ginseng/ginseng.gltf");
  return <primitive object={scene} scale={3} position={[-5, -10, 2]} />;
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
                  Ginseng or Ashwagandha (Withania somnifera)
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  Ginseng is a slow-growing perennial plant from the Araliaceae
                  family, renowned for its medicinal properties in traditional
                  herbal practices, especially in Asia. Native to both Asia and
                  North America, ginseng has been used for centuries in natural
                  remedies, particularly for its adaptogenic qualities.
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    <span className="font-semibold">Stress relief:</span>{" "}
                    Ginseng is widely known as an adaptogen, helping the body
                    cope with physical and emotional stress.
                  </p>
                  <p>
                    <span className="font-semibold">
                      Cognitive enhancement:
                    </span>{" "}
                    Ginseng may improve brain functions such as memory, focus,
                    and mental clarity.
                  </p>
                  <p>
                    <span className="font-semibold">
                      Anti-inflammatory properties:
                    </span>{" "}
                    Ginseng has natural anti-inflammatory effects, which may
                    help reduce inflammation linked to chronic diseases.
                  </p>
                  <p>
                    <span className="font-semibold">
                      Immune system support:
                    </span>{" "}
                    Ginseng is believed to boost the immune system, increasing
                    resistance to illnesses and infections.
                  </p>
                  <p>
                    <span className="font-semibold">
                      Blood sugar regulation:
                    </span>{" "}
                    Some studies suggest that ginseng may help improve insulin
                    sensitivity and regulate blood sugar levels in individuals .
                  </p>
                  <p>
                    <span className="font-semibold">
                      Sexual health and libido:
                    </span>{" "}
                    Ginseng has traditionally been used to improve sexual
                    function and libido in both men and women.
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
