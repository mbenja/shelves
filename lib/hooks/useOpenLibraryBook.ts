import useSWR from 'swr';

import { GetOpenLibraryBookResponse } from '../types/openLibrary';

export default function useOpenLibraryBook(ISBN: string, shouldFetch: boolean) {
	const { data, error } = useSWR<GetOpenLibraryBookResponse>(
		shouldFetch
			? `https://openlibrary.org/api/books?bibkeys=ISBN:${ISBN}&format=json&jscmd=data`
			: null
	);

	return {
		response: data,
		error,
		isLoading: !error && !data,
		isError: error
	};
}
