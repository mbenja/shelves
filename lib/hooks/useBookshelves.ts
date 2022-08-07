import useSWR from 'swr';

import fetcher from '../fetcher';
import { Bookshelf } from '@prisma/client';

export default function useBookshelves() {
	const { data, error, mutate } = useSWR<Bookshelf[]>(
		'/api/bookshelf/getBookshelves',
		fetcher
	);

	return {
		bookshelves: data,
		error,
		isLoading: !error && !data,
		isError: error,
		mutate
	};
}
