import { storage } from "@/app/storage";
import { Readable } from "stream";

const BUCKET_NAME = 'augustbirght_marketplace_images';

export type TUploadedImage = {
    url: string;
    image: File;
};

class ImageService {
    async uploadMany(images: File[]) {
        const promises = images.map((image) => this.uploadOne(image));
        return Promise.all(promises);
    }

    async uploadOne(image: File) {
        const result = new Promise<TUploadedImage>(async (resolve, reject) => {
            {
                const arrayBuffer = await image.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const bufferStream = new Readable();
                bufferStream.push(buffer);
                bufferStream.push(null);

                const bucket = storage.bucket(BUCKET_NAME);
                const bucketFile = bucket.file(image.name);

                bufferStream.pipe(bucketFile.createWriteStream({
                    metadata: {
                        contentType: image.type,
                    },
                }))
                    .on('error', (error) => {
                        reject(error);
                    })
                    .on('finish', async () => {
                        const [url] = await bucketFile.getSignedUrl({
                            action: 'read',
                            expires: '03-01-2500',
                        });

                        resolve({
                            url,
                            image
                        });
                    });
            }
        });

        return result;
    }
};

export const imageService = new ImageService();