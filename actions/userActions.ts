"use server"

import { signIn, signOut } from "@/auth"

export async function GoogleSignIn() {
    await signIn('google')
}



export async function SignOutFromAll() {
    await signOut()
}   