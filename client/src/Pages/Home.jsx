import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import plant from "../Animation/plant.json";

const Home = () => {
  return (
    <>
      <div className="absolute w-96 ">
        <Lottie animationData={plant} />
      </div>
      <div className="grid grid-flow-col sm:grid-cols-1 md:grid-cols-2 p-14 justify-items-center text-3xl font-thin">
        <div>
          <Link to={"/demo"}>
            <button className="">Chir Pine</button>
          </Link>
        </div>
        <div>
          <Link to={"/datepalm"}>
            <button>DatePalm</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
