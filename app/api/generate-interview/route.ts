import { connectDB } from "@/lib/mongodb/mongoDbConnection";
import { Interview } from "@/lib/mongodb/schemas";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
export async function POST(req: Request) {
    await connectDB();

    const { role, type, userId, noOfQuestions, techStack, level } =
        await req.json();

    try {
        const { text } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare questions for a job interview.
              The job role is ${role}.
              The job experience level is ${level}.
              The tech stack used in the job is: ${techStack}.
              The focus between behavioural and technical questions should lean towards: ${type}.
              The amount of questions required is: ${noOfQuestions}.
              Please return only the questions, without any additional text.
              The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
              Return the questions formatted like this:
              ["Question 1", "Question 2", "Question 3"]
              
              Thank you! <3
          `,
        });

        const interview = {
            role: role,
            type: type,
            level: level,
            techStack: techStack.split(","),
            questions: JSON.parse(text),
            userId: userId,
            noOfQuestions: noOfQuestions,
        };
        await Interview.create(interview);
        return Response.json({ success: true, message: text }, { status: 200 });
    } catch (error: any) {
        console.error("error occured", error.message);
    }
}
