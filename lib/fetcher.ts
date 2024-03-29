export async function swrFetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);

	if (!res.ok) {
		throw await buildError(res);
	}

	return res.json();
}

export const fetcher = {
	post: (url: string, body: any) => fetchWrapper('POST', url, body),
	put: (url: string, body: any) => fetchWrapper('PUT', url, body),
	delete: (url: string, body: any) => fetchWrapper('DELETE', url, body)
};

async function fetchWrapper(
	method: 'POST' | 'PUT' | 'DELETE',
	url: string,
	body: any
): Promise<Response> {
	return await fetch(url, {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
}

async function buildError(res: Response): Promise<Error> {
	const error = new Error('An error occurred while fetching the data');
	error.message = await res.json();
	return error;
}
