import { API_BASE_URL } from "./globals";

async function book(data) {
  const response = await fetch(`${API_BASE_URL}/booking`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respjson = await response.json();

  return respjson;
}

export default book;
