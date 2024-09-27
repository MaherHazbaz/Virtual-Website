import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import image1 from "../Images/aloevera.jpg";
import image2 from "../Images/basil.jpg";
import image3 from "../Images/chirpine.jpg";
import image4 from "../Images/datepalm.jpg";
import image5 from "../Images/dandelion.jpg";
import image6 from "../Images/Echinacea.jpg";
import image7 from "../Images/ferngrass.jpg";
import image8 from "../Images/ginger.jpg";
import image9 from "../Images/lavender.jpg";
import image10 from "../Images/lupine.jpg";
import image11 from "../Images/garlic.jpg";

const HoverImageButton = ({ images }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track the hovered image index

  const handleImageClick = (image) => {
    navigate("/new-page"); // Navigate to a new page
  };

  const centerIndex = Math.floor(images.length / 2); // Center index

  return (
    <div className="flex justify-center space-x-[-60px] relative p-10  rounded-md mx-auto container">
      {images.map((image, index) => {
        // Calculate scale based on distance from the center index
        const scale = 1 - Math.abs(centerIndex - index) * 0.1; // Adjust scaling factor if needed
        const isCenterImage = index === centerIndex; // Check if the current index is the center index

        // Calculate z-index
        let zIndex = 1; // Default z-index
        if (hoveredIndex === index || isCenterImage) {
          zIndex = 3; // Highest z-index for hovered and center image
        } else if (index === 6) {
          zIndex = 2; // Image 7
        } else if (index >= 7 && index <= 10) {
          zIndex = 1; // Images 8, 9, 10, and 11 will stack behind image 7
        }

        return (
          <div
            key={index}
            className={`relative w-full h-72 bg-cover bg-center rounded-none transition-transform duration-300 ease-in-out cursor-pointer`}
            style={{
              backgroundImage: `url(${image})`, // Corrected backgroundImage syntax
              transform: `scale(${hoveredIndex === index ? 1.1 : scale})`, // Apply scale based on hover and index
              zIndex: zIndex, // Set calculated z-index
            }}
            onClick={() => handleImageClick(image)} // Add click event to navigate
            onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
            onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
          >
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h3 className="text-lg font-semibold">Image Title {index + 1}</h3>
              <p className="text-sm">Description goes here...</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
   
  ];

  return (
    <div className="p-10">
      <h2 className="text-center text-4xl font-thin mb-6">To Know More</h2>
      <HoverImageButton images={images} />
    </div>
  );
}

export default App;
