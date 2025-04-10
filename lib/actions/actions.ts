"use server"

import { auth, signIn } from "@/auth"


export async function signInGoogle() {
    await signIn("google", {
        redirectTo: "/",
    })
}

export async function signInGithub() {
    await signIn("github")
}


export async function getUser() {
    const user = await auth()
    console.log(user)
    return user
}