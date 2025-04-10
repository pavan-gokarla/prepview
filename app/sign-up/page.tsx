import { Form } from '@/components/ui/form'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'




const FormWrapper = () => {
    return (
        <div className='max-h-screen w-screen bg-[var(--noble--black--700)] flex' >
            <div className='h-screen hidden lg:flex w-[50vw]  rounded-3xl' >
                <Image src={"/robot.jpg"} alt='abstart-03' height={1000} width={2400}  ></Image>
            </div>
            <div className=' h-screen w-screen lg:w-[70vw] py-[20vh] px-[15vw] flex flex-col justify-center items-center ' >
                <Form signIn={false} />
                <div id='go-to' className='mt-6.5' >
                    <p className='text-[var(--noble--black--400)] ' >
                        Already have an account? <Link href="login" className='cursor-pointer text-[var(--noble--black--100)] ' >Log in</Link>
                    </p>
                </div>
            </div>
        </div >
    )
}

export default FormWrapper