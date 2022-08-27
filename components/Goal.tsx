import { useRouter } from 'next/router';

import { useState } from 'react';

import { fetcher } from '../lib/fetcher';
import useGoal from '../lib/hooks/useGoal';
import useStats from '../lib/hooks/useStats';
import { handleUnsuccessfulApiResponse } from '../lib/util';
import Button from './Button';
import SetGoalModal from './SetGoalModal';
import { Goal } from '@prisma/client';

export default function GoalComponent() {
	const router = useRouter();
	const { stats, isLoading: isLoadingStats } = useStats();
	const { goal, isLoading: isLoadingGoal, mutate } = useGoal();
	const [isSetGoalModalOpen, setIsSetGoalModalOpen] = useState(false);
	const isLoading = isLoadingGoal || isLoadingStats;
	const booksReadThisYear =
		stats?.find((s) => s.year === new Date().getFullYear())?.bookCount ?? 0;

	async function handleSetGoal(value: number): Promise<void> {
		fetcher
			.post('/api/goal/setGoal', { goal: { value } })
			.then(async (response) => {
				if (response.ok) {
					const updatedGoal: Goal = await response.json();
					mutate(updatedGoal);
				} else {
					handleUnsuccessfulApiResponse(response, router);
				}
			});
	}

	return (
		<div className="bg-neutral-100 dark:bg-neutral-600 flex justify-center p-4 rounded shadow">
			<SetGoalModal
				isOpen={isSetGoalModalOpen}
				onClose={() => setIsSetGoalModalOpen(false)}
				onSubmit={handleSetGoal}
			/>
			{isLoading && <div>loading goal</div>}
			{!isLoading && (
				<div className="flex flex-col gap-4 w-full md:w-1/2">
					{!goal && (
						<p className="text-center">No reading goal set for this year</p>
					)}
					{goal && (
						<p className="font-semibold text-center text-xl">
							{booksReadThisYear} of {goal.value} books
						</p>
					)}
					<Button
						text={goal ? 'Update Goal' : 'Set a Reading Goal'}
						onClick={() => setIsSetGoalModalOpen(true)}
						expand
					/>
				</div>
			)}
		</div>
	);
}
