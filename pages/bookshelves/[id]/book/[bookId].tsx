import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../../../components/Button';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import Dropdown from '../../../../components/Dropdown';
import Input from '../../../../components/Input';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import PageContainer from '../../../../components/PageContainer';
import StarRating from '../../../../components/StarRating';
import { ROUTES } from '../../../../lib/constants';
import { fetcher } from '../../../../lib/fetcher';
import useBook from '../../../../lib/hooks/useBook';
import { handleUnsuccessfulApiResponse } from '../../../../lib/util';
import { getAuthorsString } from '../../../../lib/util/bookUtils';
import {
	DotsVerticalIcon,
	QuestionMarkCircleIcon,
	TrashIcon
} from '@heroicons/react/solid';

export default function BookComponent() {
	const router = useRouter();
	const { book, isLoading } = useBook(
		router.query['bookId'] ? (router.query['bookId'] as string) : undefined
	);
	const [starRating, setStarRating] = useState<number | null>(null);
	const [yearRead, setYearRead] = useState<number | null>(null);
	const [customCoverUrl, setCustomCoverUrl] = useState('');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const resolvedCoverUrl =
		book?.hasCustomCover || customCoverUrl.length > 0
			? customCoverUrl
			: book?.cover;

	async function handleSaveBook(): Promise<void> {
		fetcher
			.post('/api/book/updateBook', {
				book: {
					id: book?.id,
					cover: resolvedCoverUrl,
					hasCustomCover: customCoverUrl.length > 0,
					rating: starRating,
					yearRead
				}
			})
			.then(async (response) => {
				if (response.ok) {
					toast(`${book?.title} has been updated`);
				} else {
					handleUnsuccessfulApiResponse(response, router);
				}
			});
	}

	async function handleDeleteBook(): Promise<void> {
		fetcher
			.post('/api/book/deleteBook', {
				id: book?.id
			})
			.then(async (response) => {
				if (response.ok) {
					router.push(`${ROUTES.BOOKSHELVES}/${book?.bookshelfId}`);
				} else {
					handleUnsuccessfulApiResponse(response, router);
				}
			});
	}

	useEffect(() => {
		if (book) {
			setStarRating(book.rating);
			setYearRead(book.yearRead);

			if (book.hasCustomCover) {
				setCustomCoverUrl(book.cover);
			}
		}
	}, [book]);

	return (
		<PageContainer
			title={isLoading ? undefined : book?.title}
			subtitle={
				<div>
					{book?.subtitle && <p>{book.subtitle}</p>}
					{book && <p>By: {getAuthorsString(book?.authors)}</p>}
					{book && <p>{book.pageCount} pages</p>}
				</div>
			}
			headerButtons={
				<Dropdown
					icon={<DotsVerticalIcon />}
					items={[
						{
							label: 'Delete',
							icon: <TrashIcon />,
							danger: true,
							onClick: () => setIsDeleteModalOpen(true)
						}
					]}
				/>
			}
		>
			<ConfirmationModal
				title="Delete Book"
				description="Are you sure you'd like to delete this book?"
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onSubmit={handleDeleteBook}
				isDestructive
			/>
			{isLoading && <LoadingIndicator />}
			{book && (
				<div className="flex flex-col gap-2 md:gap-6 md:w-1/2 w-full">
					<div className="flex gap-2 md:gap-6">
						{resolvedCoverUrl ? (
							<img
								src={resolvedCoverUrl}
								className="h-64 md:h-96 rounded-md shadow-md"
							/>
						) : (
							<div className="border border-neutral-400 flex flex-col h-64 justify-center md:h-96 md:w-60 rounded-md w-44">
								<QuestionMarkCircleIcon className="h-28 m-auto w-28" />
							</div>
						)}
						<div className="flex flex-col gap-4">
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
					<Button text="Save Book" onClick={handleSaveBook} expand />
				</div>
			)}
		</PageContainer>
	);
}
