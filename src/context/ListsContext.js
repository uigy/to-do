import React, { useState, useEffect, useContext, useMemo } from "react";

const ListsContext = React.createContext();

const ListsProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState("");

  async function getData() {
    try {
      const response = await fetch("./data.json");
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData().then((data) => {
      setLists(data.lists);
      if (!activeList) setActiveList(data.lists[0].id);
    });
  }, []); // use [activeList] as second argument for checking updates after every click on list

  useEffect(() => {
    // API POST
  }, [lists]);

  const value = useMemo(() => {
    return { lists, setLists, activeList, setActiveList };
  }, [lists, activeList]);

  return <ListsContext.Provider value={value} {...props} />;
};

export const useLists = () => {
  const context = useContext(ListsContext);
  if (!context)
    throw new Error("useLists can only be called inside of ListsProvider");
  return context;
};

export default ListsProvider;
