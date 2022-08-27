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

	const currentYear = new Date().getFullYear();

	try {
		const updatedGoal = await prisma.goal.upsert({
			where: {
				userId_year: {
					userId: token.userId,
					year: currentYear
				}
			},
			create: {
				year: currentYear,
				value: req.body.goal.value,
				user: {
					connect: {
						id: token.userId
					}
				}
			},
			update: {
				value: req.body.goal.value
			}
		});

		return res.status(200).json(updatedGoal);
	} catch (error) {
		return res.status(500).json(resolveErrorMessage(error));
	}
}
