import Agent from '@/components/ui/agent'
import React from 'react'

const CreateInterview = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-10' >

            <div id="heading-box">
                <h1 className='text-[var(--noble--black--0)] text-4xl text-center  ' >Create Interview</h1>
                <p className='text-[var(--noble--black--300)] text-center' >Start creating your personalized interview</p>
            </div>
            <Agent type='generate' />
        </div>
    )
}

export default CreateInterview