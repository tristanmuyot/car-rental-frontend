import { API_BASE_URL } from "./globals";

async function getBookingByUserId(id) {
  const response = await fetch(`${API_BASE_URL}/booking/owned/${id}`);
  const respjson = await response.json();

  return respjson;
}

export default getBookingByUserId;
