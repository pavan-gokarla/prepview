import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    credits: number;
    isVerified: boolean;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 100, required: false },
    isVerified: { type: Boolean, default: true, required: false },
});

export const User = models?.User || model<IUser>("User", userSchema);

export interface IInterview {
    _id: string;
    email: string;
    questions: string[];
    techStack: string;
    noOfQuestions: number;
    level: number;
    createdAt: Date;
    updatedAt: Date;
}

const interviewSchema = new Schema<IInterview>(
    {
        email: { type: String, required: true },
        questions: { type: [String], required: true },
        techStack: { type: String, required: true },
        level: { type: Number, required: true },
        noOfQuestions: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const Interview =
    models?.Interview || model<IInterview>("Interview", interviewSchema);

export interface CategoryScore {
    name:
        | "Communication Skills"
        | "Technical Knowledge"
        | "Problem Solving"
        | "Cultural Fit"
        | "Confidence and Clarity";
    score: number;
    comment: string;
}

export interface InterviewFeedback {
    _id: string;
    techStack: string;
    email: string;
    interviewId: mongoose.Schema.Types.ObjectId;
    totalScore: number;
    categoryScores: CategoryScore[];
    strengths: string[];
    areasForImprovement: string[];
    finalAssessment: string;
    createdAt: Date;
    updateAt: Date;
}

const CategoryScoreSchema = new Schema<CategoryScore>({
    name: {
        type: String,
        enum: [
            "Communication Skills",
            "Technical Knowledge",
            "Problem Solving",
            "Cultural Fit",
            "Confidence and Clarity",
        ],
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

const InterviewFeedbackSchema = new Schema<InterviewFeedback>(
    {
        interviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interview",
            required: true,
        },
        techStack: { type: String, required: true },
        email: { type: String, required: true },
        totalScore: {
            type: Number,
            required: true,
        },
        categoryScores: {
            type: [CategoryScoreSchema],
            validate: {
                validator: function (val: CategoryScore[]) {
                    return val.length === 5;
                },
                message: "Exactly 5 category scores are required.",
            },
            required: true,
        },
        strengths: {
            type: [String],
            required: true,
        },
        areasForImprovement: {
            type: [String],
            required: true,
        },
        finalAssessment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const InterviewFeedbackModel =
    mongoose.models.InterviewFeedback ||
    mongoose.model<InterviewFeedback>(
        "InterviewFeedback",
        InterviewFeedbackSchema
    );

export default InterviewFeedbackModel;
