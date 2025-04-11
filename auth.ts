import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Github,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `${process.env.DOMAIN}/api/auth/sign-in`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const user = {
                    ...(await res.json()),
                    image: process.env.USER_AVATAR,
                };

                if (res.ok && user) {
                    return user;
                }
                return null;
            },
        }),
    ],

    callbacks: {
        signIn: async ({ user, account, profile }) => {
            return true;
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },

    session: {
        strategy: "jwt",
        maxAge: 3600, //seconds ,
    },
});
