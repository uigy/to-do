import React, { useState } from "react";
import { useLists } from "../../../context/ListsContext";
import "./AddListItem.scss";
import { v4 as uuidv4 } from "uuid";

const AddListItem = () => {
  const { lists, setLists, setActiveList } = useLists();
  const [inputValue, setInputValue] = useState("");

  let id = "";

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.length > 0) {
      addList(inputValue);
      setInputValue("");
      setActiveList(id);
    }
  };

  const addList = (title) => {
    id = uuidv4();
    const list = { id, title, tasks: [] };
    setLists([...lists, list]);
  };

  return (
    <div className="add-list">
      <span className="add-list-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="add-icon"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </span>
      <input
        type="text"
        name="add-list-input"
        className="add-list-input"
        id="add-list-input"
        placeholder="New list"
        autoComplete="off"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export default AddListItem;
