import axios from "axios";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
const instance = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

export default instance;
