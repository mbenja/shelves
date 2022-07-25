import { NextApiRequest, NextApiResponse } from 'next';

import { hashPassword } from '../../../lib/auth/passwords';
import prisma from '../../../prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email, password } = req.body;

	try {
		const newUser = await prisma.user.create({
			data: {
				email,
				password: await hashPassword(password)
			},
			select: {
				id: true,
				email: true
			}
		});

		return res.status(200).json({
			status: 200,
			data: newUser
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown Error';

		return res.status(500).json({
			status: 500,
			message
		});
	}
}
