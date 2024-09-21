import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Vector3 } from "three";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/lavender/lavender.gltf");
  return <primitive object={scene} scale={15} position={[-10, -8, 0]} />;
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
        <ambientLight intensity={1.5} />
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
                  Lavender (Lavandula){" "}
                </h2>{" "}
                <p className="mb-4">
                  {" "}
                  Lavender (Lavandula) is a popular herb from the Lamiaceae
                  family, known for its calming aroma and beautiful purple
                  flowers. Originating from the Mediterranean region, lavender
                  has been used for centuries in both culinary and medicinal
                  practices. The herb is renowned for its essential oils,
                  particularly linalool and linalyl acetate, which contribute to
                  its relaxing and soothing properties.
                </p>{" "}
                <div className="space-y-2">
                  {" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Stress relief:</span>{" "}
                    Lavender may help reduce stress and anxiety, promoting a
                    sense of calm.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Improved sleep quality:
                    </span>{" "}
                    Lavender is often used to enhance sleep quality and address
                    insomnia.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Antioxidant properties:
                    </span>{" "}
                    Lavender contains antioxidants that help protect cells from
                    oxidative damage.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Anti-inflammatory effects:
                    </span>{" "}
                    Lavender may help reduce inflammation and alleviate related
                    discomfort.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Skin health:</span>{" "}
                    Lavender's antimicrobial and anti-inflammatory properties
                    may aid in treating acne and soothing minor skin
                    irritations.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">
                      Digestive health:
                    </span>{" "}
                    Lavender may help relieve symptoms of indigestion and
                    nausea.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <span className="font-semibold">Hair health:</span> Lavender
                    is sometimes used to promote hair growth and reduce
                    dandruff.{" "}
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
