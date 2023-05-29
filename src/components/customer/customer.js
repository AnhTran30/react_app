import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CreateCustomerAsync,
  getCustomerAsync,
} from "../../service/customer-service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const handleSave = (data) => {
    setLoading(true);
    CreateCustomerAsync(data)
      .then(() => {
        const models = [
          ...customers,
          {
            fullName: data.fullName,
            email: data.email,
            dayOfBirth: data.dayOfBirth,
          },
        ];
        setCustomers(models);
        handleClearData();
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);

    getCustomerAsync()
      .then((result) => {
        setCustomers(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClearData = () => {
    setValue("fullName", "");
    setValue("email", "");
    setValue("dayOfBirth", "");
  };

  return (
    <>
      <h1>Customer</h1>
      <Box component="form" onSubmit={handleSubmit(handleSave)}>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <b>Full name</b>
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState?.error?.message}
                  helperText={fieldState?.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <b>Email</b>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState?.error?.message}
                  helperText={fieldState?.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <b>Day Of Birth</b>
            <Controller
              control={control}
              name="dayOfBirth"
              render={({ field, fieldState }) => (
                <TextField
                  type="date"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState?.error?.message}
                  helperText={fieldState?.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="success"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Day Of Birth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((row) => (
                <TableRow
                  key={`${row.customerId}_${row.productId}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{row.fullName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.dayOfBirth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Backdrop sx={{ color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Customers;
