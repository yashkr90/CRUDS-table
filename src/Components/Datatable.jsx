import * as React from "react";
import { useEffect, useState, useContext } from "react";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
// import { GridApi } from '@mui/x-data-grid';
import { getRenderableIndexes } from "@mui/x-data-grid/internals";
import { stateContext } from "../Context/context";
import { getDatas, deleteData } from "../service/api.js";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Editdata from "./Editdata";
import "./Datatable.css";
// import { Box, withStyles } from "@material-ui/core";
// import {Deletedata} from "./Deletedata"

import { PencilSquare, Trash } from "react-bootstrap-icons";

// const StyledDataGrid = withStyles({
//   root: {
//     "& .MuiDataGrid-row": {
//       minHeight: "100px !important",
//       // maxHeight: "none !important"
//     },
//   },
// })(DataGrid);

export default function DataTable() {
  const [rows, setRows, rowSelectionModel, setRowSelectionModel] =
    useContext(stateContext);

  useEffect(() => {
    const getrows = async () => {
      const datas = await getDatas();
      console.log("dats is", datas);
      setRows(() =>
        datas.map((data, idx) => {
          return { slno: idx + 1, ...data };
        })
      );
    };

    getrows();
  }, []);

  const handleDelete = async (cellValues) => {
    console.log(cellValues);
    const deleteddata = await deleteData(cellValues.row._id);
    console.log("deleted row is", deleteddata);
    setRows((rows) => {
      const datas = rows.filter((row) => {
        if (row._id !== deleteddata._id) {
          return row;
        }
      });
      return datas.map((data, idx) => {
        console.log(data);
        return { ...data, slno: idx + 1 };
      });
    });
  };
  // const apiRef = useGridApiRef();
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },

  const columns = [
    {
      field: "slno",
      headerName: "ID",
      width: 70,
    },
    { field: "name", headerName: "Name", width: 150 ,},
    { field: "phone", headerName: "Phone number", width: 150,  },
    {
      field: "email",
      headerName: "Email",

      width: 190,
    },
    {
      field: "hobbies",
      headerName: "Hobbies",
      width: 220,
    },
    {
      field: "Actions",
      renderCell: (cellValues) => {
        return (
          <div className="actions d-flex">
            <Popup
              className="popup-overlay"
              trigger={
                <IconButton
                  aria-label="update"
                  size="large"
                  className="edit-data"
                >
                  <PencilSquare size={20} />
                </IconButton>
              }
              modal
            >
              {(closeit) => (
                <div>
                  <div>
                    <Editdata closeit={closeit} id={cellValues.row._id} />
                  </div>
                </div>
              )}
            </Popup>

            <IconButton
              aria-label="delete"
              size="large"
              className="delete-data"
              onClick={() => handleDelete(cellValues)}
            >
              <Trash size={20} />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid

sx={{
   height: 600, width: '100%' ,
  '.MuiDataGrid-row': { 
    minHeight: "100px !important",
    //  overflow: 'visible !important'
  }
}}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            // rowHeight={100}
            getRowHeight={() => 'auto'}

            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              console.log(newRowSelectionModel);
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            getRowId={(row) => {
              console.log(row);
              // console.log(row.code + '_' + row.type)
              return row._id;
            }}
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
}
