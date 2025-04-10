"use client"


import { Form } from '@/components/ui/form'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'





const Login = () => {
    return (
        <div className='max-h-screen w-screen bg-[var(--noble--black--700)] flex' >
            <div className=' h-screen w-screen lg:w-[70vw] py-[20vh] px-[15vw] flex flex-col justify-center items-center ' >
                <Form signIn={true} />
                <div id='go-to' className='mt-6.5' >
                    <p className='text-[var(--noble--black--400)] ' >
                        Don't have an account? <Link href="sign-up" className='cursor-pointer text-[var(--noble--black--100)] ' >Sign Up</Link>
                    </p>
                </div>
            </div>
            <div className='h-screen hidden lg:flex w-[50vw] ' >
                <Image src={"/abstract-03.png"} alt='abstart-03' height={1000} width={2400}  ></Image>
            </div>
        </div >
    )
}

export default Login