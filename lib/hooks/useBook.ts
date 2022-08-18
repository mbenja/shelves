import useSWR from 'swr';

import { Author, Book } from '@prisma/client';

export default function useBook(id?: string) {
	const { data, error, mutate } = useSWR<Book & { authors: Author[] }>(
		id ? `/api/book/${id}` : null
	);

	return {
		book: data,
		error,
		isLoading: !error && !data,
		isError: error,
		mutate
	};
}
