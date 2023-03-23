import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  TextField,
} from "@mui/material";
import { stateContext } from "../Context/context";
import "./popup.css";
import { addRow, getData, updateData } from "../service/api.js";
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
  const [initialData, setinitialData] = useState(
    {
    name: "",
    phone: "",
    email: "",
    hobbies: "",
  }
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const response = await getData(props.id);
    console.log(response);
    console.log(response.name);
    await setinitialData((prevdata)=>{
      return {...prevdata,name: response.name,
        phone: response.phone,
        email: response.email,
        hobbies: response.hobbies,}
    });
    console.log("initial data is", initialData);
  };
  const formik = useFormik({
    initialValues:initialData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
    
      console.log(values);

      console.log("new data being added");
      const updatedrow = await updateData(props.id, values);
      console.log("upadterow value received", updatedrow);

      setRows((rows) =>
        rows.map((row) => {
          if (row._id === updatedrow._id) {
            Object.assign(row, updatedrow);
          }
          // console.log("row is",row);
          return row;
        })
      );

      // setRows((prevdata) => {
      //   return [...prevdata, newrow];
      // });
      props.closeit();
    },
  });

  const [rows, setRows, popUpActive, setPopupActive] = useContext(stateContext);

  return (
    <div>
      <div className="popup">
        <div className="closePopup" onClick={props.closeit}>
          X
        </div>
        <div className="content">
          {/* {console.log("tasktype", props.tasktype)} */}
          <h3>Update Data</h3>

          <form onSubmit={formik.handleSubmit} className="forms">
            <Stack spacing={3} direction="column">
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
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
              variant="standard"
              name="phone"
              type="number"
              required
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onBlur={formik.handleBlur}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              required
            />
            <TextField
              id="standard-multiline-static"
              label="Hobbies"
              variant="standard"
              multiline
              rows={2}
              name="hobbies"
              required
              value={formik.values.hobbies}
              onChange={formik.handleChange}
              error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
              helperText={formik.touched.hobbies && formik.errors.hobbies}
              onBlur={formik.handleBlur}
            />

            <Button variant="contained" color="success" type="submit">
              Update Data
            </Button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addata;
