import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const backend_api = process.env.NEXT_PUBLIC_BACKEND_URL
const api_key = process.env.NEXT_PUBLIC_API_KEY

export async function loginUser(email, password) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "password": password
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    const api_url = `${backend_api}/user/login`

    try{
        const response = await fetch(api_url, requestOptions)
        return await response.json()
    }catch (error){
        console.log(error)
        return error
    }
}

export async function registerUser(email, password, name) {
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            "email": email,
            "password": password,
            "name": name
        });
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
    
        const api_url = `${backend_api}/user/create`
    
        try{
            const response = await fetch(api_url, requestOptions)
            return await response.json()
        }catch (error){
            console.log(error)
            return error
        }
}