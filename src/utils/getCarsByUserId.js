async function getCarByUserId() {
  const user = JSON.parse(window.localStorage.getItem("user")).data;
  const response = await fetch(
    `http://localhost:3000/api/cars/owned/${user._id}`
  );
  const respjson = await response.json();

  return respjson;
}

export default getCarByUserId;
