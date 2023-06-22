// register route handler
import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;