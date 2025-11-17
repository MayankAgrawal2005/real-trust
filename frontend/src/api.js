import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // change to deployed URL later

export const api = axios.create({
  baseURL: API_BASE_URL
});
