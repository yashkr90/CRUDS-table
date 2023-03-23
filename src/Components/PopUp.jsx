import React,{useContext, useState} from "react";
import {
    FormControl,
    FormGroup,
    InputLabel,
    Input,
    styled,
    Typography,
    Button,
    TextField,
  } from "@mui/material";
  import { stateContext } from '../Context/context';
  import "./popup.css";

const PopUp = (props) => {
  const [rows, setRows,popUpActive, setPopupActive]=useContext(stateContext);
const[newData,setNewData]=useState({
  name:"",
  phone:"",
  email:"",
  hobbies:""
})
    const onValueChange = (e) => {
        // we are using "...task" so that new parameter gets append into it
        // var settingTask = { ...task, [e.target.name]: e.target.value };
        // props.setNewTodo((prevdata) => {
        //   return { ...prevdata, [e.target.name]: e.target.value };
        // });
        console.log(e);
      };

  return (
    <div>
      
      <div className="popup">
        <div className="closePopup" onClick={() => setPopupActive(false)}>
          X
        </div>
        <div className="content">
          {/* {console.log("tasktype", props.tasktype)} */}
          <h3>{props.tasktype} Data</h3>

          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            onChange={onValueChange}
            value={newData.name}
          />
          <TextField
            id="standard-basic"
            label="Mobile"
            variant="standard"
            name="phone"
            onChange={onValueChange}
            value={newTodo.phone}
          />
          <TextField
            id="standard-basic"
            label="ICON url"
            variant="standard"
            name="icon"
            onChange={onValueChange}
            // value={props.newTodo.icon}
          />
          <TextField
            id="standard-multiline-static"
            label="Note"
            multiline
            rows={2}
            name="note"
            onChange={onValueChange}
            // value={props.newTodo.note}
            variant="standard"
          />
          {/* <input type="text" className="add-todo-input"
           onChange={e => setNewTodo(e.target.value)}
            value={newTodo} 
            /> */}
          <Button
            variant="contained"
            color="success"
            onClick={props.task}
          >
            {props.tasktype} Data
          </Button>
          {/* <div className="button" onClick={addTodo}>Create Task</div> */}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
