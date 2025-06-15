import { postEmployeeRegisterApi } from "../api/configs/postEmployeeRegister";
import { useTypedMutation } from "../api/core/useTypedMutation"
import { EmployeeResponse, EmployeeResponseSchema, formSchema, FormSchema } from "../validation/employeeSchema"

export const useLogic = () => {
    const { mutateAsync: postEmployeeRegister } = useTypedMutation<FormSchema, EmployeeResponse>({
        apiConfig: postEmployeeRegisterApi,
        requestSchema: formSchema,
        responseSchema: EmployeeResponseSchema,
        onSuccess: (res) => console.log("Registered: ", res),
        onError: (err) => console.log("Failed: ", err.message)
    });

    return { postEmployeeRegister };
};