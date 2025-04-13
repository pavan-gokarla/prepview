"use server";
import { ApiResponse } from "../models/types";

import { auth, signIn, signOut } from "@/auth";
import { connectDB } from "../mongodb/mongoDbConnection";
import InterviewFeedbackModel, { Interview, User } from "../mongodb/schemas";
import { SavedMessage } from "@/components/ui/agent";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { feedbackSchema } from "../mongodb/constants";
import { redirect } from "next/navigation";

export async function signInGoogle() {
    await signIn("google");
    // await getUser();
}

export async function signInGithub() {
    await signIn("github");
    // await getUser();
}

export async function getUser() {
    const user = await auth();

    return user;
}

export async function signUp(formData: FormData): Promise<ApiResponse> {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const confirmPassword = formData.get("confirm-password");

    if (!email || !password || !name || !confirmPassword) {
        return { success: false, message: "All fields are required" };
    }

    if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match" };
    }

    try {
        const res = await fetch(`${process.env.DOMAIN}/api/auth/sign-up`, {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function signInUser(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        return { success: false, message: "All fields are required" };
    }

    try {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
    } catch (error: any) {
        console.error("Error signing in:", error);
        return { success: false, message: "Email or password is incorrect" };
    }

    return { success: true, message: "User signed in successfully" };
}

export async function getInterviewsByEmail(email: string) {
    await connectDB();
    return await Interview.find({ email: email });
}

export async function getInterviews(email: string) {
    await connectDB();
    return await Interview.find({ email: { $ne: email } });
}

export async function getInterviewById(id: string) {
    await connectDB();
    return await Interview.findById({ _id: id });
}

export async function createFeedback(
    interviewId: string,
    email: string,
    transcript: SavedMessage[]
) {
    await connectDB();
    try {
        const formattedTranscript = transcript
            .map(
                (sentence: { role: string; content: string }) =>
                    `- ${sentence.role}: ${sentence.content}\n`
            )
            .join("");
        console.log("formattedTranscript", formattedTranscript);
        const { object } = await generateObject({
            model: google("gemini-2.0-flash-001", {
                structuredOutputs: false,
            }),
            schema: feedbackSchema,
            prompt: `
          You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
          Transcript:
          ${formattedTranscript}
  
          Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
          - **Communication Skills**: Clarity, articulation, structured responses.
          - **Technical Knowledge**: Understanding of key concepts for the role.
          - **Problem-Solving**: Ability to analyze problems and propose solutions.
          - **Cultural & Role Fit**: Alignment with company values and job role.
          - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
          - ** Make sure that the output adheres to the following zod schema
             z.object({
                totalScore: z.number(),
                categoryScores: z.tuple([
                    z.object({
                        name: z.literal("Communication Skills"),
                        score: z.number(),
                        comment: z.string(),
                    }),
                    z.object({
                        name: z.literal("Technical Knowledge"),
                        score: z.number(),
                        comment: z.string(),
                    }),
                    z.object({
                        name: z.literal("Problem Solving"),
                        score: z.number(),
                        comment: z.string(),
                    }),
                    z.object({
                        name: z.literal("Cultural Fit"),
                        score: z.number(),
                        comment: z.string(),
                    }),
                    z.object({
                        name: z.literal("Confidence and Clarity"),
                        score: z.number(),
                        comment: z.string(),
                    }),
                ]),
                strengths: z.array(z.string()),
                areasForImprovement: z.array(z.string()),
                finalAssessment: z.string(),
            });
            thats it.
          `,
            system: "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        });
        console.log("here");
        const feedback = {
            interviewId: interviewId,
            email: email,
            totalScore: object.totalScore,
            categoryScores: object.categoryScores,
            strengths: object.strengths,
            areasForImprovement: object.areasForImprovement,
            finalAssessment: object.finalAssessment,
            createdAt: new Date().toISOString(),
        };
        console.log(feedback);
        await InterviewFeedbackModel.create(feedback);
        return { success: true };
    } catch (error) {
        console.log("error", error);
        return { success: false, error: error };
    }
}

export async function signOutUser() {
    await signOut();
}
export async function emailExists(email: string) {
    await connectDB();
    const res = await User.exists({ email: email });
    console.log(res);
}
