"use client"

import { Mail, Lock, User, LockOpen } from 'lucide-react'
import { Button } from "./button";
import { Input } from "./input";
import { useState } from 'react';
import { getUser, signInGithub, signInGoogle, signInUser, signUp } from '@/lib/actions/actions';
import { toast } from 'sonner';
import { signIn } from "@/auth"
import { useNavigate } from '@/lib/custom-hooks/hooks';




export function Form({ signIn }: { signIn: boolean }) {
    const [submitting, setSubmitting] = useState(false)
    const [googleSignIn, setGoogleSignIn] = useState(false)
    const [githubSignIn, setGithubSignIn] = useState(false)
    const navigate = useNavigate()
    const userAction = async (formData: FormData) => {
        setSubmitting(true)
        if (signIn) {
            const res = await signInUser(formData)
            if (res.success) {
                navigate("/")
            }
        }
        else {
            const res = await signUp(formData)
            toast.info(res.message)
            if (res.success) {
                navigate("/sign-in")
            }
        }
        setSubmitting(false)
    }



    return (<div className=' text-white w-[100%] ' >
        <div className='flex flex-col gap-1.5' >
            <p className='text-[var(--noble--black--0)] text-3xl ' >Let's <span >Prepare!</span></p>
            <p className='text-[var(--noble--black--300)]' >{signIn ? "Sign in" : "Sign Up"} to Prepview and start preparing for interviews</p>
        </div>
        <form action={userAction} id="inputs" className="mt-[1.5rem] flex flex-col justify-around gap-5">
            {!signIn && (
                <Input name="name" type="text" placeholder="Your name" >
                    <User className="absolute top-[30%] right-[3%]" size={16} />
                </Input>
            )}

            <Input type="email" name="email" placeholder="Email" >
                <Mail className="absolute top-[30%] right-[3%]" size={16} />
            </Input>

            <Input name="password" type="password" placeholder="Password" >
                <Lock className="absolute top-[30%] right-[3%]" size={16} />
            </Input>

            {!signIn && (
                <Input name="confirm-password" type="password" placeholder="Confirm password" >
                    <LockOpen className="absolute top-[30%] right-[3%]" size={16} />
                </Input>
            )}

            {/* #TODO to add forget password feild */}
            {/* {
                signIn && (
                    <div id='forget' className='mt-0.5 flex flex-col items-end gap-5 ' >
                        <Button type='button' variant='link' className='text-[16px] cursor-pointer text-[var(--noble--black--300)] ' >Forgot Password</Button>
                    </div>
                )
            } */}
            <div className="sign-in  flex  mt-[0.5rem] gap-3 " >
                <Button type='submit' disabled={submitting} variant="default" className=' flex-grow bg-[var(--stem--green--500)] text-[var(--day--blue--900)] hover:bg-[var(--stem--green--400)]  ' >{signIn ? "Sign In" : "Sign Up"}</Button>
            </div>
        </form>
        {
            signIn && (
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-[var(--noble--black--400)] text-xs">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
            )
        }
        {
            signIn && (
                <div id='social-providers ' className='flex justify-around gap-3 ' >
                    <Button disabled={googleSignIn} onClick={async () => {
                        setGoogleSignIn(true)
                        await signInGoogle()
                        setGoogleSignIn(false)
                        getUser()
                    }} variant="ghost" className='flex-grow bg-[var(--noble--black--600)] text-[var(--noble--black--400)] '  > <svg xmlns="http://www.w3.org/2000/svg" className='fill-amber-50' viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>Google Account</Button>
                    <Button
                        disabled={githubSignIn} onClick={async () => {
                            setGithubSignIn(true)
                            await signInGithub()
                            setGithubSignIn(false)
                            getUser()
                        }}
                        variant="ghost" className='flex-grow bg-[var(--noble--black--600)] text-[var(--noble--black--400)] '  ><svg xmlns="http://www.w3.org/2000/svg" className='fill-amber-50' viewBox="0 0 496 512"> <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>Github Account</Button>
                </div>
            )
        }
    </div>)
}