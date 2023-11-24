async function login(loginDetails) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      body: JSON.stringify(loginDetails),
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

export default login;
