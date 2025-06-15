export type APIConfig = {
    endPoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    keys?: string[];
    accessToken?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

type FetchApiParams<T> = {
    apiConfig: APIConfig;
    payload?: unknown;
}

export async function fetchApi<T>({ apiConfig, payload }: FetchApiParams<T>): Promise<T> {

    const { endPoint, method, accessToken } = apiConfig;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (accessToken) {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const url = `${BASE_URL}${endPoint}`;

    const res = await fetch(
        url, {
            method,
            headers,
            body: method !== "GET" ? JSON.stringify(payload) : undefined,
        }
    );

    if (!res.ok) {
        throw new Error(`Request faild: ${res.statusText}`);
    }

    return res.json();
}