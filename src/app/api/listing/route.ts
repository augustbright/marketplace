import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/prisma";
import { storage } from "@/app/storage";
import { Readable } from "stream";

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

    const uploadedImages: any = await Promise.all(images.map(async (image) => new Promise(async (resolve) => {
        {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const bufferStream = new Readable();
            bufferStream.push(buffer);
            bufferStream.push(null);

            const bucket = storage.bucket('augustbirght_marketplace_images');
            const bucketFile = bucket.file(image.name);

            bufferStream.pipe(bucketFile.createWriteStream({
                metadata: {
                    contentType: image.type,
                },
            }))
                .on('error', (error) => {
                    // Handle any errors that occur during the write process.
                    console.error(error);
                })
                .on('finish', async () => {
                    // The file upload is complete.
                    const [url] = await bucketFile.getSignedUrl({
                        action: 'read',
                        expires: '03-01-2500',
                    });
                    resolve({
                        url,
                        image
                    });                    
                    console.log('File upload complete!', url);
                });
        }
    })));

    if (!title || !description || !price) {
        return new Response("Missing fields", { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return new Response("Unauthorized", { status: 401 });
    }

    let imageCreation = {};
    if (uploadedImages.length > 0) {
        imageCreation = {
            image: {
                create: {
                    url: uploadedImages[0].url,
                    name: uploadedImages[0].image.name
                }
            }
        }
    }    

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            price: Number(price),
            user: {
                connect: {
                    email
                }
            },
            ...imageCreation
        }
    });

    return NextResponse.json(listing);
};