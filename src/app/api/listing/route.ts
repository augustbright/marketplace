import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/prisma";

export const GET = async (req: NextRequest) => {
    const listings = await prisma.listing.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return NextResponse.json(listings);
};

export const POST = async (req: NextRequest) => {
    const { title, description, price, currency } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return new Response("Unauthorized", { status: 401 });
    }
    
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            price,
            user: {
                connect: {
                    email
                }
            }
        }
    });

    return NextResponse.json(listing);
};