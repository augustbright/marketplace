import { prisma } from "@/app/prisma";
import { TUploadedImage } from "./image.service";
import { Listing } from "@prisma/client";

class ListingService {
    async createOne(
        listing: {
            title: string;
            description: string;
            price: string;
        },
        userEmail: string,
        image?: TUploadedImage
    ): Promise<Listing> {
        const { title, description, price } = listing;

        let imageCreation = {};
        if (image) {
            imageCreation = {
                image: {
                    create: {
                        url: image.url,
                        name: image.image.name
                    }
                }
            }
        }

        return prisma.listing.create({
            data: {
                title,
                description,
                price: Number(price),
                user: {
                    connect: {
                        email: userEmail
                    }
                },
                ...imageCreation
            }
        });
    };
};

export const listingService = new ListingService();