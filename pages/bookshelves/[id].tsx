import { useRouter } from 'next/router';

import Dropdown from '../../components/Dropdown';
import PageContainer from '../../components/PageContainer';
import useBookshelf from '../../lib/hooks/useBookshelf';
import {
	ChevronDownIcon,
	PencilIcon,
	TrashIcon
} from '@heroicons/react/outline';

export default function Bookshelf() {
	const router = useRouter();
	const { bookshelf, isLoading } = useBookshelf(router.query['id'] as string);

	return (
		<PageContainer
			title={bookshelf ? bookshelf.name : 'Loading...'}
			headerButtons={
				<Dropdown
					label="Options"
					icon={<ChevronDownIcon />}
					items={[
						{ label: 'Rename', icon: <PencilIcon />, onClick: () => {} },
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
			{isLoading && <div>loading bookshelf</div>}
			{bookshelf && <div>{JSON.stringify(bookshelf)}</div>}
		</PageContainer>
	);
}
