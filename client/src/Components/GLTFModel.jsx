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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 via-purple-200 to-blue-300">
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
              <h2 className="text-xl font-bold text-black">
                Chir Pine (Pinus roxburghii)
              </h2>
              <p className="mt-2 text-gray-600">
                The Chir Pine, Pinus roxburghii, named after William Roxburgh,
                is a pine native to the Himalaya. Pinus roxburghii Sarg.
                (Pinaceae) is traditionally used for several medicinal purposes
                in India. As the oil of the plant is extensively used in a
                number of herbal preparations for curing inflammatory disorders,
                the present study was undertaken to assess analgesic and
                anti-inflammatory activities of its bark extract.
                <br />
                <br />
                Dried and crushed leaves of Pinus roxburghii Sarg. were defatted
                with petroleum ether and then extracted with alcohol. The
                alcoholic extract at the doses of 100 mg/kg, 300 mg/kg, and
                500 mg/kg body weight was subjected to evaluation of analgesic
                and anti-inflammatory activities in experimental animal models.
                Analgesic activity was evaluated by acetic acid-induced writhing
                and tail immersion tests in Swiss albino mice; acute and chronic
                anti-inflammatory activity was evaluated by carrageenan-induced
                paw oedema and cotton pellet granuloma in Wistar albino rats.
                <br />
                <br />
                Diclofenac sodium and indomethacin were employed as reference
                drugs for analgesic and anti-inflammatory studies, respectively.
                In the present study, the alcoholic bark extract of Pinus
                roxburghii Sarg. demonstrated significant analgesic and
                anti-inflammatory activities in the tested models.
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
      ? new Vector3(0, 2, 5)
      : new Vector3(20, 2, 18);
    camera.position.lerp(targetPosition, 0.05); // Smoothly interpolate to target position
    camera.lookAt(0, 2, 0); // Focus on the model
  });
  return null;
};

export default GLTFModel;
