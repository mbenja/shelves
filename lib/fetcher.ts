export default async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);

	if (!res.ok) {
		const error = new Error('An error occurred while fetching the data');
		error.message = await res.json();
		throw error;
	}

	return res.json();
}
