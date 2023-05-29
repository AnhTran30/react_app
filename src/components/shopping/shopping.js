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
} from "@material-ui/core";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { checkValidData, CreateOrderAsync } from "../../service/order-service";
import { getCustomerAsync } from "../../service/customer-service";
import { getProductAsync } from "../../service/product-service";
import { getShopAsync } from "../../service/shop-service";

const Shoppings = () => {
  const [shops, setShops] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEnoughData, setIsEnoughData] = useState(false);

  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  const { control, handleSubmit, setValue, watch } = useForm({
    mode: "onChange",
  });

  const handleSave = (data) => {
    setLoading(true);
    CreateOrderAsync(data)
      .then(() => {
        handleClearData();
      })
      .finally(() => setLoading(false));
  };

  const handleClearData = () => {
    setValue("customerId", "");
    setValue("productId", "");
    setValue("shopId", "");
  };

  const handleGetProducts = (shopId) => {
    setLoading(true);

    getProductAsync(shopId)
      .then((result) => {
        setProducts(result.data);
      })
      .finally(() => setLoading(false));
  };

  const handleChangeShop = (value, name, type) => {
    if (name === "shopId" && type === "change") {
      handleGetProducts(value.shopId);
    }
  };

  useEffect(() => {
    if (!isEnoughData) return;
    setLoading(true);

    getShopAsync()
      .then((result) => {
        setShops(result.data);
      })
      .finally(() => setLoading(false));
  }, [isEnoughData]);

  useEffect(() => {
    setCustomerLoading(true);

    getCustomerAsync()
      .then((result) => {
        setCustomers(result.data);
      })
      .finally(() => setCustomerLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);

    checkValidData()
      .then((result) => {
        if (!result.data) {
          alert("Not Enough data");
        }
        setIsEnoughData(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      handleChangeShop(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <h1>Create Order</h1>
      {!isEnoughData ? (
        <Box>
          <Typography variant="h5" color="red">
            Empty data
          </Typography>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit(handleSave)}>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <b>Customer</b>
              <Controller
                control={control}
                name="customerId"
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState?.error?.message}>
                    <Select
                      id="customerId"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {customers.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {fieldState?.error?.message}
                    </FormHelperText>
                  </FormControl>
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
                    <FormHelperText>
                      {fieldState?.error?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <b>Product</b>
              <Controller
                control={control}
                name="productId"
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    error={!!fieldState?.error?.message}
                    disabled={products.length === 0}
                  >
                    <Select
                      id="productId"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {products.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {fieldState?.error?.message}
                    </FormHelperText>
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
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      <Backdrop sx={{ color: "#fff" }} open={loading || customerLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Shoppings;
