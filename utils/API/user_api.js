import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const conversarion_api = process.env.NEXT_PUBLIC_BACKEND_URL
const api_key = process.env.NEXT_PUBLIC_API_KEY

export async function getApiResponse(prompt) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "user_message": prompt,
        "document": 0,
        "conversation_id": 0,
        "user_id": 0,
        "api_key": api_key
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    const api_url = `${conversarion_api}/conv/get_response`

    try{
        const response = await fetch(api_url, requestOptions)
        const result = await response.json()
        // console.log(result)
        return result
    }catch (error){
        console.log(error)
        return error
    }

}