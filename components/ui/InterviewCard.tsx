import React from 'react'
import { Button } from './button'
import { IInterview } from '@/lib/mongodb/schemas'
import dayjs from "dayjs";
import Link from 'next/link';


const InterviewCard = ({ interview }: { interview: IInterview }) => {
    const { type, role, techStack, email, createdAt, level, _id } = interview
    const formattedDate = dayjs(
        createdAt || Date.now()
    ).format("MMM D, YYYY");
    return <div className='bg-[var(--noble--black--500)] p-3 rounded-tr-xl  rounded-bl-xl flex flex-col gap-4 ' >

        <span id='top' className=' md:ml-[50%] ml-0  rounded-tr-xl  text-center  rounded-bl-xl bg-[linear-gradient(135deg,_#646a75,_#565b63,_#56595e)]   capitalize text-[var(--noble--black--900)] ' >{type}</span>

        <div id="content">
            <h2 className=' lg:text-2xl  capitalize text-[var(--noble--black--0)]  ' >{role} Interview</h2>
            <p className='text-[bg-[var(--noble--black--900)]' >{formattedDate}</p>
        </div>
        <Link href={`interview/${_id}`} ><Button variant='default' className='bg-[var(--stem--green--500)] text-[var(--day--blue--900)] rounded-full ' > Take Interview </Button></Link>
    </div>
}

export default InterviewCard