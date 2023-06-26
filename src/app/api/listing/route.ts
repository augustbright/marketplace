import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/prisma";
import { imageService } from "@/core/services/image.service";
import { listingService } from "@/core/services/listing.service";
import { getUserInfoFromSession } from "@/core/utils/getUserInfoFromSession";

export const GET = async (req: NextRequest) => {
    const listings = await prisma.listing.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            image: true,
            user: true
        }
    });

    return NextResponse.json(listings);
};

export const POST = async (req: NextRequest) => {    
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const price = formData.get("price")?.toString();
    const images = formData.getAll("images") as File[];

    if (!title || !description || !price) {
        return new Response("Missing fields", { status: 400 });
    }
    const info = await getUserInfoFromSession();
    if (!info) {
        return new Response("Unauthorized", { status: 401 });
    };

    const uploadedImages = await imageService.uploadMany(images);
    const { email } = info;

    const listing = await listingService.createOne({
        description,
        price,
        title
    }, email, uploadedImages[0]);

    return NextResponse.json(listing);
};