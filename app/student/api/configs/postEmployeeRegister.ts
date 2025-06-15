import { APIConfig } from "../core/fetchApi";

export const postEmployeeRegisterApi: APIConfig = {
    endPoint: "/api/employee/register",
    method: "POST",
    keys: ["employee-register"],
    accessToken: false,
};