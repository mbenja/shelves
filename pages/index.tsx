import { useRouter } from 'next/router';

import { useState } from 'react';

import BookshelfList from '../components/BookshelfList';
import Button from '../components/Button';
import NewBookshelfModal from '../components/NewBookshelfModal';
import PageContainer from '../components/PageContainer';
import { fetcher } from '../lib/fetcher';
import useBookshelves from '../lib/hooks/useBookshelves';
import { handleUnsuccessfulApiResponse } from '../lib/util';
import { PlusIcon } from '@heroicons/react/solid';
import { Bookshelf } from '@prisma/client';

export default function Home() {
	const [isNewBookshelfModalOpen, setIsNewBookshelfModalOpen] = useState(false);
	const { bookshelves, mutate } = useBookshelves();
	const router = useRouter();

	async function handleCreateBookshelf(name: string): Promise<void> {
		fetcher
			.post('/api/bookshelf/createBookshelf', { name })
			.then(async (response) => {
				if (response.ok) {
					const newBookshelf: Bookshelf = await response.json();
					mutate(bookshelves ? [...bookshelves, newBookshelf] : [newBookshelf]);
				} else {
					handleUnsuccessfulApiResponse(response, router);
				}
			});
	}

	return (
		<PageContainer
			title="Bookshelves"
			headerButtons={
				<Button
					text="New Bookshelf"
					icon={<PlusIcon />}
					onClick={() => setIsNewBookshelfModalOpen(true)}
				/>
			}
		>
			<NewBookshelfModal
				isOpen={isNewBookshelfModalOpen}
				onClose={() => setIsNewBookshelfModalOpen(false)}
				onSubmit={(v) => handleCreateBookshelf(v)}
			/>
			<BookshelfList />
		</PageContainer>
	);
}
