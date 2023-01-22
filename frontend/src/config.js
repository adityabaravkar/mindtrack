import axios from "axios";
import { Authentication } from "./services";

export const jwtApiCall = axios.create({
  baseURL: "http://vast-taiga-12338.herokuapp.com",
  timeout: 1000,
  headers: { Authorization: Authentication.bearerToken },
});
