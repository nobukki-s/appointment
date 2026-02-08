import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
    apiKey: process.env.MICROCMS_API_KEY || "",
});

export type MicroCMSImage = {
    url: string;
    height: number;
    width: number;
};

export type CardContent = {
    id: string;
    image: MicroCMSImage[];
    url: string;
};
