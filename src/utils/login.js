import { API_BASE_URL } from "./globals";

async function login(loginDetails) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "post",
      body: JSON.stringify(loginDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respjson = await response.json();

    return respjson;
  } catch (err) {
    return err;
  }
}

export default login;
