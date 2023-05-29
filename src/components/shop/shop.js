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
import { CreateShopAsync, getShopAsync } from "../../service/shop-service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const handleSave = (data) => {
    setLoading(true);
    CreateShopAsync(data)
      .then(() => {
        const models = [
          ...shops,
          {
            name: data.name,
            location: data.location,
          },
        ];
        setShops(models);
        handleClearData();
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);

    getShopAsync()
      .then((result) => {
        setShops(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClearData = () => {
    setValue("name", "");
    setValue("location", "");
  };

  return (
    <>
      <h1>Shop</h1>
      <Box component="form" onSubmit={handleSubmit(handleSave)}>
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <b>Name</b>
            <Controller
              control={control}
              name="name"
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
          <Grid item xs={6}>
            <b>Location</b>
            <Controller
              control={control}
              name="location"
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
          <Grid item xs={12}>
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
                <TableCell>Name</TableCell>
                <TableCell align="right">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shops.map((row) => (
                <TableRow
                  key={`${row.customerId}_${row.productId}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
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

export default Shops;
