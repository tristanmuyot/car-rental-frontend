async function register(registerDetails) {
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "post",
      body: JSON.stringify(registerDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respjson = await response.json();

    return respjson;
  } catch (err) {
    return err;
  }
}

export default register;
