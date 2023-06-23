import { getServerSession } from "next-auth";
import { ProfileView } from "./profile-view";
import { prisma } from "@/app/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        // TODO: make a good redirect
        return <div>Access Denied</div>;
    }
    const user = session.user;
    if (!user) {
        return <div>Access Denied</div>;
    }
    const email = user.email;
    if (!email) {
        return <div>Access Denied</div>;
    }
    const userModel = await prisma.user.findUnique({ where: { email } });
    if (!userModel) {
        return <div>Access Denied</div>;
    };

    return (
        <ProfileView user={userModel} />
    );
};