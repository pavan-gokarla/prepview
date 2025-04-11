import { z } from "zod";
import { connectDB } from "@/lib/mongodb/mongoDbConnection";
import { User } from "@/lib/mongodb/schemas";

const bcrypt = require("bcrypt");
const UserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: Request) {
    await connectDB();
    const { email, password } = await req.json();
    try {
        const parsedData = UserSchema.parse({ email, password });

        const user = await User.findOne({
            email: parsedData.email,
        });
        if (
            !user ||
            !(await bcrypt.compare(parsedData.password, user.password))
        ) {
            return Response.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            );
        }
        return Response.json(
            {
                name: user.name,
                email: user.email,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json(
            { success: false, message: error.toString() },
            { status: 400 }
        );
    }
}
