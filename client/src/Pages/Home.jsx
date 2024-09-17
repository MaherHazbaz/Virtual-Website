import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import plant from "../Animation/plant.json";

const Home = () => {
  return (
    <>
      <div className="absolute top-0 right-0 w-full h-full z-0 opacity-50">
        <Lottie animationData={plant} className="w-full h-full" />
      </div>
      <div className="relative z-10 grid grid-flow-col sm:grid-cols-1 md:grid-cols-2 p-14 justify-items-center text-3xl font-thin">
        <div>
          <Link to={"/demo"}>
            <button className="bg-transparent border-b-2 border-gray-400 hover:border-gray-600 transition-all duration-300">
              Chir Pine
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/datepalm"}>
            <button className="bg-transparent border-b-2 border-gray-400 hover:border-gray-600 transition-all duration-300">
              DatePalm
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
