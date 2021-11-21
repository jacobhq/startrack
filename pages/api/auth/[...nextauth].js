import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  debug: false,
  session: { jwt: true },
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
    jwt({ token, account }) {
      if(account) {
        token.accessToken = account.access_token
      }
      return token
    }    
  }
})
