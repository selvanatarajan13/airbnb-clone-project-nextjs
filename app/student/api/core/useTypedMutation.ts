import { z } from "zod";
import { APIConfig, fetchApi } from "./fetchApi"
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type useTypedMutationProps<TInput, TOutput> = {
    apiConfig: APIConfig;
    requestSchema: z.ZodType<TInput>;
    responseSchema: z.ZodType<TOutput>;
} & Partial<UseMutationOptions<TOutput, Error, TInput>>;

export function useTypedMutation<TInput, TOutput>({
    apiConfig,
    requestSchema,
    responseSchema,
    ...options
}: useTypedMutationProps<TInput, TOutput>) {

    return useMutation<TOutput, Error, TInput>({
        mutationFn: async (payload: TInput) => {
            if (payload === null || payload === undefined) {
                throw new Error("Payload is required")
            }
            const parsePayload = requestSchema.parse(payload); // Validate request
            const response = await fetchApi<TOutput>({
                apiConfig,
                payload: parsePayload,
            });

            return responseSchema.parse(response); // Validate response
        },
        ...options
    });
}