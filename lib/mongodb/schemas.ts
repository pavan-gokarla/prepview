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

interface IInterview {
    userId: string;
    questions: string[];
    techStack: string[];
    role: string;
    experienceLevel: number;
    createdAt: Date;
    updatedAt: Date;
}

const interviewSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        questions: { type: [String], required: true },
        techStack: { type: [String], required: true },
        role: { type: String, required: true },
        experienceLevel: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const Interview =
    models?.Interview || model<IInterview>("Interview", interviewSchema);
