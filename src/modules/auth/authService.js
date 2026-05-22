import axios from "../../services/api";

export const registerApi = async (payload) => {
  const { data } = await axios.post("/register", payload);
  return data;
};

export const loginApi = async (email, password) => {
  const { data } = await axios.post(
    "/login",
    { email, password },
    { withCredentials: true }
  );
  return data;
};

export const googleLoginApi = async (payload) => {
  const { data } = await axios.post(
    "/loginGoogle",
    payload,
    { withCredentials: true }
  );
  return data;
};