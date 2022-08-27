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
		const goal = await prisma.goal.findFirst({
			where: {
				userId: token.userId,
				year: new Date().getFullYear()
			}
		});

		return res.status(200).json(goal);
	} catch (error) {
		return res.status(500).json(resolveErrorMessage(error));
	}
}
