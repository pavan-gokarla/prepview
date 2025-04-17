export const runtime = "nodejs";
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
            const res: Response = await fetch(
                `${process.env.DOMAIN}/api/auth/email`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: user.email,
                    }),
                    headers: { "Content-Type": "application/json" },
                }
            );
            const { success } = await res.json();
            console.log("success", success);
            return success;
        },
    },
    pages: {
        signIn: "/sign-in",
        error:"/sign-in"
    },

    session: {
        strategy: "jwt",
        maxAge: 3600, //seconds ,
    },
});
