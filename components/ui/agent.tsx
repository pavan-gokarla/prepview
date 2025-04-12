"use client"

import { createFeedback, getUser } from '@/lib/actions/actions';
import { Session } from 'next-auth';
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import CustomAvatar from './CustomAvatar';
import { vapi } from '@/lib/vapi/vapi.sdk';
import { useRouter } from 'next/navigation';
import { interviewer } from '@/lib/constants/index'
import InterViewId from '@/app/interview/[id]/page';



enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

export interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

const Agent = ({ type, id, questions }: { type: 'generate' | 'interview', id?: string, questions?: string[] }) => {
    const [user, setUser] = useState<Session | null>(null);
    const router = useRouter();
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);


    useEffect(() => {

        const fetchUser = async () => {
            setUser(await getUser());
        };
        fetchUser();
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        };

        const onCallEnd = () => {
            console.log("call ended")
            setCallStatus(CallStatus.FINISHED);
            vapi.stop()
        };

        const onMessage = (message: any) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [...prev, newMessage]);

            }
        };

        const onSpeechStart = () => {
            console.log("speech start");
            setIsSpeaking(true);
        };

        const onSpeechEnd = () => {
            console.log("speech end");
            setIsSpeaking(false);
        };

        const onError = (error: Error) => {
            console.log("Error:", error);
        };

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("error", onError);


        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("error", onError);
        };
    }, []);

    useEffect(() => {

        //TODO handle feedback
        const handleGenerateFeedback = async (messages: SavedMessage[]) => {
            const res = await createFeedback(id!, user?.user?.email!, messages)
            router.push('/feedbacks')
        };

        if (callStatus === CallStatus.FINISHED) {
            if (type === "generate") {
                router.push("/my-interviews");
            } else {
                handleGenerateFeedback(messages);
            }
        }
    }, [messages, callStatus, id, router, type]);
    const handleStartCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        console.log(type)
        if (type === "generate") {

            await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
                variableValues: {
                    name: user?.user?.name,
                    email: user?.user?.email,
                },
            });
        } else {
            let formattedQuestions = "";
            if (questions) {
                formattedQuestions = questions
                    .map((question) => `- ${question}`)
                    .join("\n");
            }

            await vapi.start(interviewer, {
                variableValues: {
                    questions: formattedQuestions,
                },
            });
        }
    };
    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.say("thank you for taking the interview, have a nice day", true, false)

        vapi.stop();
    };
    return (
        <div className='w-[80vw]  flex  gap-10 flex-col justify-around items-center '>
            <div id='voice-bot ' className=' flex gap-40' >
                <div id="interviewer" className='agent-card rounded-[1vw] flex justify-center items-center  relative '>
                    <div className={`w-16 h-16 bg-white absolute top-40% z-10  rounded-full   opacity-20 ${isSpeaking && 'animate-ping'}  `} ></div>
                    <CustomAvatar src='/robot.jpg' />
                </div>
                <div id="candidate" className='agent-card rounded-[1vw] hidden lg:flex  justify-center items-center ' >
                    <CustomAvatar src='/user.png' />
                </div>
            </div>
            {
                callStatus == CallStatus.INACTIVE ? <Button onClick={handleStartCall} variant='default' className='bg-[var(--stem--green--500)] text-[var(--day--blue--900)] rounded-full ' >Call</Button> : (
                    callStatus == CallStatus.CONNECTING ? <Button variant='default' className='bg-[var(--stem--green--500)] text-[var(--day--blue--900)] rounded-full ' > ... </Button> : (
                        <Button onClick={handleDisconnect} variant="secondary" className='bg-[var(--sunglow--800)] text-[var( --happy--orange--100)] rounded-full ' >End</Button>
                    )
                )
            }
        </div>
    )
}

export default Agent