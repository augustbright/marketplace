import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUserInfoFromSession = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;
    if ( !session || !user || !email) {
        return null;
    };

    return {
        session,
        user,
        email
    };
};