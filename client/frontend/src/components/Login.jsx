import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import MyButton from "./MyButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  flexDirection: "column",
  boxShadow: 24,
  backgroundColor: "#606060",
  padding: 0,
  borderRadius: 3,
};

const loginStyle = {
  position: "absolute",
  margin: "1%",
  top: "0%",
  right: "0%",
};

const homeStyle = {
  position: "absolute",
  margin: "1%",
  top: "0%",
  left: "0%",
};

export default function Login() {
  const { setPage, setAuth } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clickHandler = (e) => {
    setAuth(e);
    setPage(e);
    handleClose();
  };

  return (
    <div>
      <Button
        sx={loginStyle}
        startIcon={<Avatar src="log.png" />}
        onClick={handleOpen}
      />
      <Button
        sx={homeStyle}
        startIcon={<Avatar src="home.png" />}
        onClick={() => {
          setPage("home");
          handleClose();
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <MyButton
            label="producer"
            clickHandler={() => {
              clickHandler("producer");
            }}
          />
          <MyButton
            label="supplier"
            clickHandler={() => {
              clickHandler("supplier");
            }}
          />
          <MyButton
            label="wholesaler"
            clickHandler={() => {
              clickHandler("wholesaler");
            }}
          />
          <MyButton
            label="retailer"
            clickHandler={() => {
              clickHandler("retailer");
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
