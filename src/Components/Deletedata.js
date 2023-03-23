import {useContext} from "react";
import { deleteData } from "../service/api.js";
import { stateContext } from "../Context/context";

export const Deletedata=async(cellValues)=>{
    const [rows, setRows, popUpActive, setPopupActive] = useContext(stateContext);

    console.log(cellValues);
    const deleteddata = await deleteData(cellValues.row._id);

    console.log("deleted row is", deleteData);
    setRows((rows) =>
      rows.filter((row) => {
        if (row._id !== deleteddata._id) {
          return row;
        }
        // console.log("row is",row);
      })
    );
}