import { API_BASE_URL } from "./globals";

async function register(registerDetails) {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "post",
      body: JSON.stringify(registerDetails),
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

export default register;
