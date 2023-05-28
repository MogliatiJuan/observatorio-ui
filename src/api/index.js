import axios from "axios";

export const axiosFallos = axios.create({
  baseURL: "http://observatorio.boxofcodes.com/api/fallo",
});
