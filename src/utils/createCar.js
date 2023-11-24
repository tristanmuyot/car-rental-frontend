import { API_BASE_URL } from "./globals";

async function createCar(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: "post",
      body: formData,
    });
    const respjson = await response.json();

    return respjson;
  } catch (err) {
    return err;
  }
}

export default createCar;
