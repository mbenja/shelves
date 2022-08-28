import { useRouter } from 'next/router';

import { useState } from 'react';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import PageContainer from '../../../components/PageContainer';
import StarRating from '../../../components/StarRating';
import { ROUTES } from '../../../lib/constants';
import { fetcher } from '../../../lib/fetcher';
import useBookshelf from '../../../lib/hooks/useBookshelf';
import useOpenLibraryBook from '../../../lib/hooks/useOpenLibraryBook';
import { handleUnsuccessfulApiResponse } from '../../../lib/util';
import {
	getAuthorsString,
	mapOpenLibraryBookToBook
} from '../../../lib/util/bookUtils';
import { QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/solid';

export default function AddBook() {
	const [ISBN, setISBN] = useState('');
	const [shouldFetch, setShouldFetch] = useState(false);
	const [starRating, setStarRating] = useState<number | null>(null);
	const [yearRead, setYearRead] = useState<number>();
	const [customCoverUrl, setCustomCoverUrl] = useState('');
	const router = useRouter();
	const { bookshelf } = useBookshelf(
		router.query['id'] ? (router.query['id'] as string) : undefined
	);
	const { response } = useOpenLibraryBook(ISBN, shouldFetch);

	const book =
		response && bookshelf
			? mapOpenLibraryBookToBook(response[`ISBN:${ISBN}`], bookshelf.id)
			: null;

	async function handleAddBook(): Promise<void> {
		fetcher
			.post('/api/book/createBook', {
				book: {
					...book,
					cover: customCoverUrl.length > 0 ? customCoverUrl : book?.cover,
					hasCustomCover: customCoverUrl.length > 0,
					rating: starRating,
					yearRead
				}
			})
			.then(async (response) => {
				if (response.ok) {
					router.push(`${ROUTES.BOOKSHELVES}/${router.query['id']}`);
				} else {
					handleUnsuccessfulApiResponse(response, router);
				}
			});
	}

	return (
		<PageContainer title={`Add a Book to ${bookshelf?.name}`}>
			{!book && (
				<div className="flex flex-col gap-2 md:w-1/4 w-full">
					<p>Enter your book&apos;s ISBN to get started.</p>
					<Input placeholder="ISBN" value={ISBN} onChange={(v) => setISBN(v)} />
					<Button
						text="Search"
						disabled={ISBN.length !== 10 && ISBN.length !== 13}
						onClick={() => setShouldFetch(true)}
						expand
					/>
				</div>
			)}
			{book && (
				<div className="flex flex-col gap-4 md:w-1/2 w-full">
					<p>
						Here&apos;s what we found. Add additional details or send it
						straight to your bookshelf.
					</p>
					<div className="flex flex-col gap-6">
						<div className="flex gap-2 md:gap-4">
							{book.cover || customCoverUrl ? (
								<img
									className="h-64 md:h-96 rounded-md shadow-md"
									src={customCoverUrl.length > 0 ? customCoverUrl : book.cover}
								/>
							) : (
								<div className="border border-neutral-400 flex flex-col h-64 justify-center md:h-96 md:w-60 rounded-md w-44">
									<QuestionMarkCircleIcon className="h-28 m-auto w-28" />
								</div>
							)}
							<div className="flex flex-col gap-4">
								<div className="">
									<p className="font-semibold text-lg">{book.title}</p>
									{book.subtitle && (
										<p className="italic text-sm">{book.subtitle}</p>
									)}
									<p className="text-sm">
										By: {getAuthorsString(book.authors)}
									</p>
									<p className="text-sm">{book.pageCount} pages</p>
								</div>
								<StarRating
									rating={starRating}
									onChange={(v) => setStarRating(v)}
								/>
								<Input
									type="number"
									placeholder="Year Read"
									value={yearRead?.toString() ?? ''}
									onChange={(v) => setYearRead(parseInt(v))}
								/>
								<Input
									placeholder="Custom cover URL"
									value={customCoverUrl}
									onChange={(v) => setCustomCoverUrl(v)}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							text="Back to Search"
							fill="clear"
							onClick={() => setShouldFetch(false)}
							expand
						/>
						<Button text="Add to Bookshelf" onClick={handleAddBook} expand />
					</div>
				</div>
			)}
		</PageContainer>
	);
}
