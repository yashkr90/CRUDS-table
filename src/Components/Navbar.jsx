import Button from "@mui/material/Button";
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
import LoopIcon from '@mui/icons-material/Loop';

const Navbar = () => {
  const [rows, setRows, rowSelectionModel, setRowSelectionModel] =
    useContext(stateContext);
  const [loadingData, setLoadingData] = useState(false);
  const [isadddata, setIsaddData] = useState(false);
  // const [isadddata,setIsaddData]=useState(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark py-3 navBar">
        <div className="container-fluid navBarinner ">
          <a className="navbar-brand">CRUDS</a>
          <div className="buttonouter">
            <Stack spacing={3} direction="row">
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
                  const msg = await sendEmail(rowSelectionModel);
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
