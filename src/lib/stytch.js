// import { Stytch } from "@stytch/nextjs";
// import { StytchUIClient } from "@stytch/vanilla-js";
// import { Client } from "stytch";
// let stytch;

import axios from "axios";

// const stytch = new StytchUIClient(
//   "public-token-test-f460c017-c0ce-4864-bfa1-3dd1aa9549aa"
// );

// export const stytchServer = new Client({
//   project_id: process.env.STYTCH_PROJECT_ID,
//   secret: process.env.STYTCH_SECRET,
//   env: "test",
// });

// export default stytch;
const username = process.env.STYTCH_PROJECT_ID;
const password = process.env.STYTCH_SECRET;

// const data = {
//   email: requestData?.email,
//   password: "6!JTVnBm#tK9DVOU",
// };

const config = {
  // url: "/api/stytch",
  auth: {
    username: username,
    password: password,
  },
  headers: {
    "Content-Type": "application/json",
  },
};

export const stytchAPI = axios.create(config);
