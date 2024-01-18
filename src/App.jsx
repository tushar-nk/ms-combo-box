import { useEffect, useRef, useState } from "react";
import arrow from "./assets/down-arrow.png";

import "./App.css";

function App() {
  const options = [
    { name: "Apple", icon: "🍎" },
    { name: "Banana", icon: "🍌" },
    { name: "Orange", icon: "🍊" },
    { name: "Grapes", icon: "🍇" },
    { name: "Strawberry", icon: "🍓" },
  ];

  const inputRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState({ name: "", icon: "" });

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    if (option) {
      // inputRef?.current?.focus();
      setSelectedOption(option);
      setIsOpen(false);
      setSearchTerm("");
    } else {
      setIsOpen(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSelectedOption({ name: "", icon: "" });
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  return (
    <>
      <div ref={inputRef}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm ? searchTerm : selectedOption.name}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}
            onAuxClick={() => setIsOpen(false)}
          />
          <div className="arrow-icon" onClick={toggleOptions}>
            <img
              src={arrow}
              style={{
                transform: isOpen ? "rotate(180deg)" : "",
                transition: "0.3s ease-in-out",
              }}
            />
          </div>
        </div>
        {isOpen && (
          <div className="options-container">
            {filteredOptions.map((option, index) => (
              <div
                className="option"
                key={index}
                onClick={() => selectOption(option)}
              >
                {option.icon}
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
