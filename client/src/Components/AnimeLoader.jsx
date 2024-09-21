import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loading from "../Animation/loading.json";

const AnimeLoader = ({ isModelLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading process or listen for the model load completion
  useEffect(() => {
    if (isModelLoaded) {
      setIsLoading(false); // Hide loader when the model is loaded
    }
  }, [isModelLoaded]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white/50 backdrop-blur-sm z-50">
          <div className="anime-loader-container">
            <Lottie
              animationData={loading}
              style={{ height: "300px", width: "300px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AnimeLoader;
