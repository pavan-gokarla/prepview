import mongoose, { Schema, model, models } from "mongoose";

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    credits: number;
}


const userSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 10 },
});

export const User = models?.User || model<IUser>("User", userSchema);


interface IInterview {
    userId: string;
    questions: string[];
    techStack: string[];
    role: string;
    difficulty: number;
    createdAt: Date;
    updatedAt: Date;
}



const interviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    questions: { type: [String], required: true },
    techStack: { type: [String], required: true },
    role: { type: String, required: true },
    difficulty: { type: Number, required: true },
}, {
    timestamps: true,
})



export const Interview = models?.Interview || model<IInterview>("Interview", interviewSchema);


