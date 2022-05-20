// pages/api/auth/[...nextauth.js]
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
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
      authorization: { params: { scope: 'public_repo' } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // @ts-ignore
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
})