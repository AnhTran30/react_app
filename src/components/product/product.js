import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateProductAsync } from "../../service/product-service";
import { getShopAsync } from "../../service/shop-service";

const Products = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const handleSave = (data) => {
    setLoading(true);
    CreateProductAsync(data)
      .then(() => {
        handleClearData();
      })
      .finally(() => setLoading(false));
  };

  const handleClearData = () => {
    setValue("name", "");
    setValue("price", "");
    setValue("shopId", "");
  };

  useEffect(() => {
    setLoading(true);

    getShopAsync()
      .then((result) => {
        setShops(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Product</h1>
      <Box component="form" onSubmit={handleSubmit(handleSave)}>
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <b>Price</b>
            <Controller
              control={control}
              name="price"
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
            <b>Shop</b>
            <Controller
              control={control}
              name="shopId"
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState?.error?.message}>
                  <Select
                    id="shopId"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {shops.map((shop) => (
                      <MenuItem key={shop.id} value={shop.id}>
                        {shop.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState?.error?.message}</FormHelperText>
                </FormControl>
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
      <Backdrop sx={{ color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Products;
