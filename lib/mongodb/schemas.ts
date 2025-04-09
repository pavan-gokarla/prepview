import mongoose, { Schema, model, models } from "mongoose";

interface IUser {
    _id: string;
    name: string;
    email: string;
    credits: number;
}


const userSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    credits: { type: Number, default: 10 },
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



const interviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    questions: { type: [String], required: true },
    techStack: { type: [String], required: true },
    role: { type: String, required: true },
    experienceLevel: { type: Number, required: true },
}, {
    timestamps: true,
})



export const Interview = models?.Interview || model<IInterview>("Interview", interviewSchema);


