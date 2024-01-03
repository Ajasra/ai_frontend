import { createHeaders } from "./api_helper";

const backend_api = process.env.NEXT_PUBLIC_BACKEND_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export async function userLoginAPI(email, password) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    email: email,
    password: password,
    api_key: api_key,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/user/login`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function userRegisterAPI(email, name, password) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    email: email,
    name: name,
    password: password,
    api_key: api_key,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/user/create`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}
