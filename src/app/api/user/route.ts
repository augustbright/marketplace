import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return new Response("Unauthorized", { status: 401 });
    }

    return new Response(`Hello ${email}`);
};