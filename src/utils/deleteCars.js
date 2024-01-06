import { API_BASE_URL } from "./globals";

async function deleteCar(id) {
  const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
    method: "delete",
  });
  const respjson = await response.json();

  return respjson;
}

export default deleteCar;
