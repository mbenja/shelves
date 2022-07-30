import { useState } from 'react';

import Button from '../components/Button';
import NewBookshelfModal from '../components/NewBookshelfModal';
import PageContainer from '../components/PageContainer';
import { PlusIcon } from '@heroicons/react/solid';

export default function Home() {
	const [isNewBookshelfModalOpen, setIsNewBookshelfModalOpen] = useState(false);

	return (
		<PageContainer title="Bookshelves">
			<NewBookshelfModal
				isOpen={isNewBookshelfModalOpen}
				onClose={() => setIsNewBookshelfModalOpen(false)}
				onSubmit={(v) => {}}
			/>
			<Button
				text="New Bookshelf"
				icon={<PlusIcon className="h-5 my-auto w-5" />}
				onClick={() => setIsNewBookshelfModalOpen(true)}
			/>
		</PageContainer>
	);
}
