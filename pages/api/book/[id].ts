import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { resolveErrorMessage } from '../../../lib/util';
import { prisma } from '../../../prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getToken({ req });
	if (!token) return res.status(401).end();

	try {
		const book = await prisma.book.findUnique({
			where: {
				id_userId: {
					id: req.query['id'] as string,
					userId: token.userId
				}
			},
			include: {
				authors: true
			}
		});

		res.status(200).json(book);
	} catch (error) {
		res.status(500).json(resolveErrorMessage(error));
	}
}
