import { useRouter } from 'next/router';

import { useState } from 'react';
import toast from 'react-hot-toast';

import BookshelfList from '../components/BookshelfList';
import Button from '../components/Button';
import NewBookshelfModal from '../components/NewBookshelfModal';
import PageContainer from '../components/PageContainer';
import { ROUTES } from '../lib/constants';
import useBookshelves from '../lib/hooks/useBookshelves';
import { PlusIcon } from '@heroicons/react/solid';
import { Bookshelf } from '@prisma/client';

export default function Home() {
	const [isNewBookshelfModalOpen, setIsNewBookshelfModalOpen] = useState(false);
	const { bookshelves, mutate } = useBookshelves();
	const router = useRouter();

	async function handleCreateBookshelf(name: string): Promise<void> {
		fetch('/api/bookshelf/createBookshelf', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name
			})
		}).then(async (response) => {
			if (response.status === 200) {
				const newBookshelf: Bookshelf = await response.json();
				mutate(bookshelves ? [...bookshelves, newBookshelf] : [newBookshelf]);
			} else if (response.status === 401) {
				router.push(ROUTES.AUTH);
			} else {
				toast(await response.json()).trim();
			}
		});
	}

	return (
		<PageContainer title="Bookshelves">
			<NewBookshelfModal
				isOpen={isNewBookshelfModalOpen}
				onClose={() => setIsNewBookshelfModalOpen(false)}
				onSubmit={(v) => handleCreateBookshelf(v)}
			/>
			<Button
				text="New Bookshelf"
				icon={<PlusIcon className="h-5 my-auto w-5" />}
				onClick={() => setIsNewBookshelfModalOpen(true)}
			/>
			<BookshelfList />
		</PageContainer>
	);
}
