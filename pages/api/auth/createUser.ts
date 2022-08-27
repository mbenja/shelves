import { NextApiRequest, NextApiResponse } from 'next';

import { hashPassword } from '../../../lib/auth/passwords';
import { resolveErrorMessage } from '../../../lib/util';
import { prisma } from '../../../prisma';

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
			}
		});

		return res.status(200).json(newUser);
	} catch (error) {
		const message = resolveErrorMessage(error);

		return res.status(500).json(message);
	}
}
