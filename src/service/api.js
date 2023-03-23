import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL;

export const getDatas = async () => {
  const res = await axios.get(`${URL}/datas`);
  console.log(res);
  //   const data = await res.data;
  //   console.log(data);
  return res.data;
};

export const addRow = async (newdata) => {
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

export const getData=async(id)=>{
    const res=await axios.get(`${URL}/data/${id}`)
    console.log("res data is on edit",res.data);
    return res.data;
}

export const updateData=async(id,updatedata)=>{
    const res =await axios.put(`${URL}/data/update/${id}`,updatedata);
    return res.data;
}

export const deleteData=async(id)=>{
    const res=await axios.delete(`${URL}/data/delete/${id}`);
    console.log("delete res is",res);
    return res.data.result;
}

export const sendEmail=async(selectedrowid)=>{
    const res=await axios.post(`${URL}/sendemail`,selectedrowid);
    console.log(res.data.msg);
    return res.data.msg
}