import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: {scope: 'public_repo' } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt(token, user, account = {}, profile, isNewUser) {
      if ( account.provider && !token[account.provider] ) {
        token[account.provider] = {};
      }

      if ( account.accessToken ) {
        token[account.provider].accessToken = account.accessToken;
      }

      if ( account.refreshToken ) {
        token[account.provider].refreshToken = account.refreshToken;
      }

      return token;
    },
  }
})
