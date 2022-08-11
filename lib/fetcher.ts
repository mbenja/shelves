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
	post
};

async function post(url: string, body: any): Promise<Response> {
	return await fetch(url, {
		method: 'POST',
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
