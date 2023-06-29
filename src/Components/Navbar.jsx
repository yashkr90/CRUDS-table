import { Button, TextField } from "@mui/material";
import { useState, useContext } from "react";
import Addata from "./Addata";
import { stateContext } from "../Context/context";
import { addRow, sendEmail } from "../service/api";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Stack from "@mui/material/Stack";
import "./Navbar.css";
import { Plus } from "react-bootstrap-icons";
import SendIcon from "@mui/icons-material/Send";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import LoopIcon from "@mui/icons-material/Loop";

const Navbar = () => {
  const [rows, setRows, rowSelectionModel, setRowSelectionModel] =
    useContext(stateContext);
  const [loadingData, setLoadingData] = useState(false);

  const [email, setEmail] = useState("");
  // const [isadddata,setIsaddData]=useState(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark py-3 navBar">
        <div className="container-fluid navBarinner ">
          <a className="navbar-brand">CRUDS</a>
          <div className="buttonouter">
            <Stack spacing={3} direction="row">
              <TextField
                sx={{
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "white" },
                  },
                  input: {
                    color: "white",
                  },
                }}
                id="standard-basic"
                label="email"
                variant="outlined"
                color="success"
                name="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Popup
                className="popup-overlay ml-2 mr-3"
                trigger={
                  <Button
                    variant="contained"
                    color="success"
                    className="mr-5 ml-5"
                  >
                    <Plus size={20} />
                    ADD NEW
                  </Button>
                }
                modal
              >
                {(closeit) => (
                  <div>
                    <div>
                      <Addata closeit={closeit} />
                    </div>
                  </div>
                )}
              </Popup>
              <Button
                className="sendbtn"
                variant="contained"
                color="success"
                onClick={async (event) => {
                  setLoadingData(true);
                  console.log(email);
                  const idandmail={mail:email,rowSelectionModel}
                  console.log(idandmail);
                  const msg = await sendEmail(idandmail);
                  setLoadingData(false);
                  alert(msg);

                  // addRow(event);
                }}
              >
                {!loadingData ? (
                  <>
                    Send <SendSharpIcon size={20} />
                  </>
                ) : (
                  <LoopIcon
                    size={20}
                    sx={{
                      animation: "spin 2s linear infinite",
                      "@keyframes spin": {
                        "0%": {
                          transform: "rotate(360deg)",
                        },
                        "100%": {
                          transform: "rotate(0deg)",
                        },
                      },
                    }}
                  />
                )}
                {/* Send <SendSharpIcon size={20} /> */}
              </Button>
            </Stack>
          </div>
        </div>
      </nav>

      {/* <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup> */}
      {/* {popUpActive ? <PopUp tasktype="Add" task={addRow} /> : ""} */}
    </>
  );
};

export default Navbar;
