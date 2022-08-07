import useBookshelves from '../lib/hooks/useBookshelves';
import { Bookshelf } from '@prisma/client';

export default function BookshelfList() {
	const { bookshelves, isLoading } = useBookshelves();

	if (isLoading) {
		return <div>loading bookshelves</div>;
	}

	return (
		<div className="gap-2 grid grid-cols-1 md:grid-cols-4 max-h-full my-4 overflow-auto">
			{bookshelves?.map((bookshelf) => (
				<BookshelfCard key={bookshelf.id} bookshelf={bookshelf} />
			))}
		</div>
	);
}

function BookshelfCard({ bookshelf }: { bookshelf: Bookshelf }) {
	return (
		<div className="bg-neutral-100 cursor-pointer dark:bg-neutral-600 p-2 rounded shadow">
			<p className="text-lg">{bookshelf.name}</p>
		</div>
	);
}
