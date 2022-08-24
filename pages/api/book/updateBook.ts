import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { resolveErrorMessage } from '../../../lib/util';
import prisma from '../../../prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getToken({ req });
	if (!token) return res.status(401).end();

	try {
		const updatedBook = await prisma.book.update({
			where: {
				id_userId: {
					id: req.body.book.id,
					userId: token.userId
				}
			},
			data: {
				cover: req.body.book.cover,
				hasCustomCover: req.body.book.hasCustomCover,
				yearRead: req.body.book.yearRead,
				rating: req.body.book.rating
			},
			include: {
				authors: true
			}
		});

		return res.status(200).json(updatedBook);
	} catch (error) {
		return res.status(500).json(resolveErrorMessage(error));
	}
}
