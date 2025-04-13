import { auth } from '@/auth'
import FeedbackCard from '@/components/ui/FeedbackCard'
import InterviewCard from '@/components/ui/InterviewCard'
import { getFeedbacks } from '@/lib/actions/actions'
import Link from 'next/link'
import React from 'react'

const FeedBacks = async () => {
    const user = await auth()
    const feedbacks = await getFeedbacks(user?.user?.email!)
    return (
        <div className='flex flex-col justify-center items-center gap-10 p-10' >

            <div id="heading-box">
                <h1 className='text-[var(--noble--black--0)] text-4xl text-center  ' >Your Feedbacks</h1>
                <p className='text-[var(--noble--black--300)] text-center' >Navigate through popular interviews</p>
            </div>
            {
                feedbacks.length > 0 ? <div id='interviews' className='grid grid-cols-3 gap-10 h-full w-full px-10 '  >
                    {
                        feedbacks.map((val, index) => <FeedbackCard key={val._id} feedback={val} ></FeedbackCard>)
                    }
                </div> : (
                    <div className='h-full w-full flex  flex-col justify-center items-center ' >
                        <p className='text-xl' >Their are no Feedbacks Take interview </p>
                        <Link href='/all-interviews' className='text-[var(--stem--green--500)]'  >Take Interview</Link>
                    </div>
                )
            }
        </div>
    )
}

export default FeedBacks