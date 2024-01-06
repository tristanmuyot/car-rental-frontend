const psgcURL = "https://psgc-api.wareneutron.com/api/city/";

async function getCities() {
  const response = await fetch(psgcURL);
  const respjson = await response.json();

  return respjson;
}

export default getCities;
