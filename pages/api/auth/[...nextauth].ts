// pages/api/auth/[...nextauth.js]
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import prisma from "lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  debug: false,
  jwt: {
    secret: process.env.SECRET
  },
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: 'public_repo user:follow' } },
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
})