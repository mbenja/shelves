import useSWR from 'swr';

import { Statistic } from '../types/statistics';

export default function useStats() {
	const { data, error } = useSWR<Statistic[]>('/api/stats');

	return {
		stats: data,
		error,
		isLoading: !error && !data,
		isError: error
	};
}
