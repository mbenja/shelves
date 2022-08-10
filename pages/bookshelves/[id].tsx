import { useRouter } from 'next/router';

import PageContainer from '../../components/PageContainer';
import useBookshelf from '../../lib/hooks/useBookshelf';

export default function Bookshelf() {
	const router = useRouter();
	const { bookshelf, isLoading } = useBookshelf(router.query['id'] as string);

	return (
		<PageContainer
			title={bookshelf ? bookshelf.name : 'Loading...'}
			forceShowTitle
		>
			{isLoading && <div>loading bookshelf</div>}
			{bookshelf && <div>{JSON.stringify(bookshelf)}</div>}
		</PageContainer>
	);
}
