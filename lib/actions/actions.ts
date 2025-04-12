"use server";
import { ApiResponse } from "../models/types";

import { auth, signIn } from "@/auth";
import { connectDB } from "../mongodb/mongoDbConnection";
import { Interview } from "../mongodb/schemas";

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
    console.log("user", user);
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
        await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
    } catch (error: any) {
        console.error("Error signing in:", error);
        return { success: false, message: error.toString() };
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
