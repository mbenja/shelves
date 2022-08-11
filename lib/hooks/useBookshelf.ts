import useSWR from 'swr';

import { Bookshelf } from '@prisma/client';

export default function useBookshelf(id?: string) {
	const { data, error, mutate } = useSWR<Bookshelf>(
		id ? `/api/bookshelf/${id}` : null
	);

	return {
		bookshelf: data,
		error,
		isLoading: !error && !data,
		isError: error,
		mutate
	};
}
