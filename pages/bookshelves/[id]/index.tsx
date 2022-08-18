import Link from 'next/link';
import { useRouter } from 'next/router';

import { useState } from 'react';

import BookList from '../../../components/BookList';
import Button from '../../../components/Button';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Dropdown from '../../../components/Dropdown';
import PageContainer from '../../../components/PageContainer';
import RenameBookshelfModal from '../../../components/RenameBookshelfModal';
import { ROUTES } from '../../../lib/constants';
import { fetcher } from '../../../lib/fetcher';
import useBookshelf from '../../../lib/hooks/useBookshelf';
import { handleUnsuccessfulApiResponse } from '../../../lib/util';
import {
	DotsVerticalIcon,
	PencilIcon,
	TrashIcon
} from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import { Bookshelf } from '@prisma/client';

export default function BookshelfComponent() {
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const router = useRouter();
	const { bookshelf, mutate } = useBookshelf(
		router.query['id'] ? (router.query['id'] as string) : undefined
	);

	async function handleRenameBookshelf(name: string): Promise<void> {
		fetcher
			.put('/api/bookshelf/renameBookshelf', { id: bookshelf?.id, name })
			.then(async (response) => {
				if (response.ok) {
					const updatedBookshelf: Bookshelf = await response.json();
					mutate(updatedBookshelf);
				} else {
					handleUnsuccessfulApiResponse(response, router);
				}
			});
	}

	async function handleDeleteBookshelf(): Promise<void> {
		fetcher
			.delete('/api/bookshelf/deleteBookshelf', { id: bookshelf?.id })
			.then((response) => {
				if (response.ok) {
					router.push(ROUTES.HOME);
				} else {
					handleUnsuccessfulApiResponse(response, router);
				}
			});
	}

	return (
		<PageContainer
			title={bookshelf ? bookshelf.name : 'Loading...'}
			headerButtons={
				<div className="flex gap-2 h-fit">
					<Link href={`/bookshelves/${bookshelf?.id}/addBook`} passHref>
						<a>
							<Button text="Add book" icon={<PlusIcon />} />
						</a>
					</Link>
					<Dropdown
						icon={<DotsVerticalIcon />}
						items={[
							{
								label: 'Rename',
								icon: <PencilIcon />,
								onClick: () => setIsRenameModalOpen(true)
							},
							{
								label: 'Delete',
								icon: <TrashIcon />,
								danger: true,
								onClick: () => setIsDeleteModalOpen(true)
							}
						]}
					/>
				</div>
			}
			forceShowTitle
		>
			<RenameBookshelfModal
				isOpen={isRenameModalOpen}
				onClose={() => setIsRenameModalOpen(false)}
				onSubmit={(v) => handleRenameBookshelf(v)}
			/>
			<ConfirmationModal
				title="Delete Bookshelf"
				description="Are you sure you'd like to delete this bookshelf?"
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onSubmit={handleDeleteBookshelf}
			/>
			{router.query['id'] && (
				<BookList bookshelfId={router.query['id'] as string} />
			)}
		</PageContainer>
	);
}
