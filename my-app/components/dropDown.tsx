import React, { useState } from "react";

const Dropdown = () => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={selectedOption}
        placeholder="Select an option"
        readOnly
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => selectOption(option)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
