import useSWR from 'swr';

import { Author, Book } from '@prisma/client';

export default function useBooks(bookshelfId?: string) {
	const { data, error, mutate } = useSWR<(Book & { authors: Author[] })[]>(
		bookshelfId ? `/api/book/getBooks/${bookshelfId}` : null
	);

	return {
		books: data,
		error,
		isLoading: !error && !data,
		isError: error,
		mutate
	};
}
