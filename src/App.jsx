import { useEffect, useState } from "react";

import "./App.css";
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  useGridApiRef,
} from "@mui/x-data-grid";
// import { GridApi } from "@mui/x-data-grid";
import { getRenderableIndexes } from "@mui/x-data-grid/internals";
import DataTable from "./Components/Datatable";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Navbar from "./Components/Navbar";
import { getDatas } from "./service/api.js";
import { ContextProvider } from "./Context/context";



function App() {
  // useEffect(() => {
  //   const getrows = async () => {
  //     const datas = await getDatas();
  //     console.log("dats is", datas);
  //     setRows(datas);
  //   };

  //   getrows();
  // }, []);

  // [
  //   { name: "Snow", number: 35, email: "gjh@hk", hobbies: "yufdgyufgy" },
  //   { name: "Lannister", number: 42, email: "gjh@hk", hobbies: "gkdsjbfkas" },
  //   { name: "Lannister", number: 45, email: "gjh@hk", hobbies: "jsfuka" },
  // ]
 

  return (
    <ContextProvider>
    <>
      
        <Navbar />
        <DataTable 
        // rows={rows} 
        // columns={columns}
         />
      
    </>
    </ContextProvider>
  );
}

export default App;
