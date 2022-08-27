import useSWR from 'swr';

import { Goal } from '@prisma/client';

export default function useGoal() {
	const { data, error, mutate } = useSWR<Goal | null>('/api/goal');

	return {
		goal: data,
		error,
		isLoading: !error && data === undefined,
		isError: error,
		mutate
	};
}
