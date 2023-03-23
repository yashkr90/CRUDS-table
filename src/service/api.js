import axios from "axios";

console.log(import.meta.env);
// const URL = 'https://fine-cyan-drill-ring.cyclic.app';
// const URL = 'http://localhost:8000';
const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SERVER_URL_DEV
    : import.meta.env.VITE_SERVER_URL_PROD;
// console.log(URL);
export const getDatas = async () => {
  const res = await axios.get(`${URL}/datas`);
  console.log(res);
  //   const data = await res.data;
  //   console.log(data);
  return res.data;
};

export const addRow = async (newdata) => {
  console.log(import.meta.env);
  console.log("inseide add row");
  console.log("new data is", newdata);
  try {
    const res = await axios.post(`${URL}/data/new`, newdata);
    console.log("added data is", res);
    return res.data;
  } catch {
    ("erroe");
  }
};

export const getData = async (id) => {
  const res = await axios.get(`${URL}/data/${id}`);
  console.log("res data is on edit", res.data);
  return res.data;
};

export const updateData = async (id, updatedata) => {
  const res = await axios.put(`${URL}/data/update/${id}`, updatedata);
  return res.data;
};

export const deleteData = async (id) => {
  const res = await axios.delete(`${URL}/data/delete/${id}`);
  console.log("delete res is", res);
  return res.data.result;
};

export const sendEmail = async (selectedrowid_mail) => {
  const res = await axios.post(`${URL}/sendemail`, selectedrowid_mail);
  console.log(res.data.msg);
  return res.data.msg;
};
