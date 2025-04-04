"use server"

import { auth, signIn, signOut } from "@/auth"

export async function GoogleSignIn() {
    await signIn('google', {
        redirectTo: "/dashboard",
        redirect: true
    })
}



export async function SignOutFromAll() {
    await signOut()
}


export async function GetUser() {
    return await auth()
}