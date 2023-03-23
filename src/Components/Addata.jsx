import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
} from "@mui/material";
import { stateContext } from "../Context/context";
import "./popup.css";
import { addRow } from "../service/api.js";
import { useFormik } from "formik";
import * as yup from "yup";
import Stack from '@mui/material/Stack';

const validationSchema = yup.object({
  name: yup
    .string()
    .max(15, "Name should be less than 15 character")
    .required("Enter your name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .number("Enter valid number")
    .required("Enter your number")
    .positive()
    .integer(),
  hobbies: yup.string().required("Enter your hobby"),
});

const Addata = (props) => {
  const [rows, setRows, popUpActive, setPopupActive] = useContext(stateContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      hobbies: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   alert(JSON.stringify(values));
      console.log(values);

      const newrow = await addRow(values);
      setRows((prevdata) => {
        const datas= [...prevdata, newrow];
        return datas.map((data,idx)=>{
          return {...data,slno:idx+1};
        })
      });
      props.closeit();
    },
  });

  return (
    <div>
      <div className="popup">
        <div className="closePopup" onClick={props.closeit}>
          X
        </div>
        <div className="content">
          {/* {console.log("tasktype", props.tasktype)} */}
          <h3>Add Data</h3>
          <form onSubmit={formik.handleSubmit} className="forms">
          <Stack spacing={3} direction="column">
            <TextField
              id="standard-basic"
              label="Name"
              variant="filled"
              color="secondary" 
              name="name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
            />
            <TextField
              id="standard-basic"
              label="Mobile"
              variant="filled"
              color="secondary" 
              name="phone"
              type="number"
              required
              //   onChange={onValueChange}
              //   value={newData.phone.value}
              //   error={newData.phone.error}
              //   helperText={newData.phone.error && newData.phone.errorMessage}
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onBlur={formik.handleBlur}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="filled"
              color="secondary" 
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              // onChange={onValueChange}
              // value={newData.email.value}
              required
              // error={newData.email.error}
              // helperText={newData.email.error && newData.email.errorMessage}
            />
            <TextField
              id="standard-multiline-static"
              label="Hobbies"
              variant="filled"
              color="secondary"
              multiline
              rows={2}
              name="hobbies"
              required
              //   onChange={onValueChange}
              //   value={newData.hobbies.value}
              //   error={newData.hobbies.error}
              //   helperText={newData.hobbies.error && newData.hobbies.errorMessage}
              value={formik.values.hobbies}
              onChange={formik.handleChange}
              error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
              helperText={formik.touched.hobbies && formik.errors.hobbies}
              onBlur={formik.handleBlur}
            />

            <Button variant="contained" color="success" type="submit">
              Create Data
            </Button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addata;
