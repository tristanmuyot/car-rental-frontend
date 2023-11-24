async function getCars() {
  const response = await fetch("http://localhost:3000/api/cars");
  const respjson = await response.json();

  return respjson;
}

export default getCars;
