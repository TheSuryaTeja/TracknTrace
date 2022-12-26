import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../api/axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("/queryAllProducts")
      .then(function (response) {
        let temp = JSON.parse(response.data.message);
        let temp2 = temp.map((e) => e.Record);
        setData(temp2);
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <TableContainer sx={{ width: "90vw" }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {data.length > 0 &&
                  Object.keys(data[0]).map((e) => (
                    <StyledTableCell key={e}>{e}</StyledTableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 &&
                data.map((row) => (
                  <StyledTableRow
                    key={row.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>{row.assetType}</StyledTableCell>
                    <StyledTableCell>{row.dom}</StyledTableCell>
                    <StyledTableCell>{row.owner}</StyledTableCell>
                    <StyledTableCell>{row.producerName}</StyledTableCell>
                    <StyledTableCell>{row.productId}</StyledTableCell>
                    <StyledTableCell>{row.productName}</StyledTableCell>
                    <StyledTableCell>{row.productType}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "No Products added :("
      )}
    </>
  );
}
