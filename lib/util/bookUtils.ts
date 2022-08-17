import { OpenLibraryBook } from '../types/openLibrary';
import { Author, Book } from '@prisma/client';

export function mapOpenLibraryBookToBook(
	book: OpenLibraryBook,
	bookshelfId: string,
	customCoverUrl?: string
): Partial<Book> & {
	authors: Partial<Author>[];
} {
	return {
		bookshelfId,
		authors:
			book.authors.map((author) => {
				return { id: getAuthorIdFromUrl(author.url), name: author.name };
			}) ?? [],
		cover: resolveCover(book, customCoverUrl),
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

export function resolveCover(
	book: OpenLibraryBook,
	customUrl?: string
): string {
	if (customUrl) return customUrl;

	if (book.cover?.large) return book.cover.large;
	if (book.cover?.medium) return book.cover.medium;
	if (book.cover?.small) return book.cover.small;

	return '';
}

export function getAuthorsString(
	book: OpenLibraryBook | (Book & { authors: Author[] })
): string {
	let authors = '';

	book.authors.forEach((author, i) => {
		authors += ` ${author.name}`;
		if (i !== book.authors.length - 1) {
			authors += ',';
		}
	});

	return authors;
}

function getAuthorIdFromUrl(url: string): string {
	return url.replace('https://', '').split('/')[2];
}
