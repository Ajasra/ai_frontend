const backend_api = process.env.NEXT_PUBLIC_BACKEND_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export async function getModelsApi(conv_id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    api_key: api_key,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/models/get_models`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
