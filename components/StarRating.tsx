import { StarIcon } from '@heroicons/react/solid';

export default function StarRating({
	rating,
	onChange
}: {
	rating: number | null;
	onChange: (v: number) => void;
}) {
	const stars: JSX.Element[] = [];
	for (let i = 1; i < 6; i++) {
		rating && rating >= i
			? stars.push(<StarIcon className="text-yellow-500" />)
			: stars.push(<StarIcon />);
	}

	return (
		<div className="flex flex-col gap-2">
			<p className="text-center">Rating</p>
			<div className="flex gap-2 justify-center">
				{stars.map((star, i) => (
					<span
						key={`star-${i}`}
						className="cursor-pointer h-6 w-6"
						onClick={() => onChange(i + 1)}
					>
						{star}
					</span>
				))}
			</div>
		</div>
	);
}
