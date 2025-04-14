import React from "react";
import { Button } from "./button";
import { IInterview, InterviewFeedback } from "@/lib/mongodb/schemas";
import dayjs from "dayjs";
import Link from "next/link";

const FeedbackCard = ({ feedback }: { feedback: InterviewFeedback }) => {
    const { techStack, email, createdAt, _id } = feedback;
    const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");
    return (
        <div className="bg-[var(--noble--black--500)] p-3 rounded-tr-xl  rounded-bl-xl flex flex-col gap-4 justify-between ">
            <div id="content">
                <h2 className=" lg:text-2xl  capitalize text-[var(--noble--black--0)]  ">
                    {techStack} Feedback
                </h2>
                <p className="text-[bg-[var(--noble--black--900)]">
                    {formattedDate}
                </p>
            </div>
            <Link href={`feedbacks/${_id}`}>
                <Button
                    variant="default"
                    className="bg-[var(--stem--green--500)] text-[var(--day--blue--900)] rounded-full "
                >
                    {" "}
                    View Feedback{" "}
                </Button>
            </Link>
        </div>
    );
};

export default FeedbackCard;
