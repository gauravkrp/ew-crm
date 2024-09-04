import axios from "axios";

const username = process.env.STYTCH_PROJECT_ID;
const password = process.env.STYTCH_SECRET;

const config = {
  auth: {
    username: username,
    password: password,
  },
  headers: {
    "Content-Type": "application/json",
  },
};

export const stytchAPI = axios.create(config);
