import React, { createContext, useContext, useState } from "react";

const rowContext = createContext();
const popupcontext = createContext();
export const stateContext=createContext();

export const ContextProvider = (props) => {
  
  const [rows, setRows] = useState([]);
  const [popUpActive, setPopupActive] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  return (
    <stateContext.Provider value={[rows, setRows,rowSelectionModel, setRowSelectionModel ]}>
     {props.children}
    </stateContext.Provider>
  );
};

// export const useStateContext = useContext(stateContext);
// export const usePopUpContext = useContext(popupcontext);
