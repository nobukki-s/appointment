import { createClient } from "microcms-js-sdk";

export const getClient = () => {
    if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
        throw new Error("MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY are required");
    }

    return createClient({
        serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
        apiKey: process.env.MICROCMS_API_KEY,
    });
};

export type MicroCMSImage = {
    url: string;
    height: number;
    width: number;
};

export type CardContent = {
    id: string;
    title: string;
    image: MicroCMSImage[];
    url: string;
};
