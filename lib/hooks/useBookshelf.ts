import useSWR from 'swr';

import { Bookshelf } from '@prisma/client';

export default function useBookshelf(id: string) {
	const { data, error, mutate } = useSWR<Bookshelf>(`/api/bookshelf/${id}`);

	return {
		bookshelf: data,
		error,
		isLoading: !error && !data,
		isError: error,
		mutate
	};
}
