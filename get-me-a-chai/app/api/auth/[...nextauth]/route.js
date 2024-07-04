// "use server"
import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDb from '@/db/connectDb'

const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == 'github') {

        await connectDb()

        // Check if the user already exists in the database
        const currentUser = await User.findOne({ email: email })
        // console.log(currentUser)
        if (!currentUser) {
          // Create a new User
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
        }
        return true
      }
    },
    async session({ session, user, token }) {
      const dbuser = await User.findOne({ email: session.user.email })
      session.user.name = dbuser.username
      return session
    },
  },
})

export { authoptions as GET, authoptions as POST }