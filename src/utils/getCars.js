import { API_BASE_URL } from "./globals";

async function getCars() {
  const response = await fetch(`${API_BASE_URL}/cars`);
  const respjson = await response.json();

  return respjson;
}

export default getCars;
