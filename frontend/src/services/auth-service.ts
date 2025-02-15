import { Api } from "../utils/axios";

async function verifyAuth() {
  try {
    const res = await Api.get("/verify-auth");
    console.log(res)
    return true;
  } catch (err) {
    console.log(err)
    return false;
  }
}

export default {
    verifyAuth
}

