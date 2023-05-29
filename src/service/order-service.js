import axios from "axios";
import { ApiOrders, ApiValidateData } from "../utils/api-routing";
import { Endpoint } from "../utils/constant";

export const getOrdertAsync = async () => {
  const url = Endpoint + ApiOrders;
  return await axios.get(url);
};

export const CreateOrderAsync = async (data) => {
  const url = Endpoint + ApiOrders;
  return await axios.post(url, data);
};

export const checkValidData = async () => {
  const url = Endpoint + ApiValidateData;
  return await axios.get(url);
};
