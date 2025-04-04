"use client"

import { GoogleSignIn } from '@/actions/userActions'
import { auth } from '@/auth'
import React from 'react'

const SignIn = () => {

    return (
        <div>
            <button onClick={async () => {

                await GoogleSignIn()
            }} >Sign In</button>
        </div>
    )
}

export default SignIn