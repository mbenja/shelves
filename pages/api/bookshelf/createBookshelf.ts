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
		const newBookshelf = await prisma.bookshelf.create({
			data: {
				userId: token.userId,
				name: req.body.name
			}
		});

		return res.status(200).json(newBookshelf);
	} catch (error) {
		const message = resolveErrorMessage(error);
		return res.status(500).json(message);
	}
}
