import axios from "axios";
import { ApiProducts } from "../utils/api-routing";
import { Endpoint } from "../utils/constant";

export const getProductAsync = async (shopId) => {
  let url = Endpoint + ApiProducts;
  if (!!shopId) url = `${url}?shopId=${shopId}`;
  return await axios.get(url);
};

export const CreateProductAsync = async (data) => {
  const url = Endpoint + ApiProducts;
  return await axios.post(url, data);
};
