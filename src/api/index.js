import axios from "axios";

export const axiosFallos = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
