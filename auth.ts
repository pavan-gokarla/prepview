import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    callbacks: {
        signIn: async ({ user, account, profile, email, credentials }) => {
            if (account?.provider === "google") {
                console.log("Google account", account)
                console.log("User profile", profile)
                return true
            }
            return false
        }
    }
})