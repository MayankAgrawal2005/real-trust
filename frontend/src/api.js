import axios from "axios";

const API_BASE_URL = "https://real-trust-7.onrender.com/api"; // change to deployed URL later

export const api = axios.create({
  baseURL: API_BASE_URL
});
