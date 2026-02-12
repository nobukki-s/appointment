

import { SwipeDeck } from "@/components/SwipeDeck";
import { getClient, CardContent } from "@/lib/microcms";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          No content ID provided. use ?id=...
        </p>
      </div>
    );
  }

  // Check if API key is configured
  if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p className="text-lg font-bold text-red-500">
          Configuration Error
        </p>
        <p className="text-gray-600">
          MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is missing.
        </p>
      </div>
    );
  }

  try {
    const client = getClient();
    const data = await client.get<CardContent>({
      endpoint: "content",
      contentId: id,
    });



    if (!data.image || !Array.isArray(data.image)) {
      console.error("Invalid data structure: image is missing or not an array");
      return (
        <div className="flex h-screen items-center justify-center">
          <p className="text-lg font-medium text-red-500">
            Data Error: No images found in content.
          </p>
        </div>
      );
    }

    const cards = data.image.map((img, index) => ({
      id: index + 1,
      url: img.url,
      // Add actionUrl only to the last card
      actionUrl: index === data.image.length - 1 ? data.url : undefined,
    }));

    return (
      <main>
        <SwipeDeck cards={cards} title={data.title} />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-2">
        <p className="text-lg font-medium text-red-500">
          Failed to load content.
        </p>
        <p className="text-sm text-gray-500">
          {(error as Error).message}
        </p>
      </div>
    );
  }
}
