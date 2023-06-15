import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const backend_api = process.env.NEXT_PUBLIC_BACKEND_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export async function getApiResponse(prompt, user_id, document_id, conv_id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    user_message: prompt,
    document: document_id,
    conversation_id: conv_id,
    user_id: user_id,
    api_key: api_key,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/conv/get_response_doc`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getConversationHistory(conv_id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    conv_id: conv_id,
    limit: 100,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/conv/get_history`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getConversationByIdApi(conv_id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    conv_id: conv_id,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/conv/get_selected_conv`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function updateConversationAPI(conv_id, title) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    conv_id: conv_id,
    title: title,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/conv/update`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteConversationAPI(conv_id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    conv_id: conv_id,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/conv/delete`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getConversationsListApi(user_id) {
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

  const api_url = `${backend_api}/conv/get_user_conversations`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function createConversationApi(user_id, doc_id, title) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    user_id: user_id,
    doc_id: doc_id,
    title: title,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/conv/create`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function MarkHistoryApi(hist_id, feedback) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        hist_id: hist_id,
        feedback: feedback,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const api_url = `${backend_api}/conv/history/feedback`;

    try {
        const response = await fetch(api_url, requestOptions);
        return await response.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}
