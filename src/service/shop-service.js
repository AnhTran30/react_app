import axios from "axios";
import { ApiShops } from "../utils/api-routing";
import { Endpoint } from "../utils/constant";

export const getShopAsync = async () => {
  const url = Endpoint + ApiShops;
  return await axios.get(url);
};

export const CreateShopAsync = async (data) => {
  const url = Endpoint + ApiShops;
  return await axios.post(url, data);
};
