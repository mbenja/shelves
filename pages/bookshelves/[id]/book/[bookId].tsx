import { useRouter } from 'next/router';

import PageContainer from '../../../../components/PageContainer';
import useBook from '../../../../lib/hooks/useBook';

export default function BookComponent() {
	const router = useRouter();
	const { book, isLoading } = useBook(
		router.query['bookId'] ? (router.query['bookId'] as string) : undefined
	);

	return (
		<PageContainer>
			{isLoading && <div>loading book</div>}
			{book && <div>{JSON.stringify(book)}</div>}
		</PageContainer>
	);
}
