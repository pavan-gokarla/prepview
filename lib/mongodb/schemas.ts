import mongoose, { Document } from "mongoose";
import { Schema, model, models } from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 10, required: false },
});

export const User = models?.User || model<IUser>("User", userSchema);

export interface IInterview {
    _id: string;
    type: string;
    email: string;
    questions: string[];
    techStack: string[];
    role: string;
    level: number;
    createdAt: Date;
    updatedAt: Date;
}

const interviewSchema = new Schema(
    {
        email: { type: String, required: true },
        questions: { type: [String], required: true },
        techStack: { type: [String], required: true },
        role: { type: String, required: true },
        level: { type: Number, required: true },
        type: { type: String, required: true },
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

export interface InterviewFeedback extends Document {
    totalScore: number;
    categoryScores: CategoryScore[];
    strengths: string[];
    areasForImprovement: string[];
    finalAssessment: string;
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

const InterviewFeedbackSchema = new Schema<InterviewFeedback>({
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
});

const InterviewFeedbackModel =
    mongoose.models.InterviewFeedback ||
    mongoose.model<InterviewFeedback>(
        "InterviewFeedback",
        InterviewFeedbackSchema
    );

export default InterviewFeedbackModel;
