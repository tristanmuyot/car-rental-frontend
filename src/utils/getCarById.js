import { API_BASE_URL } from "./globals";

async function getCarById(id) {
  const response = await fetch(`${API_BASE_URL}/cars/${id}`);
  const respjson = await response.json();

  return respjson;
}

export default getCarById;