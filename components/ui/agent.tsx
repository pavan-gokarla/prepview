"use client";

import {
    createFeedback,
    doesUserHaveCredits,
    getUser,
    hasUserVerified,
} from "@/lib/actions/actions";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import CustomAvatar from "./CustomAvatar";
import { vapi } from "@/lib/vapi/vapi.sdk";
import { useRouter } from "next/navigation";
import { interviewer } from "@/lib/constants/index";

import { toast } from "sonner";

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

const Agent = ({
    type,
    id,
    questions,
    techStack,
}: {
    type: "generate" | "interview";
    id?: string;
    questions?: string[];
    techStack?: string;
}) => {
    const [user, setUser] = useState<Session | null>(null);
    const router = useRouter();
    const [callStatus, setCallStatus] = useState<CallStatus>(
        CallStatus.INACTIVE
    );
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
            console.log("call ended");
            setCallStatus(CallStatus.FINISHED);
            handleGenerateFeedback(messages, type);
            vapi.stop();
        };

        const onMessage = (message: any) => {
            if (
                message.type === "transcript" &&
                message.transcriptType === "final"
            ) {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                };
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
            handleGenerateFeedback(messages, type);
            router.push("/my-interviews");
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

    const handleGenerateFeedback = async (
        messages: SavedMessage[],
        type: string
    ) => {
        if (type === "generate") return;
        const res = await createFeedback(
            id!,
            user?.user?.email!,
            messages,
            techStack!
        );
        if (res.success) {
            console.log("res", res);
            toast.success("Feedback created sucessfully ");
            router.push("/feedbacks");
        } else {
            toast.info("Failed to create feedback");
            router.push("/all-interviews");
        }
    };
    useEffect(() => {
        //TODO handle feedback

        if (callStatus === CallStatus.FINISHED) {
            if (type === "generate") {
                router.push("/my-interviews");
            } else {
                handleGenerateFeedback(messages, type);
            }
        }
    }, [messages, callStatus, id, router, type]);
    const handleStartCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        const isVerified = await hasUserVerified(user?.user?.email!);
        if (!isVerified) {
            toast.error("Please verify your email");
            setCallStatus(CallStatus.INACTIVE);
            return;
        }

        const hasCredits = await doesUserHaveCredits(30, user?.user?.email!);
        if (!hasCredits) {
            toast.error("Please add your credits");
            setCallStatus(CallStatus.INACTIVE);
            return;
        }

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
                formattedQuestions = questions!
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
        vapi.say(
            "thank you for taking the interview, have a nice day",
            true,
            false
        );
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };
    return (
        <div className="w-[80vw]  flex  gap-10 flex-col justify-around items-center ">
            <div id="voice-bot " className=" flex gap-40">
                <div
                    id="interviewer"
                    className="agent-card rounded-[1vw] flex justify-center items-center  relative "
                >
                    <div
                        className={`w-16 h-16 bg-white absolute top-40% z-10  rounded-full   opacity-20 ${
                            isSpeaking && "animate-ping"
                        }  `}
                    ></div>
                    <CustomAvatar src="/robot.jpg" />
                </div>
                <div
                    id="candidate"
                    className="agent-card rounded-[1vw] hidden lg:flex  justify-center items-center "
                >
                    <CustomAvatar src="/user.png" />
                </div>
            </div>
            <div className="text-xl">
                {callStatus == CallStatus.INACTIVE ? (
                    <Button
                        onClick={handleStartCall}
                        variant="default"
                        className="bg-[var(--stem--green--500)] text-[var(--day--blue--900)] rounded-full text-xl "
                    >
                        Call
                    </Button>
                ) : callStatus == CallStatus.CONNECTING ? (
                    <Button
                        variant="default"
                        className="bg-[var(--stem--green--500)] text-[var(--day--blue--900)] rounded-full "
                    >
                        <span className="loading loading-dots loading-md"></span>
                    </Button>
                ) : (
                    <Button
                        onClick={handleDisconnect}
                        variant="secondary"
                        className="bg-[var(--sunglow--800)] text-[var( --happy--orange--100)] rounded-full  text-xl  "
                    >
                        End
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Agent;
