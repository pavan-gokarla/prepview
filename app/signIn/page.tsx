import { auth, signIn } from '@/auth'
import React from 'react'

const SignIn = () => {
    async function handleSignIn() {
        const user = await auth()
        console.log(user)
    }
    handleSignIn()
    return (
        <div>
            <button onClick={async () => {
                "use server"
                await signIn("google")
            }} >Sign In</button>
        </div>
    )
}

export default SignIn