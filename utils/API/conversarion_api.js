import {createHeaders, createRequestOptions} from "./api_helper";

const backend_api = process.env.NEXT_PUBLIC_BACKEND_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export async function responseGetSimpleAPI(prompt, user_id, conv_id) {
  const raw = JSON.stringify({
    user_message: prompt,
    conversation_id: conv_id,
    user_id: user_id,
    api_key: api_key,
  });

  const requestOptions = createRequestOptions("POST", raw);
  const api_url = `${backend_api}/conv/get_response`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function responseGetDocAPI(prompt, user_id, document_id, conv_id) {
  const raw = JSON.stringify({
    user_message: prompt,
    document: document_id,
    conversation_id: conv_id,
    user_id: user_id,
    api_key: api_key,
  });

  const requestOptions = createRequestOptions("POST", raw);

  const api_url = `${backend_api}/conv/get_response_doc`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function conversationGetByIdAPI(conv_id) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    conv_id: conv_id,
    api_key: api_key,
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

export async function conversationUpdateTitleAPI(conv_id, title) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    conv_id: conv_id,
    title: title,
    api_key: api_key,
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

export async function conversationUpdateActiveAPI(conv_id, active) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    conv_id: conv_id,
    active: active,
    api_key: api_key,
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

export async function conversationUpdateModelAPI(conv_id, model_id) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    conv_id: conv_id,
    model: model_id,
    api_key: api_key,
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

export async function conversationDeleteAPI(conv_id) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    conv_id: conv_id,
    api_key: api_key,
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

export async function conversationGetListAPI(user_id) {
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

  const api_url = `${backend_api}/conv/get`;

  try {
    const response = await fetch(api_url, requestOptions);
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function conversationCreateAPI(user_id, doc_id, title) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    user_id: user_id,
    doc_id: doc_id,
    title: title,
    api_key: api_key,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const api_url = `${backend_api}/conv/add`;

  try {
    const response = await fetch(api_url, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function historyUpdateFeedbackAPI(hist_id, feedback) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    hist_id: hist_id,
    feedback: feedback,
    api_key: api_key,
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

export async function historyGetByConversationAPI(conv_id) {
  const myHeaders = createHeaders();

  const raw = JSON.stringify({
    conv_id: conv_id,
    limit: 100,
    api_key: api_key,
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
