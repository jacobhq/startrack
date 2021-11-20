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
  
})