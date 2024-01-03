export function createHeaders() {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	return myHeaders;
}

export function createRequestOptions(method, body) {
	return {
		method: method,
		headers: createHeaders(),
		body: JSON.stringify(body),
		redirect: "follow",
	};
}