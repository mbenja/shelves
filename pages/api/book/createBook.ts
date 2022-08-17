import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { resolveErrorMessage } from '../../../lib/util';
import prisma from '../../../prisma';
import { Author } from '@prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getToken({ req });
	if (!token) return res.status(401).end();

	try {
		const newBook = await prisma.book.create({
			data: {
				bookshelf: {
					connect: {
						id: req.body.book.bookshelfId
					}
				},
				userId: token.userId,
				cover: req.body.book.cover,
				isbn: req.body.book.isbn,
				pageCount: req.body.book.pageCount,
				publishDate: req.body.book.publishDate,
				subtitle: req.body.book.subtitle,
				title: req.body.book.title,
				yearRead: req.body.book.yearRead,
				rating: req.body.book.rating,
				authors: {
					createMany: {
						data: req.body.book.authors.map(
							(author: Pick<Author, 'id' | 'name'>) => {
								return { id: author.id, name: author.name };
							}
						)
					}
				}
			},
			include: {
				authors: true
			}
		});

		return res.status(200).json(newBook);
	} catch (error) {
		const message = resolveErrorMessage(error);
		return res.status(500).json(message);
	}
}
