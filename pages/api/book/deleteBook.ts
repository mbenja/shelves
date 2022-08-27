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
		await prisma.book.delete({
			where: {
				id_userId: {
					id: req.body.id,
					userId: token.userId
				}
			}
		});

		return res.status(200).end();
	} catch (error) {
		return res.status(500).json(resolveErrorMessage(error));
	}
}
