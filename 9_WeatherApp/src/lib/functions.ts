import type { z } from 'zod';

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchFromAPI = async <$ReturnType>(url: string, schema: z.ZodType<$ReturnType>): Promise<$ReturnType | undefined> => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const parsed = schema.safeParse(data);

        if (!parsed.success) {
            console.error(parsed.error);
            return undefined;
        }

        return parsed.data;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export const formatDate = (dateLike: Date | number) => {
    const date = new Date(dateLike);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`
}
