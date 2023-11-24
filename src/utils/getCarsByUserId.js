import { API_BASE_URL } from "./globals";

async function getCarByUserId() {
  const user = JSON.parse(window.localStorage.getItem("user")).data;
  const response = await fetch(`${API_BASE_URL}/cars/owned/${user._id}`);
  const respjson = await response.json();

  return respjson;
}

export default getCarByUserId;
