
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { MoveRight } from 'lucide-react';

const page = () => {
    redirect("/create-interview")
    const features = [
        {
            heading: " Ace Your Next Interview with an AI Voice Coach",
            description:
                "Your personal AI-powered interviewer tailored to your tech stack, role, and experience level.",
        },
        {
            heading: "🎯 Personalized Interview Simulations",
            description:
                "Generate realistic mock interviews based on your chosen role, tech stack, and seniority.",
        },
        {
            heading: "🧠 Smart Feedback Engine",
            description:
                "Get instant, detailed feedback on your performance—strengths, areas to improve, and how to level up.",
        },
        {
            heading: "🗣️ Practice Like It’s Real",
            description:
                "Answer voice questions in a natural flow—just like the real thing. No scripts, no typing.",
        },
        {
            heading: "🛠️ Tech-Specific Prep",
            description:
                "Whether it’s Frontend, Backend, Data Science, or DevOps—we’ve got you covered.",
        },
        {
            heading: "📈 Track Your Progress",
            description:
                "Monitor your improvement over time with session history and performance insights.",
        },
    ];

    return (
        <div className='overflow-y-auto md:h-screen  p-10 flex flex-col justify-around gap-[30px]' >
            <div id="heading-box">
                <h1 className='text-[var(--noble--black--0)] text-4xl text-center  ' >Create Interview</h1>
                <p className='text-[var(--noble--black--300)] text-center' >Start creating your personalized interview</p>
            </div>
            <div>
                <div id="box" className='gap-3 w-[100%] h-[80%] rounded-3xl bg-[var(--noble--black--500)] flex p-6 justify-between items-center' >
                    <div id="text" className='text-[var(--noble--black--200)] flex flex-col gap-1' >
                        <h2 className='text-2xl text-[var(--noble--black--200)]' >Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                        <div id="points" className='flex flex-col gap-2 text-[var(--noble--black--200)] ' >
                            {
                                features.map((feature, index) => (
                                    <div className='flex gap-1 items-center ' key={index}  ><div className='h-[10px] w-[10px] rounded-full bg-[var(--noble--black--200)] '></div> <p key={index}> {feature.description}</p></div>
                                ))
                            }
                        </div>
                    </div>
                    <div id="img" className='hidden w-[27%] lg:flex object-cover  ' >
                        <Image src={"/robot.png"} width={1900} height={800} alt='robot image' ></Image>
                    </div>
                    <div>
                        <Button onClick={async () => {
                            "use server"
                            redirect("/create-interview")
                        }} className='bg-[var(--stem--green--500)]  text-[var(--day--blue--900)] ' >Create Interview <MoveRight /></Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page