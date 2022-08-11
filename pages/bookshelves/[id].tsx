import { useRouter } from 'next/router';

import { useState } from 'react';

import Dropdown from '../../components/Dropdown';
import PageContainer from '../../components/PageContainer';
import RenameBookshelfModal from '../../components/RenameBookshelfModal';
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
							onClick: () => {}
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
			{isLoading && <div>loading bookshelf</div>}
			{bookshelf && <div>{JSON.stringify(bookshelf)}</div>}
		</PageContainer>
	);
}
