import { Storage } from '@google-cloud/storage';

if (!process.env.GCLOUD_CREDENTIALS) {
    throw new Error('The GCLOUD_CREDENTIALS environment variable is missing.');
}

export const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: JSON.parse(Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString('ascii'))
});
