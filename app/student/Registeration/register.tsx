'use client';

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { AiOutlineClose } from "react-icons/ai";


    interface registrationProps {
        required?: boolean;
    }

    type FormValues = {
        username: string;
        email: string;
        channel: string;
        social: {
            twitter: string;
            facebook: string;
        }
        phoneNumbers: string[];
        phNumbers: {
            number: string
        }[];
    }

    const StudentRegister = ({required = false}: registrationProps) => {



        const form = useForm<FormValues>({
            defaultValues: {
                username: '',
                email: '',
                channel: '',
                social: {
                    twitter: '',
                    facebook: ''
                },
                phoneNumbers: ["",""],
                phNumbers: [],
            }
        });
        const { register, control, handleSubmit, formState } = form;
        const { errors } = formState;

        const { fields, append, remove } = useFieldArray({
            name: 'phNumbers',
            control
        })

        const onSubmit = (data: FormValues) => {
            console.log("data: ", data)
        }

        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <p className="text-lg font-semibold mb-4">This is the student registration form.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username",{
                                required: {
                                    value: required,
                                    message: 'username is required'
                                }
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            email:
                        </label>
                        <input
                            type="text"
                            id="password"
                            {...register("email", {
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email format'
                                },
                                required: 'email is required'
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="channel" className="block text-sm font-medium text-gray-700">
                            Channel:
                        </label>
                        <input
                            type="text"
                            id="channel"
                            {...register("channel",{
                                required: {
                                    value: true,
                                    message: 'channel name is required'
                                }
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.channel?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                            twitter:
                        </label>
                        <input
                            type="text"
                            id="channel"
                            {...register("social.twitter",{
                                required: {
                                    value: required,
                                    message: 'twitter is required'
                                }
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.social?.twitter?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                            facebook:
                        </label>
                        <input
                            type="text"
                            id="channel"
                            {...register("social.facebook",{
                                required: {
                                    value: required,
                                    message: 'facebook is required'
                                }
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.social?.facebook?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="primary-number" className="block text-sm font-medium text-gray-700">
                            Phone number1:
                        </label>
                        <input
                            type="text"
                            id="phoneNumber1"
                            {...register("phoneNumbers.0",{
                                required: {
                                    value: true,
                                    message: 'number is required'
                                }
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumbers?.[0]?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="secondary-number" className="block text-sm font-medium text-gray-700">
                            Phone number2:
                        </label>
                        <input
                            type="text"
                            id="phoneNumber2"
                            {...register("phoneNumbers.1",{
                                required: {
                                    value: false,
                                    message: 'facebook is required'
                                }
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumbers?.[1]?.message}</p>
                    </div>

                    <div className="flex-col justify-center items-center ">
                        {
                            fields.map((field, index) => {

                                return (
                                    <div key={field.id}>
                                        <label htmlFor={`optional-number-${index}`} className="block text-sm font-medium text-gray-700">
                                            New Phone number{index+1}:
                                        </label>
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                id="phoneNumber2"
                                                {...register(`phNumbers.${index}.number` as const,{
                                                    required: {
                                                        value: true,
                                                        message: 'facebook is required'
                                                    }
                                                })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <AiOutlineClose size={20} />
                                            </button>
                                        </div>
                                        <p className="text-red-500 text-sm mt-1">{errors.phNumbers?.[index]?.number?.message}</p>
                                    </div>
                                )
                            })
                        }
                        <button type="button"
                                className="w-sm bg-blue-600 items-center text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mt-4"
                                onClick={() => append({ number: "" })}
                        >
                            Add another phone numbers
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form> 
                <DevTool control={control} />
            </div>

        )
    }

    export default StudentRegister;