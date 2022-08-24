import { OpenLibraryBook } from '../types/openLibrary';
import { Author, Book } from '@prisma/client';

export function mapOpenLibraryBookToBook(
	book: OpenLibraryBook,
	bookshelfId: string
): Partial<Book> & {
	authors: Partial<Author>[];
} {
	return {
		bookshelfId,
		authors:
			book.authors.map((author) => {
				return { id: getAuthorIdFromUrl(author.url), name: author.name };
			}) ?? [],
		cover: resolveCover(book),
		hasCustomCover: false,
		isbn: resolveISBN(book),
		pageCount: book.number_of_pages,
		publishDate: book.publish_date ? new Date(book.publish_date) : undefined,
		subtitle: book.subtitle,
		title: book.title
	};
}

export function resolveISBN(book: OpenLibraryBook): string {
	if (book.identifiers.isbn_13 && book.identifiers.isbn_13.length > 0) {
		return book.identifiers.isbn_13[0];
	} else if (book.identifiers.isbn_10 && book.identifiers.isbn_10.length > 0) {
		return book.identifiers.isbn_10[0];
	}

	return '';
}

export function resolveCover(book: OpenLibraryBook): string {
	if (book.cover?.large) return book.cover.large;
	if (book.cover?.medium) return book.cover.medium;
	if (book.cover?.small) return book.cover.small;

	return '';
}

export function getAuthorsString(authors: Partial<Author>[]): string {
	let authorsString = '';

	authors.forEach((author, i) => {
		authorsString += ` ${author.name}`;
		if (i !== authors.length - 1) {
			authorsString += ',';
		}
	});

	return authorsString;
}

function getAuthorIdFromUrl(url: string): string {
	return url.replace('https://', '').split('/')[2];
}
