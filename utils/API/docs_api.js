import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import { createHeaders } from "./api_helper";

const backend_api = process.env.NEXT_PUBLIC_BACKEND_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export async function docUploadAPI(data) {
  let requestOptions = {
    method: "POST",
    body: data,
    redirect: "follow",
  };

  const api_url = `${backend_api}/docs/uploadfile`;
  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function docGetListAPI(user_id) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    user_id: user_id,
    api_key: api_key,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/docs/get`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function docDeleteAPI(doc_id) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    doc_id: doc_id,
    api_key: api_key,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/docs/delete`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}
