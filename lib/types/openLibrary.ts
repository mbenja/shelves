export type GetOpenLibraryBookResponse = {
	[key: string]: OpenLibraryBook;
};

export type OpenLibraryBook = {
	authors: { name: string }[];
	cover?: { small?: string; medium?: string; large?: string };
	identifiers: {
		isbn_10?: string;
		isbn_13?: string;
	};
	number_of_pages?: number;
	publishers?: { name: string }[];
	publish_date?: string;
	subtitle?: string;
	title: string;
};
