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

export default function ReadForm() {
  const { auth } = useContext(AuthContext);
  const [productId, setProductID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("/readProduct", {
        role: auth,
        productId,
      })
      .then(function (response) {
        setLoading(false);
        setProductID("");
        alert(response.data.message);
      })
      .catch(function (error) {
        setLoading(false);
        setProductID("");
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
          value={productId}
          label="Product ID"
          onChange={(e) => {
            setProductID(e.target.value);
          }}
        />
        <Button
          sx={{ m: 1 }}
          disabled={loading}
          type="submit"
          variant="contained"
        >
          Read {loading && <CircularProgress />} Product
        </Button>
      </FormControl>
    </form>
  );
}
