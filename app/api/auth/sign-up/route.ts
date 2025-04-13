const bcrypt = require("bcrypt");
import { connectDB } from "@/lib/mongodb/mongoDbConnection";
import { User } from "@/lib/mongodb/schemas";
import { z, ZodError } from "zod";

const UserSchmema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

export async function POST(req: Request) {
    await connectDB();
    const { email, password, name } = await req.json();
    try {
        const parsedData = UserSchmema.parse({ email, password, name });
        const hashedPassword = await bcrypt.hash(parsedData.password, 10);
        parsedData.password = hashedPassword;
        await User.create(parsedData);
    } catch (error: ZodError | any) {
        if (error instanceof ZodError) {
            return Response.json(
                { success: false, message: error.issues[0].message },
                { status: 400 }
            );
        }
        return Response.json(
            { success: false, message: error.toString() },
            { status: 500 }
        );
    }

    return Response.json(
        { success: true, message: "User created successfully" },
        { status: 201 }
    );
}
