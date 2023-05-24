import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";

const backend_api = process.env.NEXT_PUBLIC_BACKEND_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export async function uploadDocumentApi(data) {
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

export async function getDocumentListApi(user_id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    user_id: user_id,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/docs/get_docs/user_id`;

    try {
        const response = await fetch(api_url, requestOptions);
        return await response.json();
    } catch (error) {
        console.log(error)
        return error
    }
}
