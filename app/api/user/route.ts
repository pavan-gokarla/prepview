import { NextRequest } from "next/server"



import { User } from "@/lib/mongodb/schemas"
import { connectDB } from "@/lib/mongodb/mongoDbConnection"


export const POST = async (req: NextRequest) => {
    await connectDB();
    const body = await req.json()
    const { name, email, password } = body
    console.log("Received data:", body)
    if (!name || !email || !password) {
        return new Response(JSON.stringify({ message: "Please fill all the fields" }), { status: 400 })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 })
    }
    const newUser = new User({

        name,
        email,
        password,
        credits: 10
    })
    await newUser.save()

    return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 })
}