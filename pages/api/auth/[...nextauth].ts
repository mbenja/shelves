import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from '../../../lib/auth/passwords';
import prisma from '../../../prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.userId = user.id;
			}

			return token;
		}
	},
	pages: {
		signIn: '/auth'
	},
	providers: [
		CredentialsProvider({
			id: 'credentials-provider',
			name: 'Credentials',
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials');
				}

				try {
					const maybeUser = await prisma.user.findFirst({
						where: {
							email: credentials.email
						},
						select: {
							id: true,
							email: true,
							password: true
						}
					});

					if (!maybeUser) {
						throw new Error('User does not exist');
					} else {
						const isValid = await verifyPassword(
							credentials.password,
							maybeUser.password
						);

						if (!isValid) {
							throw new Error('Invalid credentials');
						}

						return {
							id: maybeUser.id,
							email: maybeUser.email
						};
					}
				} catch (error) {
					throw error instanceof Error ? error.message : 'Unknown Error';
				}
			}
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt'
	}
});
