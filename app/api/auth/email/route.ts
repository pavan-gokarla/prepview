import { connectDB } from "@/lib/mongodb/mongoDbConnection";
import { User } from "@/lib/mongodb/schemas";

export async function POST(req: Request) {
    const { email } = await req.json();
    await connectDB();
    const res = await User.exists({ email: email });
    if (res) return Response.json({ success: true }, { status: 200 });
    return Response.json({ success: false }, { status: 200 });
}
