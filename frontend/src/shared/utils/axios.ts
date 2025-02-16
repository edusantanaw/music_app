import axios from "axios";
import { API_URL } from "../constants/Api";

export const Api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});
