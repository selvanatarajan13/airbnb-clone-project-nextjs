export type APIConfig = {
    endPoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    keys?: string[];
    accessToken?: boolean;
}

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

    const res = await fetch(
        endPoint, {
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