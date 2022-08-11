import { useRouter } from 'next/router';

import { useState } from 'react';

import ConfirmationModal from '../../components/ConfirmationModal';
import Dropdown from '../../components/Dropdown';
import PageContainer from '../../components/PageContainer';
import RenameBookshelfModal from '../../components/RenameBookshelfModal';
import { ROUTES } from '../../lib/constants';
import { fetcher } from '../../lib/fetcher';
import useBookshelf from '../../lib/hooks/useBookshelf';
import { handleUnsuccessfulApiResponse } from '../../lib/util';
import {
	ChevronDownIcon,
	PencilIcon,
	TrashIcon
} from '@heroicons/react/outline';
import { Bookshelf } from '@prisma/client';

export default function BookshelfComponent() {
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const router = useRouter();
	const { bookshelf, isLoading, mutate } = useBookshelf(
		router.query['id'] ? (router.query['id'] as string) : undefined
	);

	async function handleRenameBookshelf(name: string): Promise<void> {
		fetcher
			.post('/api/bookshelf/renameBookshelf', { id: bookshelf?.id, name })
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
			.post('/api/bookshelf/deleteBookshelf', { id: bookshelf?.id })
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
				<Dropdown
					label="Options"
					icon={<ChevronDownIcon />}
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
			{isLoading && <div>loading bookshelf</div>}
			{bookshelf && <div>{JSON.stringify(bookshelf)}</div>}
		</PageContainer>
	);
}
