"use server";

import { auth } from "@/auth";
import InterviewCard from "@/components/ui/InterviewCard";
import { getInterviewsByEmail } from "@/lib/actions/actions";
import { IInterview } from "@/lib/mongodb/schemas";
import Link from "next/link";
import React from "react";

const MyInterviews = async () => {
    const user = await auth();
    const interveiws: IInterview[] = await getInterviewsByEmail(
        user?.user?.email!
    );

    return (
        <div className="flex flex-col justify-center items-center gap-10 p-10">
            <div id="heading-box">
                <h1 className="text-[var(--noble--black--0)] text-4xl text-center  ">
                    Your Interviews
                </h1>
                <p className="text-[var(--noble--black--300)] text-center">
                    Navigate through interviews created by you
                </p>
            </div>
            {interveiws.length > 0 ? (
                <div
                    id="interviews"
                    className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-10 h-full w-full px-10 "
                >
                    {interveiws.map((val, index) => (
                        <InterviewCard
                            key={val._id}
                            interview={val}
                        ></InterviewCard>
                    ))}
                </div>
            ) : (
                <div className="h-full w-full flex  flex-col justify-center items-center ">
                    <p className="text-xl">
                        You Haven't created any interviews{" "}
                    </p>
                    <Link
                        href="/create-interview"
                        className="text-[var(--stem--green--500)]"
                    >
                        Create Interview
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyInterviews;
