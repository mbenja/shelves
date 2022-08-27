import { Statistic } from '../lib/types/statistics';
import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/outline';

export default function StatisticCard({ stat }: { stat: Statistic }) {
	return (
		<div className="bg-neutral-100 dark:bg-neutral-600 p-4 rounded shadow">
			<p className="font-semibold mb-2 text-center text-xl">{stat.year}</p>
			<div className="flex justify-around">
				<div className="flex flex-col gap-2">
					<p className="font-semibold text-center">{stat.bookCount}</p>
					<BookOpenIcon className="h-7 m-auto w-7" />
				</div>
				<div className="flex flex-col gap-2">
					<p className="font-semibold text-center">{stat.pageCount}</p>
					<DocumentTextIcon className="h-7 m-auto w-7" />
				</div>
			</div>
		</div>
	);
}
