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
