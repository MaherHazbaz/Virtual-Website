import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [data] = useState([
    "Rosemary",
    "Basil",
    "Mint",
    "Thyme",
    "Lavender",
    "Sage",
    "Oregano",
    "Tulsi",
    "ChirPine",
    "DatePalm",
    "FernGrass",
    "demo",
    "Neem",
    "Lupine",
    "Echinacea",
    "Dandelion",
    "Aloevera",
    "Ginseng",
    "Ginger",
    "Garlic",
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredData(
      data.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleResultClick = (item) => {
    setSearchQuery(item);
    setFilteredData([]);
    const itemPath = item.toLowerCase().replace(/\s+/g, ""); // To match route paths like "datepalm", "chirpine"
    navigate(`/${itemPath}`); // Redirect to the relevant page
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Search form */}
      <form>
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearch className="text-gray-400 w-5 h-5" />
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 h-12 shadow-md focus:border-pink-100 focus:ring-pink-100 focus:outline-none dark:bg-transparent dark:text-black"
            placeholder="Search For Herbs & Plants"
            required
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      {/* Dropdown with filtered results */}
      {searchQuery && filteredData.length > 0 && (
        <div className="relative left-0 w-full bg-white shadow-lg rounded-lg z-10 mt-2">
          <ul className="list-none p-0 m-0 max-h-60 overflow-y-auto">
            {filteredData.map((item, index) => (
              <li
                key={index}
                className="text-gray-900 cursor-pointer hover:bg-gray-200 p-3 border-b border-gray-200 transition-all duration-200 ease-in-out"
                onClick={() => handleResultClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
