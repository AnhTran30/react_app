import axios from "axios";
import { ApiCustomers } from "../utils/api-routing";
import { Endpoint } from "../utils/constant";

export const getCustomerAsync = async () => {
  const url = Endpoint + ApiCustomers;
  return await axios.get(url);
};

export const CreateCustomerAsync = async (data) => {
  const url = Endpoint + ApiCustomers;
  return await axios.post(url, data);
};
