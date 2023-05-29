import { Backdrop, CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { getOrdertAsync } from "../../service/order-service";

const Orders = () => {
  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getOrdertAsync()
      .then((result) => {
        setOrders(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>My Orders</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell align="right">Customer Email</TableCell>
              <TableCell align="right">Shop Name</TableCell>
              <TableCell align="right">Shop Location</TableCell>
              <TableCell align="right">Production Name</TableCell>
              <TableCell align="right">Production Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Orders.map((row) => (
              <TableRow
                key={`${row.customerId}_${row.productId}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">{row.customerName}</TableCell>
                <TableCell align="right">{row.customerEmail}</TableCell>
                <TableCell align="right">{row.shopName}</TableCell>
                <TableCell align="right">{row.shopLocation}</TableCell>
                <TableCell align="right">{row.productName}</TableCell>
                <TableCell align="right">{row.productPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Backdrop sx={{ color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Orders;
