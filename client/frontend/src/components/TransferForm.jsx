import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import axios from "../api/axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const style = {
  display: "flex",
  flexDirection: "column",
  width: 400,
  p: 4,
};

export default function CreateForm() {
  const { auth } = useContext(AuthContext);
  const [productId, setProductID] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("/transferProduct", {
        role: auth,
        productId,
        newOwner,
      })
      .then(function (response) {
        setLoading(false);
        setNewOwner("");
        setProductID("");
        alert(response.data.message);
      })
      .catch(function (error) {
        setLoading(false);
        setNewOwner("");
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
        <FormControl fullWidth>
          <InputLabel sx={{ m: 1 }} id="demo-simple-select-label">
            New Owner
          </InputLabel>
          <Select
            sx={{ m: 1 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newOwner}
            label="New Owner"
            onChange={(e) => {
              setNewOwner(e.target.value);
            }}
          >
            <MenuItem value={"producer-tnt-com"}>Supplier</MenuItem>
            <MenuItem value={"supplier-tnt-com"}>Supplier</MenuItem>
            <MenuItem value={"wholesaler-tnt-com"}>Wholesaler</MenuItem>
            <MenuItem value={"retailer-tnt-com"}>Retailer</MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={{ m: 1 }}
          disabled={loading}
          type="submit"
          variant="contained"
        >
          Transfer {loading && <CircularProgress />} Product
        </Button>
      </FormControl>
    </form>
  );
}
