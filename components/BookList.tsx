import Link from 'next/link';

import useBooks from '../lib/hooks/useBooks';
import { getAuthorsString } from '../lib/util/bookUtils';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { Author, Book } from '@prisma/client';

export default function BookList({ bookshelfId }: { bookshelfId: string }) {
	const { books, isLoading } = useBooks(bookshelfId);

	if (isLoading) {
		return <div>loading books</div>;
	}

	return (
		<div className="gap-2 grid grid-cols-1 lg:grid-cols-3 max-h-full mb-4 overflow-y-auto sm:grid-cols-2">
			{books?.map((book) => (
				<BookCard key={book.id} book={book} />
			))}
		</div>
	);
}

function BookCard({ book }: { book: Book & { authors: Author[] } }) {
	return (
		<Link href={`/bookshelves/${book.bookshelfId}/book/${book.id}`}>
			<a className="bg-neutral-100 cursor-pointer dark:bg-neutral-600 flex rounded shadow">
				{book.cover ? (
					<img
						src={book.cover}
						className="h-56 rounded-bl rounded-tl shadow w-[8.5rem]"
					/>
				) : (
					<div className="border border-neutral-400 flex flex-col h-56 justify-center rounded-bl rounded-tl w-36">
						<QuestionMarkCircleIcon className="h-24 m-auto w-24" />
					</div>
				)}
				<div className="flex flex-col p-2">
					<p className="text-lg">{book.title}</p>
					<p className="italic text-sm">{book.subtitle}</p>
					<p className="text-sm">By: {getAuthorsString(book.authors)}</p>
					<p className="text-sm">{book.pageCount} pages</p>
				</div>
			</a>
		</Link>
	);
}
