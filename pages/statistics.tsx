import GoalComponent from '../components/Goal';
import PageContainer from '../components/PageContainer';
import StatisticCard from '../components/StatisticCard';
import useStats from '../lib/hooks/useStats';

export default function Statistics() {
	const { stats, isLoading } = useStats();

	return (
		<PageContainer title="Statistics">
			{isLoading && <div>loading statistics</div>}
			<GoalComponent />
			{stats && (
				<div className="gap-2 grid grid-cols-1 lg:grid-cols-3 max-h-full py-4 overflow-y-auto-auto sm:grid-cols-2">
					{stats.map((stat) => (
						<StatisticCard key={`stat-${stat.year}`} stat={stat} />
					))}
				</div>
			)}
		</PageContainer>
	);
}
