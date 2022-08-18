import { useRouter } from 'next/router';

import { useState } from 'react';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import PageContainer from '../../../components/PageContainer';
import { ROUTES } from '../../../lib/constants';
import { fetcher } from '../../../lib/fetcher';
import useBookshelf from '../../../lib/hooks/useBookshelf';
import useOpenLibraryBook from '../../../lib/hooks/useOpenLibraryBook';
import { handleUnsuccessfulApiResponse } from '../../../lib/util';
import {
	getAuthorsString,
	mapOpenLibraryBookToBook,
	resolveCover
} from '../../../lib/util/bookUtils';
import { StarIcon } from '@heroicons/react/solid';

export default function AddBook() {
	const [ISBN, setISBN] = useState('');
	const [shouldFetch, setShouldFetch] = useState(false);
	const [starRating, setStarRating] = useState<number>();
	const [yearRead, setYearRead] = useState<number>();
	const [customCoverUrl, setCustomCoverUrl] = useState('');
	const router = useRouter();
	const { bookshelf } = useBookshelf(
		router.query['id'] ? (router.query['id'] as string) : undefined
	);
	const { response } = useOpenLibraryBook(ISBN, shouldFetch);

	const openLibraryBook = response ? response[`ISBN:${ISBN}`] : null;

	async function handleAddBook(): Promise<void> {
		if (!openLibraryBook || !bookshelf) return;

		fetcher
			.post('/api/book/createBook', {
				book: {
					...mapOpenLibraryBookToBook(
						openLibraryBook,
						bookshelf.id,
						customCoverUrl
					),
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
			{!openLibraryBook && (
				<div className="flex flex-col gap-2 md:w-1/4 w-full">
					<p>Enter your book's ISBN to get started.</p>
					<Input placeholder="ISBN" value={ISBN} onChange={(v) => setISBN(v)} />
					<Button
						text="Search"
						disabled={ISBN.length !== 10 && ISBN.length !== 13}
						onClick={() => setShouldFetch(true)}
						expand
					/>
				</div>
			)}
			{openLibraryBook && (
				<div className="flex flex-col gap-4 md:w-1/2 w-full">
					<p>
						Here's what we found. Add additional details or send it straight to
						your bookshelf.
					</p>
					<div className="flex flex-col gap-6">
						<div className="flex gap-2 md:gap-4">
							<img
								className="h-64 md:h-80 rounded-md shadow-md"
								src={resolveCover(openLibraryBook, customCoverUrl)}
							/>
							<div className="flex flex-col gap-4">
								<div className="">
									<p className="font-semibold text-lg">
										{openLibraryBook.title}
									</p>
									{openLibraryBook.subtitle && (
										<p className="italic text-sm">{openLibraryBook.subtitle}</p>
									)}
									<p className="text-sm">
										By: {getAuthorsString(openLibraryBook)}
									</p>
									<p className="text-sm">
										{openLibraryBook.number_of_pages} pages
									</p>
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

function StarRating({
	rating,
	onChange
}: {
	rating?: number;
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
