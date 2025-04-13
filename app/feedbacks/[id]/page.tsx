import { Button } from '@/components/ui/button'
import CategoryCard from '@/components/ui/CategoryCard'
import { getFeedbackById } from '@/lib/actions/actions'
import { InterviewFeedback } from '@/lib/mongodb/schemas'
import dayjs from 'dayjs'
import { Star } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const FeedBackForm = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const feedback: InterviewFeedback = await getFeedbackById(id)
    const formattedDate = dayjs(
        feedback.createdAt || Date.now()
    ).format("MMM D, YYYY");


    return (
        <div className='w-full  flex flex-col  justify-center items-center gap-10 p-4 ' >

            <div id="heading-box" className='flex flex-col gap-3'  >
                <h1 className='text-[var(--noble--black--0)] lg:text-4xl md:text-4xl text-center text-xl ' >Feedback for {feedback.techStack} Interview</h1>
                <div className='text-[var(--noble--black--300)] lg:text-xl md:text-xl text-s flex flex-col lg:flex md:flex  lg:flex-row md:flex-row  lg:justify-around md:justify-around justify-between gap-2' >
                    <div id='score' className='flex gap-2 ' >
                        <Star className='text-[var(--stem--green--500)]' />
                        Overall Impression: {feedback.totalScore}/100
                    </div>
                    <div id="date">
                        {formattedDate}
                    </div>
                </div>
            </div>
            <div id="content" className=' w-full '>
                <div className='flex justify-center flex-col items-center w-[80%] gap-6 '>
                    <div id="break-down" className='flex flex-col gap-7' >
                        <div className='text-lg lg:text-3xl underline underline-offset-8' >Breakdown of Evaluation :</div>
                        <div id="categorical-evaluation" className='flex flex-col gap-4' >
                            {
                                feedback.categoryScores.map((cat, index) =>
                                    <CategoryCard category={cat} key={index} />
                                )
                            }
                        </div>
                    </div>
                    <div id='final-verdict' className='flex flex-col gap-7'   >
                        <div className='text-lg lg:text-3xl underline underline-offset-8' >Final Verdict :</div>
                        <p className='line-clamp line-clamp-4 text-[var(--noble--black--300)] text-xl ml-4' >{feedback.finalAssessment}</p>
                    </div>
                </div>
            </div>
            <Link href={`/`} ><Button variant='default' className='bg-[var(--stem--green--500)] text-[var(--day--blue--900)] rounded-full ' > Back To Home</Button></Link>

        </div >
    )
}

export default FeedBackForm