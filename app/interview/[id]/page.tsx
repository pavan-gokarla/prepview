import Agent from '@/components/ui/agent'
import { getInterviewById, getInterviews, getInterviewsByEmail } from '@/lib/actions/actions'
import { IInterview } from '@/lib/mongodb/schemas'
import { redirect } from 'next/navigation'

import React from 'react'

const InterViewId = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const interview: IInterview = await getInterviewById(id)
    if (!interview) redirect("/")
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-10' >

            <div id="heading-box">
                <h1 className='text-[var(--noble--black--0)] text-4xl text-center  ' >{id} Interview</h1>
                <p className='text-[var(--noble--black--300)] text-center' >Start creating your personalized interview</p>
            </div>
            <Agent type='interview' questions={interview.questions} id={id} />
        </div>
    )
}

export default InterViewId