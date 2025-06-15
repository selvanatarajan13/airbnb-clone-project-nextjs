import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Container from "../components/container";
import { Controller, FieldErrors, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { formDefaultValues, formSchema, FormSchema } from "../validation/employeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useRef } from "react";

const EmployeeRegisterationForm = () => {

    const {
        register, formState: {
            errors
        },
        control,
        handleSubmit
    } = useForm<FormSchema>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    });

    const hasWorkExperience = useWatch({ control, name: "hasWorkExperience" });
    const hasKnownOtherLanguages = useWatch({ control, name: "hasKnownOtherLanguages" });
    const selectRadio = useWatch({ control, name: "educationalLevel" });

    const dynamicValue = selectRadio === "highSchoolDiploma" ? "schoolName" : "universityName";
    
    const { fields, remove, append, replace } = useFieldArray({
        control,
        name: "languages"
    })
    
    // const error: FieldErrors<Extract<FormSchema, { hasWorkExperience: true }>> = errors;

    const error: 
    FieldErrors<Extract<FormSchema, { hasWorkExperience: true }>> & 
    FieldErrors<Extract<FormSchema, { hasKnownOtherLanguages: true }>> &
    FieldErrors<Extract<FormSchema, { educationalLevel: "noFormalEducation" }>> &
    FieldErrors<Extract<FormSchema, { educationalLevel: "highSchoolDiploma" }>> &
    FieldErrors<Extract<FormSchema, { educationalLevel: "bachelorDegree" }>> = errors;

    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        alert(JSON.stringify(data, null, 2));
        console.log("data: ", data)
    }

    return (
        <>
            <Container>
                <TextField 
                    {...register("fullName")} 
                    label="Full Name"
                    helperText={errors.fullName?.message}
                    error={!!errors.fullName}
                />
                <FormControlLabel 
                    {...register("hasWorkExperience")}
                    label="Work Experience"
                    control={<Checkbox />}
                />
                {
                    hasWorkExperience && (
                        <TextField 
                            {...register("companyName")} 
                            label="Company Name"
                            helperText={error.companyName?.message}
                            error={!!error.companyName}
                        />
                    )
                }
                <FormControlLabel 
                    {...register("hasKnownOtherLanguages")}
                    label="Other Langauge Known?"
                    control={<Checkbox />}
                />
                {
                    hasKnownOtherLanguages && <>
                    {
                        fields.map((field, index) => {
                            return (
                                <div key={field.id}>
                                    <TextField 
                                        {...register(`languages.${index}.name`)} 
                                        label={`Language ${index+1}`}
                                        helperText={error.languages?.[index]?.name?.message}
                                        error={!!error.languages?.[index]?.name?.message}
                                    />
                                    <IconButton disabled={fields.length === 1} onClick={() => remove(index)} color="error">
                                        <AiTwotoneDelete />
                                    </IconButton>
                                </div>
                            )
                        })
                    }
                    <IconButton
                        onClick={() => append({ name: "" })}
                        color="success"
                    >
                        <IoMdAddCircleOutline />
                    </IconButton>
                    </>
                }

                <FormControl>
                    <FormLabel>Educational level:</FormLabel>
                    <Controller 
                        control={control}
                        name="educationalLevel"
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <FormControlLabel 
                                    value={"noFormalEducation"}
                                    control={<Radio />}
                                    label="No Formal Education"
                                />
                                <FormControlLabel 
                                    value={"highSchoolDiploma"}
                                    control={<Radio />}
                                    label="High School Diploma"
                                />
                                <FormControlLabel 
                                    value={"bachelorDegree"}
                                    control={<Radio />}
                                    label="Bachelor Degree"
                                />
                            </RadioGroup>
                        )}
                    />
                </FormControl>
                {
                    selectRadio !== "noFormalEducation" &&
                    (
                        <TextField 
                            {...register(dynamicValue)} 
                            label={dynamicValue}
                            helperText={error[dynamicValue]?.message}
                            error={!!error[dynamicValue]}
                        />
                    )
                }
                <Button variant="contained"onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Container>
        </>
    )
}

export default EmployeeRegisterationForm;