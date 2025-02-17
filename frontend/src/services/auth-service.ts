import { Api } from "../shared/utils/axios";

async function verifyAuth() {
  try {
    await Api.get("/verify-auth");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default {
  verifyAuth,
};
