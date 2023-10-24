import axios from "axios";

export const axiosFallos = axios.create({
  baseURL: "http://localhost:8080",
});
