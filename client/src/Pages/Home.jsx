import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import plant from "../Animation/plant.json";
import SearchBar from "../Components/SearchBar";

// Importing images
import chirpine from "../Images/chirpine.jpg";
import datepalm from "../Images/datepalm.jpg";
import ferngrass from "../Images/ferngrass.jpg";
import aloevera from "../Images/aloevera.jpg";
import neem from "../Images/neem.jpg";
import lupine from "../Images/lupine.jpg";
import rosemary from "../Images/rosemary.jpg";
import basil from "../Images/basil.jpg";
import thyme from "../Images/thyme.jpg";
import lavender from "../Images/lavender.jpg";
import echinacea from "../Images/Echinacea.jpg";
import dandelion from "../Images/dandelion.jpg";
import ginseng from "../Images/Ginseng.jpg"
import garlic from "../Images/garlic.jpg"
import ginger from "../Images/ginger.jpg"
import Chatbot from "../Components/Chatbot";
import CustomButton from "../Components/CustomButton";


// Transparent Frame component with pretty styling
const Frame = ({ imageUrl, link, label }) => (
  <div className="text-center">
    <div className="p-2 rounded-lg  drop-shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div className="border-2 border-gray-200 bg-white bg-opacity-10 rounded-none backdrop-filter backdrop-blur-lg shadow-md hover:shadow-lg hover:backdrop-blur-xl transition-all duration-300">
        <img
          src={imageUrl}
          alt={label}
          className="w-full h-48 object-cover rounded-none mb-2"
        />
        <Link to={link}>
          <button className="w-full bg-transparent border-t-2 border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-slate-50 transition-all duration-300 py-2">
            {label}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      {/* Background Lottie Animation */}
      <div className="absolute top-0 right-0 w-full h-full z-0 opacity-50">
        <Lottie animationData={plant} className="w-full h-full object-cover" />
      </div>

      {/* Search Bar */}
      <div className="relative z-10 flex justify-center w-full py-4 px-4 sm:px-10 md:px-20 lg:px-36">
        <SearchBar />
      </div>
      
  

      {/* Grid Layout for Frames */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10 sm:p-14 justify-items-center text-2xl sm:text-3xl font-thin">
        <Frame imageUrl={chirpine} link="/chirpine" label="Chir Pine" />
        <Frame imageUrl={datepalm} link="/datepalm" label="Date Palm" />
        <Frame imageUrl={ferngrass} link="/ferngrass" label="Fern Grass" />
        <Frame imageUrl={aloevera} link="/aloevera" label="Aloe Vera" />
        <Frame imageUrl={neem} link="/neem" label="Neem" />
        <Frame imageUrl={lupine} link="/lupine" label="Lupine" />
        <Frame imageUrl={rosemary} link="/rosemary" label="Rosemary" />
        <Frame imageUrl={basil} link="/basil" label="Basil" />
        <Frame imageUrl={thyme} link="/thyme" label="Thyme" />
        <Frame imageUrl={lavender} link="/lavender" label="Lavender" />
        <Frame imageUrl={echinacea} link="/echinacea" label="Echinacea" />
        <Frame imageUrl={dandelion} link="/dandelion" label="Dandelion" />
        <Frame imageUrl={ginseng} link="/ginseng" label="Ginseng" />
        <Frame imageUrl={ginger} link="/ginger" label="Ginger" />
        <Frame imageUrl={garlic} link="/garlic" label="Garlic" />
        
      </div>
      <div>
        <Chatbot/>
      </div>
      <div>
        <CustomButton/>
      </div>
    </>
  );
};

export default Home;
