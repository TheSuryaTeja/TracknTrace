import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import axios from "../api/axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  display: "flex",
  flexDirection: "column",
  width: 400,
  p: 4,
};

export default function CreateOrder() {
  const { auth } = useContext(AuthContext);
  const [orderId, setOrderId] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [dom, setDom] = useState("");
  const [producerName, setProducerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("/createOrder", {
        role: auth,
        orderId,
        productType,
        productName,
        dom,
        producerName,
      })
      .then(function (response) {
        setLoading(false);
        setDom("");
        setProducerName("");
        setOrderId("");
        setProductName("");
        setProductType("");
        alert(response.data.message);
      })
      .catch(function (error) {
        setLoading(false);
        setDom("");
        setProducerName("");
        setOrderId("");
        setProductName("");
        setProductType("");
        console.log(error.response.data.message);
        alert(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={style}>
        <TextField
          sx={{ m: 1 }}
          required
          id="outlined-required"
          type="number"
          value={orderId}
          label="Order ID"
          onChange={(e) => {
            setOrderId(e.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          required
          id="outlined-required"
          label="Product Name"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          required
          id="outlined-required"
          label="Product Type"
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          required
          id="outlined-required"
          value={dom}
          label="Date of Manufacturing"
          onChange={(e) => {
            setDom(e.target.value);
          }}
        />

        <TextField
          sx={{ m: 1 }}
          required
          id="outlined-required"
          label="Producer Name"
          value={producerName}
          onChange={(e) => {
            setProducerName(e.target.value);
          }}
        />
        <Button
          sx={{ m: 1 }}
          disabled={loading}
          type="submit"
          variant="contained"
        >
          Create {loading && <CircularProgress />} Order
        </Button>
      </FormControl>
    </form>
  );
}
