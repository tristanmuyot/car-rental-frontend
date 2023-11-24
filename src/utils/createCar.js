async function createCar(formData) {
  try {
    const response = await fetch("http://localhost:3000/api/cars", {
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
