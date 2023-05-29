import React from "react";
import { Route, Routes } from "react-router";
import Orders from "./components/order/order";
import Customers from "./components/customer/customer";
import Products from "./components/product/product";
import Shops from "./components/shop/shop";
import Shoppings from "./components/shopping/shopping";

/*Routes is used to be Switch*/
const Router = () => {
  /* nesting routes*/
  return (
    <Routes>
      <Route path="/" element={<Customers />} />
      <Route path="/shops" element={<Shops />} />
      <Route path="/products" element={<Products />} />
      <Route path="/shoppings" element={<Shoppings />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};
export default Router;
